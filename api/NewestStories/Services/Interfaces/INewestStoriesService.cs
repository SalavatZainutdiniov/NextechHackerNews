using NewestStories.Models.Dto;

namespace NewestStories.Services.Interfaces
{
    public interface INewestStoriesService
    {
        Task<NewestStoriesResponseDto> GetNewestStoriesAsync(NewestStoriesRequestDto requestDto);
    }
}