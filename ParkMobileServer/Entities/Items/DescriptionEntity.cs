namespace ParkMobileServer.Entities.Items
{
    public class DescriptionEntity
    {
        public int Id { get; set; }
        public string? Description { get; set; }

        public int ItemId { get; set; }
        public ItemEntity Item { get; set; }
    }
}
