using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ParkMobileServer.DbContext;
using ParkMobileServer.Entities.Orders;
using System.Data.Entity;

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
            var orders = _postgreSQLDbContext
                                                        .Order;
            return Ok(orders);
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
                                        .Order
                                        .AddAsync(data);

            await _postgreSQLDbContext.SaveChangesAsync();
            return Ok();
        }

        //[Authorize]
        [HttpPost("GetOrderById")]
        public async Task<IActionResult> GetOrderById([FromQuery] int id)
        {
            var response = await _postgreSQLDbContext
                                                    .Order
                                                    .FindAsync(id);

            return Ok(response);
        }

        //[Authorize]
        [HttpDelete("DeleteOrderById/{id}")]
        public async Task<IActionResult> DeleteOrderById(int id)
        {
            var order = await _postgreSQLDbContext.Order.FindAsync(id);
            if(order == null)
            {
                return BadRequest("Не найдена запись");
            }
            _postgreSQLDbContext
                            .Order
                            .Remove(order);
            return Ok();
        }
    }
}
