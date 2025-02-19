using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkMobileServer.Entities.Orders
{
    [Table("OrderItems")]
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }
        public int ItemId {get; set;}
        public int Count {get; set;}
        public int OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
