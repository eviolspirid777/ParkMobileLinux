using Prometheus;

namespace ParkMobileServer.Metrics
{
    public static class ApplicationMetrics
    {
        // Счетчик HTTP запросов
        public static readonly Counter HttpRequestsTotal = Metrics
            .CreateCounter("http_requests_total", "Общее количество HTTP запросов", 
                new CounterConfiguration
                {
                    LabelNames = new[] { "method", "endpoint", "status" }
                });

        // Счетчик времени выполнения запросов
        public static readonly Histogram HttpRequestDuration = Metrics
            .CreateHistogram("http_request_duration_seconds", "Время выполнения HTTP запросов",
                new HistogramConfiguration
                {
                    LabelNames = new[] { "method", "endpoint" },
                    Buckets = new[] { 0.1, 0.5, 1.0, 2.0, 5.0 }
                });

        // Счетчик ошибок
        public static readonly Counter HttpErrorsTotal = Metrics
            .CreateCounter("http_errors_total", "Общее количество ошибок",
                new CounterConfiguration
                {
                    LabelNames = new[] { "type", "endpoint" }
                });

        // Метрики базы данных
        public static readonly Histogram DatabaseQueryDuration = Metrics
            .CreateHistogram("database_query_duration_seconds", "Время выполнения запросов к БД",
                new HistogramConfiguration
                {
                    LabelNames = new[] { "operation" },
                    Buckets = new[] { 0.1, 0.5, 1.0, 2.0, 5.0 }
                });

        // Метрики кэша
        public static readonly Counter CacheHits = Metrics
            .CreateCounter("cache_hits_total", "Количество попаданий в кэш");
        
        public static readonly Counter CacheMisses = Metrics
            .CreateCounter("cache_misses_total", "Количество промахов кэша");
    }
} 