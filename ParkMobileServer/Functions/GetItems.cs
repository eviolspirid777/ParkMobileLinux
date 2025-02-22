using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using ParkMobileServer.DbContext;
using ParkMobileServer.DTO.GetItemDTO;
using ParkMobileServer.DTO.ItemDTO;
using ParkMobileServer.Entities.Items;
using ParkMobileServer.Helpers;
using ParkMobileServer.Mappers.ItemsMapper;
using System.Xml.Linq;

namespace ParkMobileServer.Functions
{
    public class GetItems
    {
        private readonly PostgreSQLDbContext _postgreSQLDbContext;
        private readonly IDistributedCache _cache;

        public GetItems(
            PostgreSQLDbContext postgreSQLDbContext,
            IDistributedCache cache
        )
        {
            _postgreSQLDbContext = postgreSQLDbContext;
            _cache = cache;
        }

        public async Task<object> GetItemsByNameAsync(GetSearchItemRequest searchRequest)
        {
            var splittedName = searchRequest.Name.Split(" ");

            var query = _postgreSQLDbContext
                                .ItemEntities
                                .Where(item => item.isInvisible == false)
                                .Include(item => item.Description)
                                .Include(item => item.Article)
                                .AsQueryable();

            foreach (var splitValue in splittedName)
            {
                query = query
                            .Where(item => item.Name.ToLower().Contains(splitValue.ToLower()))
                            .AsQueryable();
            }

            var itemsCount = await query.CountAsync();

            var items = await query
                                .Skip(searchRequest.Skip)
                                .Take(searchRequest.Take)
                                .Select(item => new
                                {
                                    item.Id,
                                    item.Name,
                                    item.Price,
                                    item.DiscountPrice,
                                    item.Image,
                                })
                                .ToListAsync();
            
            if(itemsCount == 0)
            {
                throw new Exception("Не найдено данных!");
            }

            return new
            {
                items = items,
                count = itemsCount
            };
        }

        public async Task<object> GetFilteredItemsAsync(SearchCategoryItemRequest searchCategoryRequest)
        {
            string cacheKey = $"filtered_items_{searchCategoryRequest.Skip}_{searchCategoryRequest.Take}_{searchCategoryRequest.Filters?.Select(filter => $"{filter}_")}";

            var cachedData = await _cache.GetStringAsync(cacheKey);
            if (!string.IsNullOrEmpty(cachedData))
            {
                return JsonConvert.DeserializeObject(cachedData);
            }

            var query = _postgreSQLDbContext
                            .ItemEntities
                            .Where(item => item.isInvisible == false)
                            .Include(i => i.Filters)
                            .AsQueryable();

            if (searchCategoryRequest.Filters != null && searchCategoryRequest.Filters.Count > 0)
            {
                query = query
                            .Where(i => searchCategoryRequest.Filters
                                .All(filter => i.Filters.Any(f => f.Name == filter)));
            }

            if(searchCategoryRequest.Sort != null)
            {
                switch(searchCategoryRequest.Sort.Field)
                {
                    case "name":
                    {
                        if (searchCategoryRequest.Sort.Type == "asc")
                        {
                            query = query.OrderBy(item => item.Name);
                        }
                        else
                        {
                            query = query.OrderByDescending(item => item.Name);
                        }
                        break;
                    }
                    case "price":
                    {
                        if (searchCategoryRequest.Sort.Type == "asc")
                        {
                            query = query.OrderBy(item => item.Price);
                        }
                        else
                        {
                            query = query.OrderByDescending(item => item.Price);
                        }
                        break;
                    }
                }
            }
            else
            {
                query = query
                            .OrderByDescending(item => item.IsNewItem)
                            .ThenByDescending(item => item.Name);
            }

            var itemsCount = await query.CountAsync();

            var items = await query
                                .Skip(searchCategoryRequest.Skip)
                                .Take(searchCategoryRequest.Take)
                                .Select(item => new
                                {
                                    item.Id,
                                    item.Name,
                                    item.Stock,
                                    item.Image,
                                    item.Price,
                                    item.DiscountPrice,
                                    item.IsPopular,
                                    item.IsNewItem
                                })
                                .ToListAsync();

            if (items.Count == 0)
            {
                throw new Exception("Не найдено товаров");
            }

            var cacheOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
            };

            await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(items), cacheOptions);

            return new
            {
                items,
                count = itemsCount
            };
        }

        public async Task<object> GetSearchItemsByName(GetSearchItemRequest searchRequest)
        {
            var splittedName = searchRequest.Name.Split(" ");

            var query = _postgreSQLDbContext
                                .ItemEntities
                                .Where(item => item.isInvisible == false)
                                .Include(item => item.Description)
                                .Include(item => item.Article)
                                .AsQueryable();
            foreach (var splitValue in splittedName)
            {
                query = query
                            .Where(item => item.Name.ToLower()
                            .Contains(splitValue.ToLower()));
            }

            var itemsCount = await query.CountAsync();

            var items = await query
                                .OrderByDescending(item => item.IsNewItem)
                                .ThenByDescending(item => item.Name)
                                .Skip(searchRequest.Skip)
                                .Take(searchRequest.Take)
                                .ToListAsync();

            var mappedItems = items
                                                .Select(ItemMapper.MatToShortDto)
                                                .ToList();

            if (itemsCount == 0)
            {
                throw new Exception("Нет товаров с таким именем!");
            }

            return new
            {
                items = mappedItems,
                count = itemsCount
            };
        }

        public async Task<object> GetNewItemsAsync(GetItemDTO request)
        {
            var query = _postgreSQLDbContext
                        .ItemEntities
                        .Where(item => item.isInvisible == false)
                        .Select(item => new
                        {
                            item.Id,
                            item.Name,
                            item.DiscountPrice,
                            item.Price,
                            item.Image,
                            item.IsPopular,
                            item.IsNewItem,
                            item.BrandId,
                            item.CategoryId,
                            item.Stock
                        })
                        .Where(item => item.IsNewItem);

            if (request.Sort != null)
            {
                switch (request.Sort.Field)
                {
                    case "name":
                        {
                            if (request.Sort.Type == "asc")
                            {
                                query = query.OrderBy(item => item.Name);
                            }
                            else
                            {
                                query = query.OrderByDescending(item => item.Name);
                            }
                            break;
                        }
                    case "price":
                        {
                            if (request.Sort.Type == "asc")
                            {
                                query = query.OrderBy(item => item.Price);
                            }
                            else
                            {
                                query = query.OrderByDescending(item => item.Price);
                            }
                            break;
                        }
                }
            }
            else
            {
                query = query
                            .OrderByDescending(item => item.IsNewItem)
                            .ThenByDescending(item => item.Name);
            }


            var newItems = await query
                                    .Skip(request.skip)
                                    .Take(request.take)
                                    .ToListAsync();

            var counter = query
                            .ToList()
                            .Count;

            return new
            {
                count = counter,
                items = newItems,
            };
        }

        public async Task<object> GetFilteredItemsAsync(GetItemDTO request)
        {
            string cacheKey = $"filtered_items_{request.skip}_{request.take}_{request.filters?.Select(filter => $"{filter}_")}";

            var cachedData = await _cache.GetStringAsync(cacheKey);
            if (!string.IsNullOrEmpty(cachedData))
            {
                return JsonConvert.DeserializeObject(cachedData);
            }

            int? categoryId = null;
            int? brandId = null;

            var query = _postgreSQLDbContext
                                    .ItemEntities
                                    .Where(item => item.isInvisible == false)
                                    .Select(item => new
                                    {
                                        item.Id,
                                        item.Name,
                                        item.DiscountPrice,
                                        item.Price,
                                        item.Image,
                                        item.IsPopular,
                                        item.IsNewItem,
                                        item.BrandId,
                                        item.CategoryId,
                                        item.Stock
                                    })
                                    .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.category))
            {
                categoryId = (await _postgreSQLDbContext
                                        .ItemCategories
                                        .FirstOrDefaultAsync(c => c.Name == request.category))?
                                        .Id;
            }
            if (!string.IsNullOrWhiteSpace(request.brand))
            {
                brandId = (await _postgreSQLDbContext
                                    .ItemBrands
                                    .FirstOrDefaultAsync(b => b.Name.ToLower() == request.brand.ToLower()))?
                                    .Id;
            }

            if (categoryId.HasValue)
            {
                query = query.Where(item => item.CategoryId == categoryId.Value);
            }

            if (brandId.HasValue)
            {
                query = query.Where(item => item.BrandId == brandId.Value);
            }

            if (request.Sort != null)
            {
                switch (request.Sort.Field)
                {
                    case "name":
                        {
                            if (request.Sort.Type == "asc")
                            {
                                query = query.OrderBy(item => item.Name);
                            }
                            else
                            {
                                query = query.OrderByDescending(item => item.Name);
                            }
                            break;
                        }
                    case "price":
                        {
                            if (request.Sort.Type == "asc")
                            {
                                query = query.OrderBy(item => item.Price);
                            }
                            else
                            {
                                query = query.OrderByDescending(item => item.Price);
                            }
                            break;
                        }
                }
            }
            else
            {
                query = query
                            .OrderByDescending(item => item.IsNewItem)
                            .ThenByDescending(item => item.Name);
            }

            var count = await query.CountAsync();

            var items = await query
                                .Select(item => new
                                {
                                    item.Id,
                                    item.Name,
                                    item.DiscountPrice,
                                    item.Price,
                                    item.Image,
                                    item.IsPopular,
                                    item.IsNewItem,
                                    item.Stock
                                })
                                .Skip(request.skip)
                                .Take(request.take)
                                .ToListAsync();

            var cacheOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
            };

            await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(items), cacheOptions);

            return new
            {
                count,
                items
            };
        }

        public async Task<object> GetItemsForAdmin(int skip, int take, string name)
        {
            var query = _postgreSQLDbContext
                .ItemEntities
                .Include(i => i.Filters)
                .OrderBy(item => item.Id)
                .Select(item => new
                {
                    item.Id,
                    item.Name,
                    item.DiscountPrice,
                    item.Price,
                    item.Image,
                    item.IsPopular,
                    item.IsNewItem,
                    item.isInvisible,
                    item.BrandId,
                    item.CategoryId,
                    item.Stock,
                    item.Weight,
                    Description = item.Description!.Description,
                    Article = item.Article!.Article,
                    Filters = item.Filters.Select(f => new {
                        f.Id,
                        f.Name
                    })
                })
            .AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(item => item.Name.ToLower().Contains(name.ToLower()));
            }

            var count = await query.CountAsync();

            var items = await query
                                .Skip(skip)
                                .Take(take)
                                .ToListAsync();

            return new
            {
                count = count,
                items = items
            };
        }

        public async Task<List<PopularItemDTO>> GetPopularItemsAsync()
        {
            const string cacheKey = "popularItems";
            var cachedData = await _cache.GetStringAsync(cacheKey);

            if (cachedData != null)
            {
                return JsonConvert.DeserializeObject<List<PopularItemDTO>>(cachedData);
            }

            var popularItems = await _postgreSQLDbContext
                                                        .ItemEntities
                                                        .Where(item => item.IsPopular)
                                                        .Where(item => item.isInvisible == false)
                                                        .Select(item => new PopularItemDTO
                                                        {
                                                            Id = item.Id,
                                                            Name = item.Name,
                                                            Price = item.Price,
                                                            DiscountPrice = item.DiscountPrice,
                                                            Image = item.Image
                                                        })
                                                        .ToListAsync();

            var cacheOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1)
            };

            var serializedData = JsonConvert.SerializeObject(popularItems);
            await _cache.SetStringAsync(cacheKey, serializedData, cacheOptions);

            return popularItems;
        }
    }
}
