namespace NewestStories.Models.HackerNewsAPI
{
    public class HackerNewsStory
    {
        public int id { get; set; }
        public string title { get; set; } = string.Empty;
        public string? url { get; set; }
    }
}