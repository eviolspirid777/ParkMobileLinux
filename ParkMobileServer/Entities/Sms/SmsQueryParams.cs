namespace ParkMobileServer.Entities.Sms
{
    public class SmsQueryParams
    {
        public string To { get; set; } = string.Empty;
        public string Msg { get; set; } = string.Empty;
        public int Json { get; set; } = 1;
        public string? Api_id { get; set; }
    }
}
