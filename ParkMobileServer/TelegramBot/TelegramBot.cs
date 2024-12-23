using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ParkMobileServer.TelegramBot
{
	public class TelegramBot
	{
		private readonly string _botToken;
		private readonly HttpClient _httpClient; // Добавили HttpClient как поле класса

		public TelegramBot(string botToken)
		{
			_botToken = botToken;
			_httpClient = new HttpClient(); // Инициализируем HttpClient
		}

		public async Task<string> GetUpdatesAsync(int offset = 0)
		{
			var url = $"https://api.telegram.org/bot{_botToken}/getUpdates?offset={offset + 1}";
			var response = await _httpClient.GetAsync(url);
			response.EnsureSuccessStatusCode();
			var json = await response.Content.ReadAsStringAsync();
			return json;
		}

		public async Task<int> GetLastUpdateIdAsync()
		{
			string json = await GetUpdatesAsync();
			dynamic updates = JsonConvert.DeserializeObject(json);
			if (updates.result != null && updates.result.Count > 0)
			{
				return updates.result[updates.result.Count - 1].update_id;
			}
			return 0;
		}

		public async Task<string> GetResponseFromUser(int timeoutSeconds = 30)
		{
			int offset = await GetLastUpdateIdAsync();
			DateTime timeout = DateTime.Now.AddSeconds(timeoutSeconds);

			while (DateTime.Now < timeout)
			{
				string updatesJson = await GetUpdatesAsync(offset);
				dynamic updates = JsonConvert.DeserializeObject(updatesJson);

				if (updates.result != null)
				{
					foreach (var update in updates.result)
					{
						//Me: 481227813
						//Emil: 643139754
						if (update.message != null && update.message.chat.id == 643139754 )
						{
							offset = update.update_id;
							return update.message.text;
						}
					}
				}
				await Task.Delay(20000);
			}
			return null; // Таймаут
		}

		public async Task SendMessageAsync(string message)
		{
			using (var httpClient = new HttpClient())
			{
				var url = $"https://api.telegram.org/bot{_botToken}/sendMessage";

				//Me: 481227813
				//Emil: 643139754
				foreach (var element in new[] { "643139754"}) // Замените на получение chat_id по userId
				{
					var json = JsonConvert.SerializeObject(new
					{
						chat_id = element,
						text = message
					});

					var content = new StringContent(json, Encoding.UTF8, "application/json");
					var response = await httpClient.PostAsync(url, content);
					response.EnsureSuccessStatusCode();
				}
			}
		}

		public async Task SendTelephoneRecallAlert(string number)
		{
			using (var httpClient = new HttpClient())
			{
				var url = $"https://api.telegram.org/bot{_botToken}/sendMessage";
				//Me: 481227813
				//Emil: 643139754
				foreach (var element in new[] { "643139754" })
				{
					var json = JsonConvert.SerializeObject(new
					{
						chat_id = element,
						text = $"ЗАКАЗ ЗВОНКА!\n\n{number} - заказал звонок для уточнения вопросов!"
					});

					var content = new StringContent(json, Encoding.UTF8, "application/json");
					var response = await httpClient.PostAsync(url, content);
					response.EnsureSuccessStatusCode();
				}
			}
		}
	}
}
