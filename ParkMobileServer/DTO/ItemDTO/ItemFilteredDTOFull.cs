namespace ParkMobileServer.DTO.ItemDTO
{
    public class ItemFilteredDTOFull
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Stock { get; set; }
        public byte[]? Image { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public bool IsPopular { get; set; }
        public bool IsNewItem { get; set; }
        public int? BrandId { get; set; }
        public int? CategoryId { get; set; }
    }
}
