using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ParkMobileServer.DbContext;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;

/*
 * Команды для развертывания докера на серваке
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
 */

//https://cp.sprintbox.ru/customer/boxes/list
//ssh root@45.142.44.239
//pass: 94monizi

namespace ParkMobileServer
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddDbContext<PostgreSQLDbContext>(options =>
			{
				options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
			});

			builder.Services.AddSingleton(provider =>
			{
				var botToken = "7566916254:AAG6ikx9G9a2ETL1lAEbZFWxXmhj7ylq_MY";
				return new TelegramBot.TelegramBot(botToken);
			});

			builder.WebHost.UseUrls("https://*:3001");

			builder.Services.AddControllers();

			//TODO: Redis можно прикрутить и не париться(возможно это и зафиксит баг с оптимизацией слайдера)
			//TODO: Можно сжатие добавить для более лучшей оптимизации
			//TODO: Можно хранить изображения для слайдера в wwwroot для более быстрой загрузки
			// // Тут нужно реализовать сжатие данных через gzip, deflate или br для оптимизации запросов.
			// // Никита предложил прибегнуть к потоковой передачи, но это как-то необычно и странно и бот говорит, что не рационально в этом случае
			// // Add response compression services
			// builder.Services.AddResponseCompression(options =>
			// {
			// 	options.EnableForHttps = true;
			// 	options.Providers.Add<GzipCompressionProvider>();
			// 	options.Providers.Add<BrotliCompressionProvider>();
			// });

			// // Configure compression options
			// builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
			// {
			// 	options.Level = System.IO.Compression.CompressionLevel.Fastest;
			// });

			// builder.Services.Configure<GzipCompressionProviderOptions>(options =>
			// {
			// 	options.Level = System.IO.Compression.CompressionLevel.Fastest;
			// });

			string secretKey = builder.Configuration["JwtSecret"]; // �������� JwtSecret � appsettings.json ��� ���������� ��������� 
			if (string.IsNullOrEmpty(secretKey))
			{
				throw new Exception("JwtSecret �� �����!");
			}
			var key = Encoding.UTF8.GetBytes(secretKey);
			builder.Services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = "ParkMobileServer",
					ValidAudience = "ParkMobileAdmin",
					IssuerSigningKey = new SymmetricSecurityKey(key)
				};
			});

			var app = builder.Build();

			app.UseCors(cors => cors
						.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader());

			// Configure the HTTP request pipeline.

			app.UseAuthentication();
			app.UseAuthorization();

			// Use response compression middleware
			// app.UseResponseCompression();

			app.MapControllers();

			app.Run();
		}
	}
}