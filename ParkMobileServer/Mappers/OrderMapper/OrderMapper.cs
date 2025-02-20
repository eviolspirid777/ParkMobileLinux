using ParkMobileServer.DTO.Order;
using ParkMobileServer.Entities.Orders;

namespace ParkMobileServer.Mappers.OrderMapper
{
    public class OrderMappers
    {
        public static OrderShortDTO MapToShortOrder(Order data)
        {
            return new OrderShortDTO()
            {
                Address = data.Address,
                Id = data.Id,
                Payment = data.Payment,
                PvzCode = data.PvzCode,
                State = data.State,
            };
        }

        public static Order MapToOrder(Order order)
        {
            return new()
            {
                Id = order.Id,
                PvzCode = order.PvzCode,
                Address = order.Address,
                State = order.State,
                Payment = order.Payment,
                Items = order.Items.Select(item => new OrderItem
                {
                    ItemId = item.ItemId,
                    Count = item.Count,
                }).ToList(),
                Client = new OrderClient() {
                    Comment = order.Client?.Comment,
                    ClientName =  order.Client?.ClientName,
                    Email = order.Client?.Email,
                    Telephone = order.Client?.Telephone
                }
            };
        }
    }
}
