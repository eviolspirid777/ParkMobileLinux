namespace ParkMobileServer.BuilderServices
{
    public static class RedisCacheService
    {
        public static void AddRedisService(this IServiceCollection services, string? connectionString)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = connectionString;
                options.InstanceName = "RedisInstance";
            });
        }
    }
}
