namespace ParkMobileServer.Entities.Orders
{
    public class OrderStatusRequest
    {
        public int Id { get; set; }
        public OrderState State { get; set; }
        public string? TrackNumber { get; set; }
    }
}
