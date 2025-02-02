using ParkMobileServer.Entities.Sort;

namespace ParkMobileServer.DTO.ItemDTO
{
    public class SearchCategoryItemRequest
    {
        public int Skip { get; set; }
        public int Take { get; set; }
        public List<string>? Filters { get; set; }
        public Sort? Sort { get; set; }
    }
}
