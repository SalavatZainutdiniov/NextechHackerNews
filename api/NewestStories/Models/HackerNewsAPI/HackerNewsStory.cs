namespace NewestStories.Models.HackerNewsAPI
{
    public class HackerNewsStory
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Url { get; set; }
        public bool? Deleted { get; set; }
        public bool? Dead { get; set; }
    }
}