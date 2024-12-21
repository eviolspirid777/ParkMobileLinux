using ParkMobileServer.Entities.Items;
using System.ComponentModel.DataAnnotations;

namespace ParkMobileServer.Entities.Orders
{
	public class OrderItemEntity
	{
		// Идентификатор заказа и идентификатор продукта составляют первичный ключ
		[Key]
		public int Id { get; set; }
		public int Quantity { get; set; }

		public int ProductId { get; set; }
		public ItemEntity? Product { get; set; }

		public int OrderId { get; set; }
		public Order? Order { get; set; }
	}
}
