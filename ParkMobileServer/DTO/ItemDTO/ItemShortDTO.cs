namespace ParkMobileServer.DTO.ItemDTO
{
	public class ItemShortDTO
	{
		public int? id { get; set; } = 0;
		public string Name { get; set; }
		public decimal Price { get; set; }
		public decimal? DiscountPrice { get; set; }
		public byte[]? Image { get; set; }
	}
}
