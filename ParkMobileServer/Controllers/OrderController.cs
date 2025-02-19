using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkMobileServer.DbContext;
using ParkMobileServer.DTO.Order;
using ParkMobileServer.Entities.Orders;
//using System.Data.Entity;

namespace ParkMobileServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
		private readonly PostgreSQLDbContext _postgreSQLDbContext;
        public OrderController
        (
            PostgreSQLDbContext postgreSQLDbContext
        )
        {
            _postgreSQLDbContext = postgreSQLDbContext;
        }

        //[Authorize]
        [HttpGet("Orders")]
        public async Task<IActionResult> GetOrders()
        {
            //TODO: Посмотри почему ToListAsync не работает, возможно проблема в ENUM
            var orders = await _postgreSQLDbContext
                                            .Orders
                                            .AsNoTracking()
                                            .Select(order => new OrderShortDTO {
                                                Id = order.Id,
                                                Comment = order.Comment,
                                                Payment = order.Payment,
                                                State = order.State
                                            })
                                            .ToListAsync();
            return Ok(orders);
        }

        //[Authorize]
        [HttpPost("GetOrderById")]
        public async Task<IActionResult> GetOrderById([FromQuery] int id)
        {
            //TODO: не включается o.items в итоговый запрос
            var response = await _postgreSQLDbContext
                                                    .Orders
                                                    .Include(o => o.Items)
                                                    .Select(order => new
                                                    {
                                                        order.Id,
                                                        order.Comment,
                                                        order.State,
                                                        order.Payment,
                                                        items = order.Items.Select(item => new { item.Id, item.Count}),
                                                    })
                                                    .FirstOrDefaultAsync(o => o.Id == id);

            if (response == null)
            {
                return BadRequest();
            }

            return Ok(response);
        }

        //[Authorize]
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
            return Ok();
        }

        //[Authorize]
        [HttpDelete("DeleteOrderById/{id}")]
        public async Task<IActionResult> DeleteOrderById(int id)
        {
            var order = await _postgreSQLDbContext.Orders.FindAsync(id);
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
