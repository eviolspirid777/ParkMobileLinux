using System.ComponentModel.DataAnnotations;

namespace ParkMobileServer.Entities.Items
{
    public class ItemEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string? DiscountPrice { get; set; }
        public byte[]? Image { get; set; }
        public int Stock { get; set; }
        public bool IsPopular { get; set; } = false;
        public bool IsNewItem { get; set; } = false;
        public bool isInvisible { get; set; } = false;

        public int CategoryId { get; set; }
        public ItemCategory? Category { get; set; }
        public int BrandId { get; set; }
        public ItemBrand? Brand { get; set; }

        public int DescriptionId { get; set; }
        public DescriptionEntity? Description { get; set; }

        public int ArticleId { get; set; }
        public ArticleEntity? Article { get; set; }
    }
}
