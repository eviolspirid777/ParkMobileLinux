using ParkMobileServer.Entities.Items;

namespace ParkMobileServer.Entities.Filters
{
    public class FilterEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public ICollection<ItemEntity> Items { get; set; } = new List<ItemEntity>();
    }
}
