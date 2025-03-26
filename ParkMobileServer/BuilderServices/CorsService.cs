namespace ParkMobileServer.BuilderServices
{
    public enum CORS_ENUM
    {
        LOCAL = 0,
        ANY = 1,
        DEPLOY = 2
    }
    public static class CorsService
    {
        public static void AddCorsService(this IServiceCollection services, CORS_ENUM type)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", policy =>
                {
                    switch(type)
                    {
                        case CORS_ENUM.LOCAL:
                        {
                            policy.WithOrigins("http://localhost:3000") // Разрешаем конкретный домен клиента
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowCredentials(); // Разрешаем передачу cookies и авторизационных данных
                            break;
                        }
                        case CORS_ENUM.ANY:
                        {
                            policy
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                            break;
                        }
                        case CORS_ENUM.DEPLOY:
                        {
                            policy.WithOrigins("https://parkmobile.store")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                            break;
                        }
                    }
                });
            });
        }
    }
}
