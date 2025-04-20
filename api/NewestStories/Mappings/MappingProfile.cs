using NewestStories.Models.Dto;
using NewestStories.Models.HackerNewsAPI;

using AutoMapper;
using System.Net;

namespace NewestStories.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<HackerNewsStory, StoryDto>()
                // sanitize HTML
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.title))// WebUtility.HtmlEncode(src.title)))
                // skip mapping for null values
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
