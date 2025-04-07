using Microsoft.EntityFrameworkCore;
using ParkMobileServer.DTO.GetItemDTO;
using ParkMobileServer.Entities.Items;
using ParkMobileServer.Mappers.ItemsMapper;

namespace ParkMobileServer.Repositories
{
    public interface IItemRepository : IRepository<ItemEntity>
    {
        Task<IEnumerable<ItemDTO>> GetFilteredItemsAsync(SearchCategoryItemRequest request);
        Task<IEnumerable<ItemDTO>> GetItemsByNameAsync(GetSearchItemRequest request);
        Task<IEnumerable<PopularItemDTO>> GetPopularItemsAsync();
        Task<IEnumerable<ItemDTO>> GetNewItemsAsync(GetItemDTO request);
        Task<IEnumerable<ItemDTO>> GetItemsForAdminAsync(int skip, int take, string name);
    }

    public class ItemRepository : Repository<ItemEntity>, IItemRepository
    {
        public ItemRepository(PostgreSQLDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ItemDTO>> GetFilteredItemsAsync(SearchCategoryItemRequest request)
        {
            var query = _dbSet
                .Where(item => item.isInvisible == false)
                .Include(i => i.Filters)
                .AsQueryable();

            if (request.Filters != null && request.Filters.Count > 0)
            {
                query = query.Where(i => request.Filters.All(filter => 
                    i.Filters.Any(f => f.Name == filter)));
            }

            if (request.Sort != null)
            {
                query = ApplySorting(query, request.Sort);
            }
            else
            {
                query = query
                    .OrderByDescending(item => item.IsNewItem)
                    .ThenByDescending(item => item.Name);
            }

            var items = await query
                .Skip(request.Skip)
                .Take(request.Take)
                .Select(item => ItemMapper.MapToItemDto(item))
                .ToListAsync();

            return items;
        }

        public async Task<IEnumerable<ItemDTO>> GetItemsByNameAsync(GetSearchItemRequest request)
        {
            var splittedName = request.Name.Split(" ");
            var query = _dbSet
                .Where(item => item.isInvisible == false)
                .Include(item => item.Description)
                .Include(item => item.Article)
                .AsQueryable();

            foreach (var splitValue in splittedName)
            {
                query = query.Where(item => 
                    item.Name.ToLower().Contains(splitValue.ToLower()));
            }

            var items = await query
                .Skip(request.Skip)
                .Take(request.Take)
                .Select(item => new
                {
                    item.Id,
                    item.Name,
                    item.Price,
                    item.DiscountPrice,
                    item.Image,
                })
                .ToListAsync();

            return items.Select(item => new ItemDTO
            {
                Id = item.Id,
                Name = item.Name,
                Price = item.Price,
                DiscountPrice = item.DiscountPrice,
                Image = item.Image
            });
        }

        public async Task<IEnumerable<PopularItemDTO>> GetPopularItemsAsync()
        {
            return await _dbSet
                .Where(item => item.IsPopular && item.isInvisible == false)
                .Select(item => new PopularItemDTO
                {
                    Id = item.Id,
                    Name = item.Name,
                    Price = item.Price,
                    DiscountPrice = item.DiscountPrice,
                    Image = item.Image
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<ItemDTO>> GetNewItemsAsync(GetItemDTO request)
        {
            var query = _dbSet
                .Where(item => item.isInvisible == false && item.IsNewItem)
                .AsQueryable();

            if (request.Sort != null)
            {
                query = ApplySorting(query, request.Sort);
            }
            else
            {
                query = query
                    .OrderByDescending(item => item.IsNewItem)
                    .ThenByDescending(item => item.Name);
            }

            return await query
                .Skip(request.skip)
                .Take(request.take)
                .Select(item => ItemMapper.MapToItemDto(item))
                .ToListAsync();
        }

        public async Task<IEnumerable<ItemDTO>> GetItemsForAdminAsync(int skip, int take, string name)
        {
            var query = _dbSet
                .Include(i => i.Filters)
                .OrderBy(item => item.Id)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(item => 
                    item.Name.ToLower().Contains(name.ToLower()));
            }

            return await query
                .Skip(skip)
                .Take(take)
                .Select(item => new ItemDTO
                {
                    Id = item.Id,
                    Name = item.Name,
                    Price = item.Price,
                    DiscountPrice = item.DiscountPrice,
                    Image = item.Image,
                    IsPopular = item.IsPopular,
                    IsNewItem = item.IsNewItem,
                    IsInvisible = item.isInvisible,
                    BrandId = item.BrandId,
                    CategoryId = item.CategoryId,
                    Stock = item.Stock,
                    Weight = item.Weight,
                    Description = item.Description!.Description,
                    Article = item.Article!.Article,
                    Filters = item.Filters.Select(f => new FilterDTO
                    {
                        Id = f.Id,
                        Name = f.Name
                    }).ToList()
                })
                .ToListAsync();
        }

        private IQueryable<ItemEntity> ApplySorting(IQueryable<ItemEntity> query, SortDTO sort)
        {
            switch (sort.Field)
            {
                case "name":
                    return sort.Type == "asc" 
                        ? query.OrderBy(item => item.Name)
                        : query.OrderByDescending(item => item.Name);
                case "price":
                    return sort.Type == "asc"
                        ? query.OrderBy(item => item.Price)
                        : query.OrderByDescending(item => item.Price);
                default:
                    return query;
            }
        }
    }
} 