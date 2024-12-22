namespace ParkMobileServer.Entities
{
    public class SliderImage
    {
        public int Id { get; set; }
        public byte[] ImageData { get; set; }
        public int SliderId { get; set; }
        public Slider Slider { get; set; }
    }
}
