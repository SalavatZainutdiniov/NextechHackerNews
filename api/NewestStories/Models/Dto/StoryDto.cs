using TypeGen.Core.TypeAnnotations;

namespace NewestStories.Models.Dto
{
    [ExportTsInterface]
    public class StoryDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }
}
