namespace ParkMobileServer.DTO.ItemDTO
{
    public class SearchCategoryItemRequest
    {
        public int Skip { get; set; }
        public int Take { get; set; }
        public string Query { get; set; } = String.Empty;
    }
}
