using Bogus;
using NewestStories.Models.HackerNewsAPI;

namespace NewestStories.Integration.Tests.Fakers
{
    public class HackerNewsStoryFaker:Faker<HackerNewsStory>
    {
        public HackerNewsStoryFaker(int idStart = 1, int seed = 0)
        {
            if (seed == 0)
            {
                seed = Guid.NewGuid().GetHashCode();
            }

            var id = idStart;

            UseSeed(seed)
              .RuleFor(c => c.id, _ => id++)
              .RuleFor(c => c.title, f => f.Hacker.Phrase())
              .RuleFor(c => c.url, f => f.Random.Bool(0.7f) ? f.Internet.Url() : null);
        }
    }
}
