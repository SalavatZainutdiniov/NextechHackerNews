using NewestStories.Models.HackerNewsAPI;
using NewestStories.Models.Settings;
using NewestStories.Services;
using NewestStories.Services.Interfaces;

using Microsoft.Extensions.Caching.Memory;
using Moq;
using Microsoft.Extensions.Options;

namespace NewestStories.Unit.Tests
{
    public class HackerNewsFetcherMemoryCacheTests
    {
        private readonly Mock<IHackerNewsFetcher> innerFetcherMock = new Mock<IHackerNewsFetcher>();
        private IMemoryCache? memoryCache;

        private HackerNewsFetcherMemoryCache CreateService()
        {
            innerFetcherMock.Reset();

            var options = Options.Create(new HackerNewsOptions
            {
                SlidingExpirationMinutes = 5,
                AbsoluteExpirationMinutes = 30
            });

            if (memoryCache != null)
            {
                memoryCache.Dispose();
            }

            memoryCache = new MemoryCache(new MemoryCacheOptions
            {
                SizeLimit = 100
            });

            return new HackerNewsFetcherMemoryCache(innerFetcherMock.Object, options, memoryCache);
        }

        [Fact]
        public async Task GetStory_Cache_Results()
        {
            var service = CreateService();

            int id = 123;
            var story = new HackerNewsStory { id = id, title = "Test story" };

            innerFetcherMock.Setup(x => x.GetStoryByIdAsync(id))
                .ReturnsAsync(story)
                .Verifiable();

            var result1 = await service.GetStoryByIdAsync(id);
            var result2 = await service.GetStoryByIdAsync(id); // second call should use cache

            Assert.Equal(story, result1);
            Assert.Equal(story, result2);

            innerFetcherMock.Verify(x => x.GetStoryByIdAsync(id), Times.Once);
        }

        [Fact]
        public async Task GetStory_NotCache_NullResult()
        {
            var service = CreateService();

            int id = 123;

            innerFetcherMock.Setup(x => x.GetStoryByIdAsync(id))
                .ReturnsAsync((HackerNewsStory?)null)
                .Verifiable();

            var result1 = await service.GetStoryByIdAsync(id);
            var result2 = await service.GetStoryByIdAsync(id);

            Assert.Null(result1);
            Assert.Null(result2);

            // Ensure inner service was called twice because null shouldn't be cached
            innerFetcherMock.Verify(x => x.GetStoryByIdAsync(id), Times.Exactly(2));
        }
    }
}
