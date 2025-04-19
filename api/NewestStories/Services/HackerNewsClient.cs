using NewestStories.Models.Settings;
using NewestStories.Services.Interfaces;

using Microsoft.Extensions.Options;
using System.Text.Json;

namespace NewestStories.Services
{
    public class HackerNewsClient: IHackerNewsClient
    {
        private readonly HttpClient httpClient;
        private readonly IOptions<HackerNewsOptions> hackerNewsOptions;

        public HackerNewsClient(HttpClient httpClient, IOptions<HackerNewsOptions> hackerNewsOptions)
        {
            this.httpClient = httpClient;
            this.hackerNewsOptions = hackerNewsOptions;
        }

        public async Task<T?> GetAsync<T>(string path)
        {
            var url = $"{hackerNewsOptions.Value.BaseUrl}/{path}";

            if (IsValidUrl(url) == false)
            {
                throw new UriFormatException($"Invalid URL format: {url}");
            }

            var json = await httpClient.GetStringAsync(url);

            if (string.IsNullOrEmpty(json))
            {
                return default;
            }

            return JsonSerializer.Deserialize<T>(json);
        }

        private bool IsValidUrl(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }
    }
}