using ParkMobileServer.Entities.Orders;

namespace ParkMobileServer.Entities.OrderTelegram
{
    public class OrderTelegram
    {
            public string personName { get; set; }
            public string telephone { get; set; }
            public string city { get; set; }
            public string deliveryType { get; set; }
            public string description { get; set; }
            public string email { get; set; }
            public string paymentType { get; set; }
            public string postMat { get; set; }
            public string reciver { get; set; }
            public List<OrderItemEntity> items { get; set; }
    }
}
