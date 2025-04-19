using NewestStories.Models.HackerNewsAPI;
using NewestStories.Services.Interfaces;

namespace NewestStories.Services
{
    public class HackerNewsFetcher : IHackerNewsFetcher
    {
        private readonly IHackerNewsClient hackerNewsClient;

        public HackerNewsFetcher(IHackerNewsClient hackerNewsClient)
        {
            this.hackerNewsClient = hackerNewsClient;
        }

        public async Task<HackerNewsStory?> GetStoryByIdAsync(int id)
        {
            return await hackerNewsClient.GetAsync<HackerNewsStory>($"item/{id}.json");
        }
    }
}
