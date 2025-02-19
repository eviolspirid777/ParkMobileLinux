using ParkMobileServer.Entities.Orders;

namespace ParkMobileServer.DTO.Order
{
    public class OrderShortDTO
    {
        public int Id { get; set; }
        public string? Address { get; set; }
        public string? PvzCode { get; set; }

        public OrderPayment? Payment { get; set; } = null;
        public OrderState? State { get; set; } = null!;
    }
}
