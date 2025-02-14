namespace ParkMobileServer.Entities.Cdek
{
    public class CdekAutorizeResponse
    {
        public string access_token { get; set; } = string.Empty;
        public string token_type { get; set; } = string.Empty;
        public int expires_in { get; set; }
        public string scope { get; set; } = string.Empty;
        public string jti { get; set; } = string.Empty;
    }
}
