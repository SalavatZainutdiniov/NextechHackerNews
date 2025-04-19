using NewestStories.Models.Dto;

namespace NewestStories.Services.Interfaces
{
    public interface INewestStoriesService
    {
        Task<List<StoryDto>> GetNewestStoriesAsync(NewestStoriesRequestDto requestDto);
    }
}