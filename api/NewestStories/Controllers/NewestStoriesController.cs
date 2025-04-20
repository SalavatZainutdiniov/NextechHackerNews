using Microsoft.AspNetCore.Mvc;
using NewestStories.Models.Dto;
using NewestStories.Services.Interfaces;

namespace NewestStories.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewestStoriesController : ControllerBase
    {
        private readonly INewestStoriesService newestStoriesService;

        public NewestStoriesController(INewestStoriesService newestStoriesService)
        {
            this.newestStoriesService = newestStoriesService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]NewestStoriesRequestDto requestDto)
        {
            var responseDto = await newestStoriesService.GetNewestStoriesAsync(requestDto);

            return Ok(responseDto);
        }
    }
}
