using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ParkMobileServer.DbContext;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;
using ParkMobileServer.Functions;
using ParkMobileServer.CDEKHttp;

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
				options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
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
				const string client_id = "P9uVcIXC6Q5sLSQJj0tCjt4joMIl3hjI";
				const string client_secret = "gCfbHZSUPizoOevkwSJNMIi0bO17iwav";
                return new CdekHttp(client_id, client_secret);
			});
            
			
			builder.WebHost.UseUrls("http://*:3001");

            //builder.Services.AddHttpsRedirection(options =>
            //{
            //    options.HttpsPort = 5001;
            //});

            builder.Services.AddControllers();

			//TODO: Redis можно прикрутить и не париться(возможно это и зафиксит баг с оптимизацией слайдера)

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

			var app = builder.Build();

			app.UseCors(cors => cors
						.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader());

			//app.UseHttpsRedirection();

			app.UseAuthentication();
			app.UseAuthorization();

			app.MapControllers();

			app.Run();
		}
	}
}