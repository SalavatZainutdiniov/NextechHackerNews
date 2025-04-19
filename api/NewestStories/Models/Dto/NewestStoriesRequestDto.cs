using System.ComponentModel.DataAnnotations;
using TypeGen.Core.TypeAnnotations;

namespace NewestStories.Models.Dto
{
    [ExportTsInterface]
    public class NewestStoriesRequestDto
    {
        [TsIgnore]
        public const int MAX_PAGE_SIZE = 200;

        [Range(1, int.MaxValue, ErrorMessage = "Page number must be at least 1.")]
        public int PageIndex { get; set; }
        [Range(1, MAX_PAGE_SIZE, ErrorMessage = $"Page size invalid")]
        public int PageSize { get; set; }
        public string? SearchText { get; set; }
    }
}