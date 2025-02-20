using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ParkMobileServer.DbContext;
using ParkMobileServer.SignalR.Orders;
using System.Threading.Tasks;

namespace ParkMobileServer.Services
{
    public class OrderService
    {
        private readonly IHubContext<OrdersHub> _hubContext;
        private readonly PostgreSQLDbContext _dbContext;

        public OrderService(
            IHubContext<OrdersHub> hubContext,
            PostgreSQLDbContext dbContext
        )
        {
            _hubContext = hubContext;
            _dbContext = dbContext;
        }

        public async Task BroadcastOrderCountAsync()
        {
            var orderCount = await _dbContext
                                                        .Orders
                                                        .Where(order => order.State == null)
                                                        .CountAsync();

            await _hubContext.Clients.All.SendAsync("ReceiveOrderCount", orderCount);
        }
    }
}
