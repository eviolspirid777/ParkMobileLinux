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
using ParkMobileServer.BuilderServices;
using static ParkMobileServer.BuilderServices.CdekHttpService;
using ParkMobileServer.Middleware;
using Prometheus;
using ParkMobileServer.Repositories;

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

			builder.Services.AddDbService<PostgreSQLDbContext>(builder.Configuration.GetConnectionString("DefaultConnection"));
			builder.Services.AddRedisService(builder.Configuration.GetConnectionString("Redis"));
			builder.Services.AddTelegramService();
			builder.Services.AddScoped<GetItems>();
			builder.Services.AddScoped<CreateItems>();

			// Регистрация репозиториев
			builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
			builder.Services.AddScoped<IItemRepository, ItemRepository>();

			// Регистрация сервисов
			builder.Services.AddScoped<IItemService, ItemService>();

			builder.Services.AddCdekHttpService(ENV_ENUM.PRODUCTION);
			builder.Services.AddSmsHttpService();

			builder.WebHost.UseUrls("http://*:3001");
			builder.Services.AddControllers();

			builder.Services.AddParMobileAuthentificationService(builder.Configuration["JwtSecret"]);
			builder.Services.AddCorsService(CORS_ENUM.ANY);

			builder.Services.AddSignalR();
			builder.Services.AddScoped<OrderService>();

			var app = builder.Build();

			// Настройка метрик
			app.UseMetricServer();
			app.UseHttpMetrics();
			app.UseMiddleware<MetricsMiddleware>();

			app.UseMiddleware<ExceptionHandlingMiddleware>();

			app.UseCors("AllowSpecificOrigin");

			app.UseAuthentication();
			app.UseAuthorization();

			app.MapHub<OrdersHub>("/OrdersHub");
			app.MapControllers();

			app.Run();
		}
	}
}