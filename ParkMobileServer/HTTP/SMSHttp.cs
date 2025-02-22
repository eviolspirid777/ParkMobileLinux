using ParkMobileServer.Entities.Sms;

namespace ParkMobileServer.HTTP
{
    public class SMSHttp
    {
        private readonly HttpClient _httpClient;
        private readonly string _api_key;
        public SMSHttp(
            string api_key
        )
        {
            _api_key = api_key;
            _httpClient = new HttpClient();
        }
        public async Task<HttpResponseMessage> SendMessage(SmsQueryParams parameters)
        {
            var queryParameters = new List<KeyValuePair<string, string>>([
                new KeyValuePair<string, string>("api_id", _api_key),
                new KeyValuePair<string, string>("json", parameters.Json.ToString())
            ]);

            if (!string.IsNullOrEmpty(parameters.To)) queryParameters.Add(new KeyValuePair<string, string>("to", parameters.To));
            if (!string.IsNullOrEmpty(parameters.Msg)) queryParameters.Add(new KeyValuePair<string, string>("msg", parameters.Msg));

            var requestUri = QueryString.Create(queryParameters).ToString();

            var response = await _httpClient.PostAsync($"https://sms.ru/sms/send{requestUri}", null);

            return response;
        }
    }
}
