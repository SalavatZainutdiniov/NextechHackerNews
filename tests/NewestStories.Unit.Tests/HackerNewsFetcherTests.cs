using NewestStories.Models.HackerNewsAPI;
using NewestStories.Services;
using NewestStories.Services.Interfaces;

using Moq;

namespace NewestStories.Unit.Tests
{
    public class HackerNewsFetcherTests
    {
        [Fact]
        public async Task GetStoryById_ReturnsStory()
        {
            // Arrange
            var mockClient = new Mock<IHackerNewsClient>();

            var story = new HackerNewsStory
            {
                id = 1,
                title = "Sample Title"
            };

            mockClient
                .Setup(client => client.GetAsync<HackerNewsStory>($"item/{story.id}.json"))
                .ReturnsAsync(story);

            var fetcher = new HackerNewsFetcher(mockClient.Object);

            // Act
            var result = await fetcher.GetStoryByIdAsync(story.id);

            // Assert
            Assert.Equal(story, result);
        }

        [Fact]
        public async Task GetStoryById_ReturnsNull()
        {
            // Arrange
            var mockClient = new Mock<IHackerNewsClient>();

            mockClient
                .Setup(client => client.GetAsync<HackerNewsStory>($"item/123.json"))
                .ReturnsAsync((HackerNewsStory?)null);

            var fetcher = new HackerNewsFetcher(mockClient.Object);

            // Act
            var result = await fetcher.GetStoryByIdAsync(123);

            // Assert
            Assert.Null(result);
        }
    }
}
