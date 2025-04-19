using NewestStories.Models.Dto;
using NewestStories.Services.Interfaces;

using AutoMapper;

namespace NewestStories.Services
{
    public class NewestStoriesService: INewestStoriesService
    {
        private readonly IHackerNewsClient hackerNewsClient;
        private readonly IHackerNewsFetcher hackerNewsFetcher;
        private readonly IMapper mapper;
        private readonly ILogger<NewestStoriesService> logger;

        public NewestStoriesService(IHackerNewsClient hackerNewsClient, IHackerNewsFetcher hackerNewsFetcher, IMapper mapper, ILogger<NewestStoriesService> logger)
        {
            this.hackerNewsClient = hackerNewsClient;
            this.hackerNewsFetcher = hackerNewsFetcher;
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task<List<StoryDto>> GetNewestStoriesAsync(NewestStoriesRequestDto requestDto)
        {
            var stories = await FetchStories();

            var storiesQuery = stories.AsQueryable();

            if (string.IsNullOrEmpty(requestDto.SearchText) == false)
            {
                storiesQuery = storiesQuery.Where(q=>q.Title.Contains(requestDto.SearchText));
            }

            int page = requestDto.PageIndex;
            int pageSize = requestDto.PageSize;

            return storiesQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        private async Task<List<StoryDto>> FetchStories()
        {
            var newestStoriesIds = await GetNewestStoriesIdsAsync();

            List<int>? notFoundStoriesIds = null;

            var stories = new List<StoryDto>();

            foreach (var id in newestStoriesIds)
            {
                var hackerStory = await hackerNewsFetcher.GetStoryByIdAsync(id);

                if (hackerStory == null)
                {
                    if (notFoundStoriesIds == null)
                    {
                        notFoundStoriesIds = new List<int>();
                    }

                    notFoundStoriesIds.Add(id);

                    continue;
                }

                var storyDto = mapper.Map<StoryDto>(hackerStory);

                stories.Add(storyDto);
            }

            if (notFoundStoriesIds != null)
            {
                logger.LogWarning($"Failed to fetch stories: {string.Join(",", notFoundStoriesIds)}");
            }

            return stories;
        }

        private async Task<List<int>> GetNewestStoriesIdsAsync()
        {
            var ids = await hackerNewsClient.GetAsync<List<int>>("newstories.json");

            return ids ?? new List<int>();
        }
    }
}
