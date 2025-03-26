namespace ParkMobileServer.BuilderServices
{
    public static class RedisCacheService
    {
        public static void AddRedisService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = configuration.GetConnectionString("Redis");
                options.InstanceName = "RedisInstance";
            });
        }
    }
}
