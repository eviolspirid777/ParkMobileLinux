using System.Diagnostics;
using ParkMobileServer.Metrics;

namespace ParkMobileServer.Middleware
{
    public class MetricsMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<MetricsMiddleware> _logger;

        public MetricsMiddleware(RequestDelegate next, ILogger<MetricsMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            var path = context.Request.Path.Value ?? string.Empty;
            var method = context.Request.Method;

            try
            {
                await _next(context);
                
                // Увеличиваем счетчик запросов
                ApplicationMetrics.HttpRequestsTotal
                    .WithLabels(method, path, context.Response.StatusCode.ToString())
                    .Inc();

                // Записываем время выполнения
                ApplicationMetrics.HttpRequestDuration
                    .WithLabels(method, path)
                    .Observe(stopwatch.Elapsed.TotalSeconds);
            }
            catch (Exception ex)
            {
                // Увеличиваем счетчик ошибок
                ApplicationMetrics.HttpErrorsTotal
                    .WithLabels(ex.GetType().Name, path)
                    .Inc();

                throw;
            }
        }
    }
} 