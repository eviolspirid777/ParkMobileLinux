using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ParkMobileServer.CDEKHttp;
using ParkMobileServer.Entities.Cdek;

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
        public async  Task<IActionResult> GetAdresses([FromQuery] AdressesRequestQueryParams req)
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
    }
}
