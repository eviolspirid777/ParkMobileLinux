using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ParkMobileServer.CDEKHttp;
using ParkMobileServer.Entities.Cdek;
using static ParkMobileServer.Entities.Cdek.ServicesClass;

namespace ParkMobileServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CdekController : ControllerBase
    {
        private readonly CdekHttp _cdekHttp;
        public CdekController(
            CdekHttp cdekHttp
        )
        {
            _cdekHttp = cdekHttp;
        }

        [HttpGet("autorize")]
        public async Task<IActionResult> GetAutorize()
        {
            try
            {
                var response = await _cdekHttp.AutorizationTokenSubmitAsync();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Addresses")]
        public async Task<IActionResult> GetAdresses([FromQuery] AdressesRequestQueryParams req)
        {
            try
            {
                var response = await _cdekHttp.GetAdressesCDEKAsync(req);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PostOrder")]
        public async Task<IActionResult> PostOrder([FromBody] PostCDEKDeliveryRequest data)
        {
            try
            {
                var response = await _cdekHttp.PostCDEKFormAsync(data);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetOrderDataById")]
        public async Task<IActionResult> GetOrderDataById([FromQuery] string id)
        {
            var response = await _cdekHttp.GetInfoByUuid(id);
            return Ok(response);
        }

        [HttpPost("Refusal")]
        public async Task<IActionResult> Refusal([FromQuery] string uuid)
        {
            var response = await _cdekHttp.RefuseOrderAsync(uuid);
            return Ok(response);
        }

        [HttpDelete("DeleteOrder")]
        public async Task<IActionResult> DeleteOrder([FromQuery] string uuid)
        {
            var response = await _cdekHttp.DeleteOrderAsync(uuid);
            return Ok(response);
        }

        [HttpPost("Locations")]
        public async Task<IActionResult> GetLocations([FromBody] CdekLocationsRequest data)
        {
            var response = await _cdekHttp.GetLocationsByNameAsync(data.Name);
            return Ok(response);
        }
    }
}
