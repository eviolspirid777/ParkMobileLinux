using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using ParkMobileServer.DbContext;
using ParkMobileServer.DTO.ItemDTO;
using ParkMobileServer.Entities.Items;
using ParkMobileServer.Helpers;

namespace ParkMobileServer.Functions
{
    public class CreateItems
    {
        private readonly PostgreSQLDbContext _postgreSQLDbContext;
        private readonly IDistributedCache _cache;
        public CreateItems(
            PostgreSQLDbContext postgreSQLDbContext,
            IDistributedCache cache
        )
        {
            _postgreSQLDbContext = postgreSQLDbContext;
            _cache = cache;
        }

        public async Task<bool> CreateItemAsync(ItemDTO itemDto)
        {
            if (itemDto == null)
            {
                throw new Exception("Пустой товар");
            }

            if (itemDto.IsPopular == true)
            {
                await _cache.RemoveAsync("popularItems");
            }

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
                CategoryId = itemDto.CategoryId,
                BrandId = itemDto.BrandId,
                Description = new DescriptionEntity { Description = itemDto.Description },
                Article = new ArticleEntity { Article = itemDto.Article }
            };

            foreach (var filter in itemDto.Filters.OrEmpty())
            {
                var existingFilter = await _postgreSQLDbContext.Filters
                    .FirstOrDefaultAsync(f => f.Id == filter);

                if (existingFilter != null)
                {
                    item.Filters?.Add(existingFilter);
                }
            }

            _postgreSQLDbContext.ItemEntities.Add(item);
            await _postgreSQLDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteItemAsync(int id)
        {
            var item = await _postgreSQLDbContext
                            .ItemEntities
                            .FindAsync(id);

            var article = await _postgreSQLDbContext
                                        .ArticleEntity
                                        .FirstAsync(article => article.ItemId == id);

            var description = await _postgreSQLDbContext
                                        .DescriptionEntity
                                        .FirstAsync(desc => desc.ItemId == id);

            if (item == null || article == null || description == null)
            {
                throw new Exception("ХА-ХА");
            }

            _postgreSQLDbContext
                    .DescriptionEntity
                    .Remove(description);

            _postgreSQLDbContext
                    .ArticleEntity
                    .Remove(article);

            _postgreSQLDbContext
                    .ItemEntities
                    .Remove(item);

            await _postgreSQLDbContext.SaveChangesAsync();

            return true;
        }
    }
}
