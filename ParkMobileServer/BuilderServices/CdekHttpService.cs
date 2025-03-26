using ParkMobileServer.CDEKHttp;
using ParkMobileServer.HTTP;

namespace ParkMobileServer.BuilderServices
{
    public static class CdekHttpService
    {
        public enum ENV_ENUM
        {
            TEST = 0,
            PRODUCTION
        }

        public static void AddCdekHttpService(this IServiceCollection services, ENV_ENUM type)
        {
            services.AddSingleton(provider =>
            {
                switch(type)
                {
                    case ENV_ENUM.TEST:
                        return new CdekHttp(
                            "wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP",
                            "RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5",
                            "https://api.edu.cdek.ru/v2"
                        );
                    case ENV_ENUM.PRODUCTION:
                        return new CdekHttp(
                            "P9uVcIXC6Q5sLSQJj0tCjt4joMIl3hjI",
                            "gCfbHZSUPizoOevkwSJNMIi0bO17iwav",
                            "https://api.cdek.ru/v2"
                        );
                }
                //TODO: не забудь поменять!!
                //TEST
                //const string client_id = "wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP";
                //const string client_secret = "RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5";
                //            const string CDEK_API = "https://api.edu.cdek.ru/v2";
                //PRODUCTION
                const string client_id = "P9uVcIXC6Q5sLSQJj0tCjt4joMIl3hjI";
                const string client_secret = "gCfbHZSUPizoOevkwSJNMIi0bO17iwav";
                const string CDEK_API = "https://api.cdek.ru/v2";

                return new CdekHttp(client_id, client_secret, CDEK_API);
            });
        }
    }
}
