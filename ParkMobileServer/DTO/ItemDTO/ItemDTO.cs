using ParkMobileServer.Entities.Items;

namespace ParkMobileServer.DTO.ItemDTO
{
    public class ItemDTO
    {
        public int? id { get; set; } = 0;
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public byte[]? Image { get; set; }
        public int Stock { get; set; }
        public string? Options { get; set; }
        public bool IsPopular { get; set; } = false;
        public bool IsNewItem { get; set; } = false;
        public bool IsInvisible { get; set; } = false;
        public int Weight { get; set; }

        public int CategoryId { get; set; }
        public int BrandId { get; set; }

        public string Description { get; set; }
        public string Article { get; set; }
        public List<int>? Filters {get;set;} = new ();
    }
}
