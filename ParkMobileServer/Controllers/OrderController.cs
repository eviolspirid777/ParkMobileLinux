using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkMobileServer.DbContext;
using ParkMobileServer.DTO.Order;
using ParkMobileServer.Entities.Orders;
using ParkMobileServer.Mappers.OrderMapper;
using ParkMobileServer.Services;

namespace ParkMobileServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
		private readonly PostgreSQLDbContext _postgreSQLDbContext;
        private readonly OrderService _orderService;
        public OrderController
        (
            PostgreSQLDbContext postgreSQLDbContext,
            OrderService orderService
        )
        {
            _postgreSQLDbContext = postgreSQLDbContext;
            _orderService = orderService;
        }

        [Authorize]
        [HttpGet("Orders")]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _postgreSQLDbContext
                                            .Orders
                                            .AsNoTracking()
                                            .Select(order => OrderMappers.MapToShortOrder(order))
                                            .ToListAsync();
            return Ok(orders);
        }

        [Authorize]
        [HttpPost("GetOrderById")]
        public async Task<IActionResult> GetOrderById([FromQuery] int id)
        {
            var response = await _postgreSQLDbContext
                                            .Orders
                                            .AsNoTracking()
                                            .Include(o => o.Items)
                                            .Include(o => o.Client)
                                            .FirstOrDefaultAsync(o => o.Id == id);

            if (response == null)
            {
                return BadRequest();
            }

            return Ok(OrderMappers.MapToOrder(response));
        }

        [HttpPost("PostOrder")]
        public async Task<IActionResult> PostOrder([FromBody]Order data)
        {
            if(data.Items is not null) {
                foreach(var item in data.Items)
                {
                    item.Order = data;
                }
            }
            await _postgreSQLDbContext
                                .Orders
                                .AddAsync(data);

            await _postgreSQLDbContext.SaveChangesAsync();

            await _orderService.BroadcastOrderCountAsync();

            return Ok();
        }

        [Authorize]
        [HttpPost("ChangeOrderStatus")]
        public async Task<IActionResult> ChangeOrderStatus ([FromBody] OrderStatusRequest data)
        {
            var order = await _postgreSQLDbContext
                                            .Orders
                                            .FindAsync(data.Id);
            if(order == null)
            {
                return BadRequest();
            }

            order.State = data.State;
            await _postgreSQLDbContext.SaveChangesAsync();
            await _orderService.BroadcastOrderCountAsync();

            return Ok();
        }

        [Authorize]
        [HttpDelete("DeleteOrderById/{id}")]
        public async Task<IActionResult> DeleteOrderById(int id)
        {
            var order = await _postgreSQLDbContext
                                    .Orders
                                    .FindAsync(id);
            if(order == null)
            {
                return BadRequest("Не найдена запись");
            }
            _postgreSQLDbContext
                            .Orders
                            .Remove(order);

            await _postgreSQLDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
