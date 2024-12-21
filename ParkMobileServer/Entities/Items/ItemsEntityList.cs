using ParkMobileServer.DTO.ItemDTO;

namespace ParkMobileServer.Entities.Items
{
    public class ItemsEntityList
    {
        public List<ItemDTO> items { get; set; }
        public int count { get; set; }
    }
}
