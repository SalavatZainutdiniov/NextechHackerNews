using TypeGen.Core.TypeAnnotations;

namespace NewestStories.Models.Dto
{
    [ExportTsInterface]
    public class NewestStoriesResponseDto
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalItemsCount { get; set; }
        
        public required List<StoryDto> Stories { get; set; }
    }
}
