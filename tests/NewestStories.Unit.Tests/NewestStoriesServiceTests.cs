using NewestStories.Models.Dto;
using NewestStories.Models.HackerNewsAPI;
using NewestStories.Services;
using NewestStories.Services.Interfaces;

using AutoMapper;
using Moq;

namespace NewestStories.Unit.Tests
{
    public class NewestStoriesServiceTests
    {
        private readonly Mock<IHackerNewsClient> hackerNewsClientMock = new Mock<IHackerNewsClient>();
        private readonly Mock<IHackerNewsFetcher> hackerNewsFetcherMock = new Mock<IHackerNewsFetcher>();
        private readonly Mock<IMapper> mapperMock = new Mock<IMapper>();

        private NewestStoriesService CreateService()
        {
            hackerNewsClientMock.Reset();
            hackerNewsFetcherMock.Reset();
            mapperMock.Reset();

            return new NewestStoriesService(hackerNewsClientMock.Object, hackerNewsFetcherMock.Object, mapperMock.Object);
        }

        [Theory]
        [InlineData(6, 2, 2)]
        [InlineData(5, 3, 2)]
        [InlineData(5, 4, 2)]
        public async Task GetNewestStories_ReturnsPagedStories(int count, int pageIndex, int pageSize)
        {
            var service = CreateService();

            var storyIds = new List<int>();

            for (int i = 0; i < count; i++)
            {
                storyIds.Add(i + 1);
            }

            hackerNewsClientMock.Setup(c => c.GetAsync<List<int>>("newstories.json"))
                .ReturnsAsync(storyIds);

            var hackerStories = new List<HackerNewsStory>();

            foreach (var id in storyIds)
            {
                hackerStories.Add(new HackerNewsStory
                {
                    id = id,
                    title = $"Title {id}",
                });
            }

            for (int i = 0; i < storyIds.Count; i++)
            {
                hackerNewsFetcherMock.Setup(f => f.GetStoryByIdAsync(storyIds[i]))
                    .ReturnsAsync(hackerStories[i]);

                mapperMock.Setup(m => m.Map<StoryDto>(hackerStories[i]))
                    .Returns(new StoryDto { Id = hackerStories[i].id, Title = hackerStories[i].title });
            }

            var requestDto = new NewestStoriesRequestDto
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
            };

            var foundStories = (await service.GetNewestStoriesAsync(requestDto)).Stories;

            var resultsCount = Math.Min(pageSize, Math.Max(0, count - (pageIndex - 1) * pageSize));
            var beginId = (pageIndex - 1) * pageSize + 1;

            Assert.Equal(resultsCount, foundStories.Count);

            for (int i = 0; i < foundStories.Count; i++)
            {
                Assert.Equal(beginId + i, foundStories[i].Id);
            }
        }

        [Theory]
        [InlineData(6, 4)]
        [InlineData(5, 2)]
        [InlineData(5, 3)]
        [InlineData(5, 5)]
        [InlineData(5, 0)]
        public async Task GetNewestStories_ReturnsFilteredStories(int count, int storiesCount)
        {
            const string SEARCH_TEMPLATE = "story";

            Assert.InRange(storiesCount, 0, count);

            Assert.InRange(count, 0, NewestStoriesRequestDto.MAX_PAGE_SIZE);

            var service = CreateService();

            var storyIds = new List<int>();

            for (int i = 0; i < count; i++)
            {
                storyIds.Add(i + 1);
            }

            hackerNewsClientMock.Setup(c => c.GetAsync<List<int>>("newstories.json"))
                .ReturnsAsync(storyIds);

            var hackerStories = new List<HackerNewsStory>();

            int createdStoriesCount = 0;

            foreach (var id in storyIds)
            {
                string title = $"Title {id}";

                if (createdStoriesCount < storiesCount)
                {
                    title += SEARCH_TEMPLATE;
                    createdStoriesCount++;
                }

                hackerStories.Add(new HackerNewsStory
                {
                    id = id,
                    title = title,
                });
            }

            for (int i = 0; i < storyIds.Count; i++)
            {
                hackerNewsFetcherMock.Setup(f => f.GetStoryByIdAsync(storyIds[i]))
                    .ReturnsAsync(hackerStories[i]);

                mapperMock.Setup(m => m.Map<StoryDto>(hackerStories[i]))
                    .Returns(new StoryDto { Id = hackerStories[i].id, Title = hackerStories[i].title });
            }

            var requestDto = new NewestStoriesRequestDto
            {
                PageIndex = 1,
                PageSize = NewestStoriesRequestDto.MAX_PAGE_SIZE,
                SearchText = SEARCH_TEMPLATE
            };

            var foundStories = (await service.GetNewestStoriesAsync(requestDto)).Stories;

            Assert.Equal(Math.Min(count, storiesCount), foundStories.Count);

            for (int i = 0; i < foundStories.Count; i++)
            {
                Assert.Contains(SEARCH_TEMPLATE, foundStories[i].Title);
            }
        }
    }
}
