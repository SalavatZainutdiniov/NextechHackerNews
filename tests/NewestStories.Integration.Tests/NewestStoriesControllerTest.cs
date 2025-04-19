using NewestStories.Integration.Tests.WebApplicationFactories;

namespace NewestStories.Integration.Tests
{
    public class NewestStoriesControllerTest : IClassFixture<NewestStoriesWebApplicationFactory>
    {
        private readonly NewestStoriesWebApplicationFactory factory;

        public NewestStoriesControllerTest(NewestStoriesWebApplicationFactory factory)
        {
            this.factory = factory;
        }
    }
}
