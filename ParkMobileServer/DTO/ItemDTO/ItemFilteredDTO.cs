namespace ParkMobileServer.DTO.ItemDTO
{
    public class ItemFilteredDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Stock { get; set; }
        public byte[]? Image { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public bool IsPopular { get; set; }
        public bool IsNewItem { get; set; }
    }

    public class ItemFilteredResponse
    {
        public List<ItemFilteredDTO> Items { get; set; } = [];
        public int Count { get; set; }
    }
}
