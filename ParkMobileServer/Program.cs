using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ParkMobileServer.DbContext;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;
using ParkMobileServer.Functions;
using ParkMobileServer.CDEKHttp;
using ParkMobileServer.SignalR.Orders;
using ParkMobileServer.Services;
using ParkMobileServer.HTTP;

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

			builder.Services.AddDbContext<PostgreSQLDbContext>(options =>
			{
				options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreWorkConnection"));
			});
            builder.Services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = builder.Configuration.GetConnectionString("Redis");
                options.InstanceName = "RedisInstance";
            });
            builder.Services.AddSingleton(provider =>
            {
                var botToken = "7566916254:AAG6ikx9G9a2ETL1lAEbZFWxXmhj7ylq_MY";
                return new TelegramBot.TelegramBot(botToken);
            });
            builder.Services.AddScoped<GetItems>();
			builder.Services.AddScoped<CreateItems>();
			builder.Services.AddSingleton(provider =>
			{
				//TODO: не забудь поменять!!
				//TEST
				const string client_id = "wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP";
				const string client_secret = "RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5";
                const string CDEK_API = "https://api.edu.cdek.ru/v2";
                //PRODUCTION
                //const string client_id = "P9uVcIXC6Q5sLSQJj0tCjt4joMIl3hjI";
                //const string client_secret = "gCfbHZSUPizoOevkwSJNMIi0bO17iwav";
                //const string CDEK_API = "https://api.cdek.ru/v2";

                return new CdekHttp(client_id, client_secret, CDEK_API);
			});
			builder.Services.AddSingleton(provider =>
			{
				const string api_key = "EDC0958C-8540-EB66-D540-0339A6EFFD06";
                return new SMSHttp(api_key);
			});
			
			builder.WebHost.UseUrls("http://*:3001");

            builder.Services.AddControllers();

			string secretKey = builder.Configuration["JwtSecret"];
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

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", policy =>
                {
					policy.WithOrigins("http://localhost:3000") // Разрешаем конкретный домен клиента
						  .AllowAnyHeader()
						  .AllowAnyMethod()
						  .AllowCredentials(); // Разрешаем передачу cookies и авторизационных данных

					//policy
					//		.AllowAnyHeader()
					//		.AllowAnyMethod()
					//		.AllowCredentials();

       //             policy.WithOrigins("https://parkmobile.store")
							//.AllowAnyHeader()
							//.AllowAnyMethod()
							//.AllowCredentials();
                });
            });

            builder.Services.AddSignalR();
            builder.Services.AddScoped<OrderService>();

            var app = builder.Build();

			app.UseCors("AllowSpecificOrigin");

			app.UseAuthentication();
			app.UseAuthorization();

			app.MapHub<OrdersHub>("/OrdersHub");
			app.MapControllers();

			app.Run();
		}
	}
}