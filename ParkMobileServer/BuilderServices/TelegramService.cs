namespace ParkMobileServer.BuilderServices
{
    public static class TelegramService
    {
        public static void AddTelegramService(this IServiceCollection services)
        {
            services.AddScoped(provider =>
            {
                const string botToken = "7566916254:AAG6ikx9G9a2ETL1lAEbZFWxXmhj7ylq_MY";
                return new TelegramBot.TelegramBot(botToken);
            });
        }
    }
}
