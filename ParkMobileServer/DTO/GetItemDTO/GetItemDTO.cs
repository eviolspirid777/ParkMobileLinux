namespace ParkMobileServer.DTO.GetItemDTO
{
    public class GetItemDTO
    {
        public string? category { get; set; }
        public string? brand { get; set; }
        public int skip { get; set; }
        public int take { get; set; }
        public List<string>? filters { get; set; }
    }
}
