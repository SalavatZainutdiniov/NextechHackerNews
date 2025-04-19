using NewestStories.Mappings;
using NewestStories.Models.Dto;
using NewestStories.Models.HackerNewsAPI;

using AutoMapper;

namespace NewestStories.Unit.Tests
{
    public class DtoTests
    {
        private readonly IMapper mapper;

        public DtoTests()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            config.AssertConfigurationIsValid();

            mapper = config.CreateMapper();
        }

        [Fact]
        public void Should_Map_HackerNewsStory_To_StoryDto()
        {
            var story = new HackerNewsStory
            {
                Id = 1,
                Title = "Test Story",
                Url = "Url"
            };

            var dto = mapper.Map<StoryDto>(story);

            Assert.Equal(story.Id, dto.Id);
            Assert.Equal(story.Title, dto.Title);
            Assert.Equal(story.Url, dto.Url);
        }

        [Fact]
        public void Should_Ignore_NullProperties()
        {
            var story = new HackerNewsStory
            {
                Id = 1,
                Title = "Test Story",
                Url = null
            };

            var dto = mapper.Map<StoryDto>(story);

            Assert.Equal(story.Id, dto.Id);
            Assert.Equal(story.Title, dto.Title);
            Assert.Equal(string.Empty, dto.Url);
        }

    }
}