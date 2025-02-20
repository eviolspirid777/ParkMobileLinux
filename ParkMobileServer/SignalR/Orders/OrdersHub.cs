using Microsoft.AspNetCore.SignalR;
using ParkMobileServer.Services;

namespace ParkMobileServer.SignalR.Orders
{
    public class OrdersHub : Hub
    {
        private readonly OrderService _orderService;
        
        public OrdersHub(
            OrderService orderService    
        )
        {
            _orderService = orderService;
        }
        public async Task SendOrderCount(int orderCount)
        {
            await Clients.All.SendAsync("ReceiveOrderCount", orderCount);
        }

        public override async Task OnConnectedAsync()
        {
            await _orderService.BroadcastOrderCountAsync();
        }
    }
}
