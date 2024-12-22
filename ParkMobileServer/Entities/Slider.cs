namespace ParkMobileServer.Entities
{
    public class Slider
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<SliderImage> Images { get; set; }
    }
}
