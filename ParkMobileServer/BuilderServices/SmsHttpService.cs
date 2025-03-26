using ParkMobileServer.HTTP;

namespace ParkMobileServer.BuilderServices
{
    public static class SmsHttpService
    {
        public static void AddSmsHttpService(this IServiceCollection services)
        {
            services.AddSingleton(provider =>
            {
                const string api_key = "EDC0958C-8540-EB66-D540-0339A6EFFD06";
                return new SMSHttp(api_key);
            });
        }
    }
}
