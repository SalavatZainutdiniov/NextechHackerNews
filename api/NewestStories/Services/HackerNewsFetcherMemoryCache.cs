using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

using NewestStories.Models.HackerNewsAPI;
using NewestStories.Models.Settings;
using NewestStories.Services.Interfaces;

namespace NewestStories.Services
{
    public class HackerNewsFetcherMemoryCache : IHackerNewsFetcher
    {
        private readonly IHackerNewsFetcher innerService;
        private readonly IOptions<HackerNewsOptions> hackerNewsOptions;
        private readonly IMemoryCache cache;

        private MemoryCacheEntryOptions? cacheOptions;

        public HackerNewsFetcherMemoryCache(IHackerNewsFetcher innerService, IOptions<HackerNewsOptions> hackerNewsOptions, IMemoryCache cache)
        {
            this.innerService = innerService;
            this.hackerNewsOptions = hackerNewsOptions;
            this.cache = cache;
        }

        public async Task<HackerNewsStory?> GetStoryByIdAsync(int id)
        {
            string storyKey = $"story_{id}";

            if (cache.TryGetValue(storyKey, out HackerNewsStory? cachedStory))
            {
                return cachedStory;
            }

            var story = await innerService.GetStoryByIdAsync(id);

            if (story == null)
            {
                return null;
            }

            cache.Set(storyKey, story, GetOrCreateCacheOptions());

            return story;
        }

        private MemoryCacheEntryOptions GetOrCreateCacheOptions()
        {
            if (cacheOptions == null)
            {
                cacheOptions = new MemoryCacheEntryOptions()
                    .SetSize(1) // cache units
                    .SetSlidingExpiration(TimeSpan.FromMinutes(hackerNewsOptions.Value.SlidingExpirationMinutes))
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(hackerNewsOptions.Value.AbsoluteExpirationMinutes))
                    .SetPriority(CacheItemPriority.Normal);
            }

            return cacheOptions;
        }
    }
}
