﻿using ParkMobileServer.Entities.Cdek;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using static ParkMobileServer.Entities.Cdek.ServicesClass;

namespace ParkMobileServer.CDEKHttp
{

    public class CdekHttp
    {


        private readonly string _client_id;
        private readonly string _client_secret;
        private readonly string CDEK_API;

        private HttpClient _httpClient;
        public CdekHttp(
            string client_id,
            string client_secret,
            string CDEK_API_FROM_GLOBAL
        )
        {
            _client_id = client_id;
            _client_secret = client_secret;
            CDEK_API = CDEK_API_FROM_GLOBAL;
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
        }


        public async Task<string> AutorizationTokenSubmitAsync()
        {
            var parameters = new Dictionary<string, string>
            {
                { "client_id", _client_id },
                { "client_secret", _client_secret },
                { "grant_type", "client_credentials" }
            };

            var content = new FormUrlEncodedContent(parameters);

            var response = await _httpClient.PostAsync($"{CDEK_API}/oauth/token", content);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Ошибка при получении токена авторизации.");
            }

            response.EnsureSuccessStatusCode();

            var cdekJson = await response.Content.ReadAsStringAsync();
            var deserializedObject = JsonSerializer.Deserialize<CdekAutorizeResponse>(cdekJson);

            if (deserializedObject != null)
            {
                if (_httpClient.DefaultRequestHeaders.Contains("Authorization"))
                {
                    _httpClient.DefaultRequestHeaders.Remove("Authorization");
                }

                _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", $"Bearer {deserializedObject.access_token}");
            }

            return cdekJson;
        }

        public async Task<string> GetAdressesCDEKAsync(AdressesRequestQueryParams parameters)
        {
            var queryParameters = new List<KeyValuePair<string, string>>();

            if (!string.IsNullOrEmpty(parameters.Code)) queryParameters.Add(new KeyValuePair<string, string>("code", parameters.Code));
            if (!string.IsNullOrEmpty(parameters.Type)) queryParameters.Add(new KeyValuePair<string, string>("type", parameters.Type));
            if (!string.IsNullOrEmpty(parameters.PostalCode)) queryParameters.Add(new KeyValuePair<string, string>("postal_code", parameters.PostalCode));
            if (parameters.CityCode.HasValue) queryParameters.Add(new KeyValuePair<string, string>("city_code", parameters.CityCode.ToString()));
            if (!string.IsNullOrEmpty(parameters.CountryCode)) queryParameters.Add(new KeyValuePair<string, string>("country_code", parameters.CountryCode));
            if (parameters.RegionCode.HasValue) queryParameters.Add(new KeyValuePair<string, string>("region_code", parameters.RegionCode.ToString()));
            if (parameters.HaveCashless.HasValue) queryParameters.Add(new KeyValuePair<string, string>("have_cashless", parameters.HaveCashless.Value ? "true" : "false"));
            if (parameters.HaveCash.HasValue) queryParameters.Add(new KeyValuePair<string, string>("have_cash", parameters.HaveCash.Value ? "true" : "false"));
            if (parameters.AllowedCod.HasValue) queryParameters.Add(new KeyValuePair<string, string>("allowed_cod", parameters.AllowedCod.Value ? "true" : "false"));
            if (parameters.IsDressingRoom.HasValue) queryParameters.Add(new KeyValuePair<string, string>("is_dressing_room", parameters.IsDressingRoom.Value ? "true" : "false"));
            if (parameters.WeightMax.HasValue) queryParameters.Add(new KeyValuePair<string, string>("weight_max", parameters.WeightMax.ToString()));
            if (parameters.WeightMin.HasValue) queryParameters.Add(new KeyValuePair<string, string>("weight_min", parameters.WeightMin.ToString()));
            if (!string.IsNullOrEmpty(parameters.Lang)) queryParameters.Add(new KeyValuePair<string, string>("lang", parameters.Lang));
            if (parameters.TakeOnly.HasValue) queryParameters.Add(new KeyValuePair<string, string>("take_only", parameters.TakeOnly.Value ? "true" : "false"));
            if (parameters.IsHandout.HasValue) queryParameters.Add(new KeyValuePair<string, string>("is_handout", parameters.IsHandout.Value ? "true" : "false"));
            if (parameters.IsReception.HasValue) queryParameters.Add(new KeyValuePair<string, string>("is_reception", parameters.IsReception.Value ? "true" : "false"));
            if (parameters.IsMarketplace.HasValue) queryParameters.Add(new KeyValuePair<string, string>("is_marketplace", parameters.IsMarketplace.Value ? "true" : "false"));
            if (parameters.IsLtl.HasValue) queryParameters.Add(new KeyValuePair<string, string>("is_ltl", parameters.IsLtl.Value ? "true" : "false"));
            if (parameters.Fulfillment.HasValue) queryParameters.Add(new KeyValuePair<string, string>("fulfillment", parameters.Fulfillment.Value ? "true" : "false"));
            if (!string.IsNullOrEmpty(parameters.FiasGuid)) queryParameters.Add(new KeyValuePair<string, string>("fias_guid", parameters.FiasGuid));
            if (parameters.Size.HasValue) queryParameters.Add(new KeyValuePair<string, string>("size", parameters.Size.ToString()));
            if (parameters.Page.HasValue) queryParameters.Add(new KeyValuePair<string, string>("page", parameters.Page.ToString()));

            var requestUri = QueryString.Create(queryParameters).ToString();

            var response = await _httpClient.GetAsync($"{CDEK_API}/deliverypoints{requestUri}");
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception();
            }
            response.EnsureSuccessStatusCode();
            var cdekJson = await response.Content.ReadAsStringAsync();

            //var result = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(cdekJson);

            return cdekJson;
        }

        public async Task<string> PostCDEKFormAsync(PostCDEKDeliveryRequest data)
        {
            // Сериализуем объект data в JSON
            var jsonContent = JsonSerializer.Serialize(data);

            // Создаем StringContent из сериализованного JSON
            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{CDEK_API}/orders", httpContent);
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception();
            }
            response.EnsureSuccessStatusCode();
            var cdekJson = await response.Content.ReadAsStringAsync();

            return cdekJson;
        }

        public async Task<bool> DeleteOrderAsync(string uuid)
        {
            var response = await _httpClient.DeleteAsync($"{CDEK_API}/orders/{uuid}");
            if (!response.IsSuccessStatusCode)
            {
                return false;
            }
            return true;
        }

        public async Task<string> GetInfoByUuid(string uuid)
        {
            var response = await _httpClient.GetAsync($"{CDEK_API}/orders/{uuid}");
            response.EnsureSuccessStatusCode();
            var cdekJson = await response.Content.ReadAsStringAsync();

            return cdekJson;
        }

        public async Task<bool> RefuseOrderAsync(string uuid)
        {
            var response = await _httpClient.PostAsync($"{CDEK_API}/orders/{uuid}/refusal", null);
            if (!response.IsSuccessStatusCode)
            {
                return false;
            }
            return true;
        }

        public async Task<string> GetLocationsByNameAsync(string name)
        {
            var response = await _httpClient.GetAsync($"{CDEK_API}/location/suggest/cities?name={name}");

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception();
            }
            response.EnsureSuccessStatusCode();

           var locations = await response.Content.ReadAsStringAsync();
           return locations;
        }
    }
}
