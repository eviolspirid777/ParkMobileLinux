namespace ParkMobileServer.DTO.ItemDTO
{
    public class PopularItemDTO
    {
            public int Id { get; set; }
            public string Name { get; set; }
            public decimal Price { get; set; }
            public decimal? DiscountPrice { get; set; }
            public byte[] Image { get; set; }
    }
}
