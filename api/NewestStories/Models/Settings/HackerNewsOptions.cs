namespace NewestStories.Models.Settings
{
    public class HackerNewsOptions
    {
        public string BaseUrl { get; set; } = string.Empty;
        public int SlidingExpirationMinutes { get; set; }
        public int AbsoluteExpirationMinutes { get; set; }
    }
}