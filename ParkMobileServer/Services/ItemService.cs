using Microsoft.Extensions.Caching.Distributed;
using ParkMobileServer.DTO.GetItemDTO;
using ParkMobileServer.DTO.ItemDTO;
using ParkMobileServer.Entities.Items;
using ParkMobileServer.Exceptions;
using ParkMobileServer.Mappers.ItemsMapper;
using ParkMobileServer.Metrics;
using ParkMobileServer.Repositories;
using System.Text.Json;

namespace ParkMobileServer.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;
        private readonly IDistributedCache _cache;
        private readonly ILogger<ItemService> _logger;

        public ItemService(
            IItemRepository itemRepository,
            IDistributedCache cache,
            ILogger<ItemService> logger)
        {
            _itemRepository = itemRepository;
            _cache = cache;
            _logger = logger;
        }

        public async Task<IEnumerable<ItemDTO>> GetFilteredItemsAsync(SearchCategoryItemRequest request)
        {
            try
            {
                var cacheKey = $"filtered_items_{JsonSerializer.Serialize(request)}";
                var cachedItems = await _cache.GetStringAsync(cacheKey);

                if (cachedItems != null)
                {
                    ApplicationMetrics.CacheHits.Inc();
                    return JsonSerializer.Deserialize<IEnumerable<ItemDTO>>(cachedItems)!;
                }

                ApplicationMetrics.CacheMisses.Inc();
                var items = await _itemRepository.GetFilteredItemsAsync(request);

                await _cache.SetStringAsync(
                    cacheKey,
                    JsonSerializer.Serialize(items),
                    new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                    });

                return items;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении отфильтрованных товаров");
                throw new BusinessException("Не удалось получить список товаров");
            }
        }

        public async Task<IEnumerable<ItemDTO>> GetItemsByNameAsync(GetSearchItemRequest request)
        {
            try
            {
                return await _itemRepository.GetItemsByNameAsync(request);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при поиске товаров по имени");
                throw new BusinessException("Не удалось найти товары");
            }
        }

        public async Task<IEnumerable<PopularItemDTO>> GetPopularItemsAsync()
        {
            try
            {
                const string cacheKey = "popular_items";
                var cachedItems = await _cache.GetStringAsync(cacheKey);

                if (cachedItems != null)
                {
                    ApplicationMetrics.CacheHits.Inc();
                    return JsonSerializer.Deserialize<IEnumerable<PopularItemDTO>>(cachedItems)!;
                }

                ApplicationMetrics.CacheMisses.Inc();
                var items = await _itemRepository.GetPopularItemsAsync();

                await _cache.SetStringAsync(
                    cacheKey,
                    JsonSerializer.Serialize(items),
                    new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
                    });

                return items;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении популярных товаров");
                throw new BusinessException("Не удалось получить популярные товары");
            }
        }

        public async Task<IEnumerable<ItemDTO>> GetNewItemsAsync(GetItemDTO request)
        {
            try
            {
                return await _itemRepository.GetNewItemsAsync(request);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении новых товаров");
                throw new BusinessException("Не удалось получить новые товары");
            }
        }

        public async Task<IEnumerable<ItemDTO>> GetItemsForAdminAsync(int skip, int take, string name)
        {
            try
            {
                return await _itemRepository.GetItemsForAdminAsync(skip, take, name);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении товаров для админа");
                throw new BusinessException("Не удалось получить список товаров");
            }
        }

        public async Task<ItemDTO> CreateItemAsync(ItemDTO itemDto)
        {
            try
            {
                var item = new ItemEntity
                {
                    Name = itemDto.Name,
                    Price = itemDto.Price,
                    DiscountPrice = itemDto.DiscountPrice,
                    Image = itemDto.Image,
                    Stock = itemDto.Stock,
                    IsPopular = itemDto.IsPopular,
                    IsNewItem = itemDto.IsNewItem,
                    isInvisible = itemDto.IsInvisible,
                    Weight = itemDto.Weight,
                    BrandId = itemDto.BrandId,
                    CategoryId = itemDto.CategoryId
                };

                await _itemRepository.AddAsync(item);
                await InvalidateItemCacheAsync();

                return ItemMapper.MapToItemDto(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при создании товара");
                throw new BusinessException("Не удалось создать товар");
            }
        }

        public async Task<ItemDTO> UpdateItemAsync(int id, ItemDTO itemDto)
        {
            try
            {
                var item = await _itemRepository.GetByIdAsync(id);
                if (item == null)
                {
                    throw new NotFoundException($"Товар с ID {id} не найден");
                }

                item.Name = itemDto.Name;
                item.Price = itemDto.Price;
                item.DiscountPrice = itemDto.DiscountPrice;
                item.Stock = itemDto.Stock;
                item.IsPopular = itemDto.IsPopular;
                item.IsNewItem = itemDto.IsNewItem;
                item.isInvisible = itemDto.IsInvisible;
                item.Weight = itemDto.Weight;
                item.BrandId = itemDto.BrandId;
                item.CategoryId = itemDto.CategoryId;

                await _itemRepository.UpdateAsync(item);
                await InvalidateItemCacheAsync();

                return ItemMapper.MapToItemDto(item);
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при обновлении товара");
                throw new BusinessException("Не удалось обновить товар");
            }
        }

        public async Task DeleteItemAsync(int id)
        {
            try
            {
                var item = await _itemRepository.GetByIdAsync(id);
                if (item == null)
                {
                    throw new NotFoundException($"Товар с ID {id} не найден");
                }

                await _itemRepository.DeleteAsync(item);
                await InvalidateItemCacheAsync();
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при удалении товара");
                throw new BusinessException("Не удалось удалить товар");
            }
        }

        public async Task<bool> ToggleItemVisibilityAsync(int id)
        {
            try
            {
                var item = await _itemRepository.GetByIdAsync(id);
                if (item == null)
                {
                    throw new NotFoundException($"Товар с ID {id} не найден");
                }

                item.isInvisible = !item.isInvisible;
                await _itemRepository.UpdateAsync(item);
                await InvalidateItemCacheAsync();

                return item.isInvisible;
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при изменении видимости товара");
                throw new BusinessException("Не удалось изменить видимость товара");
            }
        }

        public async Task<bool> ToggleItemPopularityAsync(int id)
        {
            try
            {
                var item = await _itemRepository.GetByIdAsync(id);
                if (item == null)
                {
                    throw new NotFoundException($"Товар с ID {id} не найден");
                }

                item.IsPopular = !item.IsPopular;
                await _itemRepository.UpdateAsync(item);
                await InvalidateItemCacheAsync();

                return item.IsPopular;
            }
            catch (NotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при изменении популярности товара");
                throw new BusinessException("Не удалось изменить популярность товара");
            }
        }

        private async Task InvalidateItemCacheAsync()
        {
            await _cache.RemoveAsync("popular_items");
            // Можно добавить инвалидацию других ключей кэша
        }
    }
} 