using NewestStories.Models.HackerNewsAPI;
using NewestStories.Models.Settings;
using NewestStories.Services;

using Microsoft.Extensions.Options;

using Moq;
using Moq.Protected;

using System.Net;
using System.Text.Json;

namespace NewestStories.Unit.Tests
{
    public class HackerNewsClientTests
    {
        private Mock<HttpMessageHandler> CreateMockHttpMessageHandler(string json)
        {
            var mockHttpMessageHandler = new Mock<HttpMessageHandler>();

            mockHttpMessageHandler
               .Protected()
               .Setup<Task<HttpResponseMessage>>(
                   "SendAsync",
                   ItExpr.IsAny<HttpRequestMessage>(),
                   ItExpr.IsAny<CancellationToken>())
               .ReturnsAsync(new HttpResponseMessage
               {
                   StatusCode = HttpStatusCode.OK,
                   Content = new StringContent(json)
               });

            return mockHttpMessageHandler;
        }

        [Fact]
        public async Task Get_ReturnsDeserializedObject()
        {
            var testObject = new HackerNewsStory { id = 123, title = "Test Story" };

            var expectedJson = JsonSerializer.Serialize(testObject);

            var mockHttpMessageHandler = CreateMockHttpMessageHandler(expectedJson);

            var httpClient = new HttpClient(mockHttpMessageHandler.Object);

            var options = Options.Create(new HackerNewsOptions
            {
                BaseUrl = "https://fake.api"
            });

            var client = new HackerNewsClient(httpClient, options);

            var actualJson = JsonSerializer.Serialize(await client.GetAsync<HackerNewsStory>("story/1"));

            Assert.Equal(expectedJson, actualJson);
        }

        [Fact]
        public async Task Get_ReturnsNull()
        {
            var mockHttpMessageHandler = CreateMockHttpMessageHandler(string.Empty);

            var httpClient = new HttpClient(mockHttpMessageHandler.Object);

            var options = Options.Create(new HackerNewsOptions
            {
                BaseUrl = "https://fake.api"
            });

            var client = new HackerNewsClient(httpClient, options);

            var story = await client.GetAsync<HackerNewsStory>("story/1");

            Assert.Null(story);
        }

        [Fact]
        public async Task Get_ReturnsUriFormatException()
        {
            var mockHttpMessageHandler = CreateMockHttpMessageHandler(string.Empty);

            var httpClient = new HttpClient(mockHttpMessageHandler.Object);

            var options = Options.Create(new HackerNewsOptions
            {
                BaseUrl = "htt://fake.api"
            });

            var client = new HackerNewsClient(httpClient, options);

            await Assert.ThrowsAsync<UriFormatException>(() => client.GetAsync<HackerNewsStory>("story/1"));
        }
    }
}
