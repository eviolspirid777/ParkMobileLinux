namespace ParkMobileServer.Entities.Items
{
    public class ArticleEntity
    {
        public int Id { get; set; }
        public string? Article { get; set; }

        public int ItemId { get; set; }
        public ItemEntity Item { get; set; }
    }
}
