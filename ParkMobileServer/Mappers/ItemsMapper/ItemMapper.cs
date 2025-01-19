using ParkMobileServer.DbContext;
using ParkMobileServer.DTO.ItemDTO;
using ParkMobileServer.Entities.Items;

namespace ParkMobileServer.Mappers.ItemsMapper
{
    public class ItemMapper
    {
        public static ItemDTO MapToDto(ItemEntity item, int brandId, int categoryId)
        {
            if(brandId != null && categoryId != null )
            {
                return new ItemDTO
                {
                    id = item.Id,
                    Name = item.Name,
                    BrandId = brandId,
                    CategoryId = categoryId,
                    Description = new() {Description = item.Description.Description },
                    DiscountPrice = item.DiscountPrice,
                    Image = item.Image,
                    Price = item.Price,
                    Stock = item.Stock,
                    Article = new() {Article = item.Article.Article },
                    IsPopular = item.IsPopular,
                    IsNewItem = item.IsNewItem,
                };
            }
            if(brandId != null)
            {
                return new ItemDTO
                {
                    id = item.Id,
                    Name = item.Name,
                    BrandId = brandId,
                    CategoryId = -1,
                    Description = new() { Description = item.Description.Description },
                    DiscountPrice = item.DiscountPrice,
                    Image = item.Image,
                    Price = item.Price,
                    Stock = item.Stock,
                    Article = new() { Article = item.Article.Article },
                    IsPopular = item.IsPopular,
                    IsNewItem = item.IsNewItem,
                };
            }
            if(categoryId != null)
            {
                return new ItemDTO
                {
                    id = item.Id,
                    Name = item.Name,
                    BrandId = -1,
                    CategoryId = categoryId,
                    Description = new() { Description = item.Description.Description },
                    DiscountPrice = item.DiscountPrice,
                    Image = item.Image,
                    Price = item.Price,
                    Stock = item.Stock,
                    Article = new() { Article = item.Article.Article },
                    IsPopular = item.IsPopular,
                    IsNewItem = item.IsNewItem,
                };
            }

            return new ItemDTO
            {
                id = item.Id,
                Name = item.Name,
                BrandId = -1,
                CategoryId = -1,
                Description = new() { Description = item.Description.Description },
                DiscountPrice = item.DiscountPrice,
                Image = item.Image,
                Price = item.Price,
                Stock = item.Stock,
                Article = new() { Article = item.Article.Article },
                IsPopular = item.IsPopular,
                IsNewItem = item.IsNewItem,
            };
        }

        public static ItemShortDTO MatToShortDto(ItemEntity item)
        {
            return new ItemShortDTO()
            {
                id = item.Id,
                DiscountPrice = item.DiscountPrice,
                Image = item.Image,
                Name = item.Name,
                Price = item.Price,
            };
        }
    }
}
