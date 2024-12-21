using System.ComponentModel.DataAnnotations;

namespace ParkMobileServer.Entities.Items
{
    public enum ItemCategoryEnum
    {
        Iphone = 0,
        Ipad,
        Watch,
        Mac,
        Airpods,
        Accessories,
        Gadgets,
        Audio,
        Phones,
        Gaming,
        Health,
        Tv,
    }

    public enum ItemBrandEnum
    {
        Apple = 0,
        Samsung,
        Xiaomi,
        Sony,
        Steam,
        Dyson,
    }

    public class ItemEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string? Article { get; set;}
        public string? DiscountPrice { get; set; }
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public int Stock { get; set; }
        public string? Options{ get; set; }
        public bool IsPopular { get; set; } = false;
        public bool IsNewItem { get; set; } = false;

        public int CategoryId { get; set; }
        public ItemCategory? Category { get; set; }
        public int ItemBrandId { get; set; }
        public ItemBrand? ItemBrand { get; set; }
    }
}
