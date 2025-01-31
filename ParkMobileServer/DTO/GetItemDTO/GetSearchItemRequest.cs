namespace ParkMobileServer.DTO.GetItemDTO
{
    public class GetSearchItemRequest
    {
        public string Name { get; set; } = string.Empty;
        public int Skip { get; set; }
        public int Take { get; set; }
    }
}
