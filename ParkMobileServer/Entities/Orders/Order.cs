using System.ComponentModel.DataAnnotations;

namespace ParkMobileServer.Entities.Orders
{
    public enum OrderPayment
    {
        Card,
        QrCode,
        Cash,
        Credit
    }
    public enum OrderState
    {
        approved,
        disapproved,
    }
	public class Order
	{
        [Key]
        public int Id { get; set; }
        public string? Comment {get;set;}
        public OrderPayment? Payment { get; set; } = null;
        public OrderState? State { get; set; } = null!;
        public ICollection<OrderItem> Items {get; set;} = [];
    }
}
