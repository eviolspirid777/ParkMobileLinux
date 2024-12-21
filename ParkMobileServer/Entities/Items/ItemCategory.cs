using System.ComponentModel.DataAnnotations;

namespace ParkMobileServer.Entities.Items
{
    public class ItemCategory
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<ItemEntity> Products { get; set; } = new List<ItemEntity>();
    }
}
