using Microsoft.EntityFrameworkCore;

namespace ParkMobileServer.BuilderServices
{
    public static class ParkMobileDbService
    {
        public static void AddDbService<T>(this IServiceCollection services, string? connectionString) where T : DbContext.PostgreSQLDbContext
        {
            services.AddDbContext<T>(options =>
            {
                options.UseNpgsql(connectionString);
            });
        }
    }
}
