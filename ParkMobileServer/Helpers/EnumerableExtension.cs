namespace ParkMobileServer.Helpers
{
    public static class EnumerableExtensions
    {
        public static void Foreach<T>(this IEnumerable<T> enumerable, Action<T> action)
        {
            foreach (var item in enumerable)
                action(item);
        }

        /// <summary>
        /// Возвращает пустую коллекцию если исходная была равна null
        /// </summary>
        public static IEnumerable<T> OrEmpty<T>(this IEnumerable<T>? enumerable)
        {
            return enumerable ?? [];
        }

        /// <summary>
        /// Удаляет из коллекции элементы равные null
        /// </summary>
        public static IEnumerable<T> NotNull<T>(this IEnumerable<T?> enumerable)
        {
            foreach (var item in enumerable)
                if (item is not null)
                    yield return item;
        }

    }
}
