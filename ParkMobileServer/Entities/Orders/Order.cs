using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string? Address {get; set;} = string.Empty;
        public string? PvzCode {get;set;} = string.Empty;
        public string? TrackNumber { get; set; } = null;

        public OrderPayment? Payment { get; set; } = null;
        public OrderState? State { get; set; } = null!;
        public int ClientId {get;set;}
        public OrderClient? Client { get; set; }
        public ICollection<OrderItem> Items {get; set;} = [];
    }
}
