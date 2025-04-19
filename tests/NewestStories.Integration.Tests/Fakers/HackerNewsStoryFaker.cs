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
              .RuleFor(c => c.Id, _ => id++)
              .RuleFor(c => c.Title, f => f.Hacker.Phrase())
              .RuleFor(c => c.Url, f => f.Random.Bool(0.7f) ? f.Internet.Url() : null);
        }
    }
}
