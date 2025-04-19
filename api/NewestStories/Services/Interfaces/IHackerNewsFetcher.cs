using NewestStories.Models.HackerNewsAPI;

namespace NewestStories.Services.Interfaces
{
    public interface IHackerNewsFetcher
    {
        Task<HackerNewsStory?> GetStoryByIdAsync(int id);
    }
}
