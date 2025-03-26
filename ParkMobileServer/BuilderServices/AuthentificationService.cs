using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;

namespace ParkMobileServer.BuilderServices
{
    public static class AuthentificationService
    {
        public static void AddParMobileAuthentificationService(this IServiceCollection services, string? jwtSecret)
        {
            if (string.IsNullOrEmpty(jwtSecret))
            {
                throw new Exception("JwtSecret �� �����!");
            }

            var key = Encoding.UTF8.GetBytes(jwtSecret);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new()
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
        }
    }
}
