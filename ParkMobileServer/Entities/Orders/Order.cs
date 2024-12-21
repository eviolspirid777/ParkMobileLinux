using System.ComponentModel.DataAnnotations;

namespace ParkMobileServer.Entities.Orders
{
	public class Order
	{
        [Key]
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string CustomerId { get; set; } // Идентификатор покупателя (если есть)

        // Связь с продуктами
        public ICollection<OrderItemEntity> OrderItems { get; set; } = new List<OrderItemEntity>();
    }
}
