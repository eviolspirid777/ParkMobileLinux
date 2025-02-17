using System.ComponentModel.DataAnnotations;

namespace ParkMobileServer.Entities.Orders
{
	public class Order
	{
        [Key]
        public int Id { get; set; }
        public string? Comment {get;set;}
        public string? Article {get;set;}
        public bool State { get; set; } = false;
        public List<OrderItem> Items {get; set;} = new();
    }
}
