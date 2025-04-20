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

        public async Task<NewestStoriesResponseDto> GetNewestStoriesAsync(NewestStoriesRequestDto requestDto)
        {
            bool isPagingApplied = false;

            var newestStoriesIds = await GetNewestStoriesIdsAsync();

            int totalItemsCount = newestStoriesIds.Count;

            if (string.IsNullOrEmpty(requestDto.SearchText))
            {
                newestStoriesIds = ApplyPaging(newestStoriesIds.AsQueryable(), requestDto.PageIndex, requestDto.PageSize).ToList();

                isPagingApplied = true;
            }

            var stories = await FetchStories(newestStoriesIds);

            var storiesQuery = stories.AsQueryable();

            if (string.IsNullOrEmpty(requestDto.SearchText) == false)
            {
                storiesQuery = storiesQuery.Where(q=>q.Title.Contains(requestDto.SearchText));
            }

            if (isPagingApplied == false)
            {
                storiesQuery = ApplyPaging(storiesQuery, requestDto.PageIndex, requestDto.PageSize);
            }

            return new NewestStoriesResponseDto
            {
                PageIndex = requestDto.PageIndex,
                PageSize = requestDto.PageSize,
                Stories = storiesQuery.ToList(),
                TotalItemsCount = totalItemsCount,
                TotalPages = (int)Math.Ceiling(totalItemsCount / (float)requestDto.PageSize)
            };
        }

        private IQueryable<T> ApplyPaging<T>(IQueryable<T> query, int page, int pageSize)
        {
            return query.Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        private async Task<List<StoryDto>> FetchStories(List<int> storiesIds)
        {
            var stories = new List<StoryDto>();

            foreach (var id in storiesIds)
            {
                var hackerStory = await hackerNewsFetcher.GetStoryByIdAsync(id);

                if (hackerStory == null)
                {
                    hackerStory = new Models.HackerNewsAPI.HackerNewsStory
                    {
                        id = -1,
                        title = "Story fetch error",
                        url = ""
                    };
                }

                var storyDto = mapper.Map<StoryDto>(hackerStory);

                stories.Add(storyDto);
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
