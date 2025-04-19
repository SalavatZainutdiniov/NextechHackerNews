namespace NewestStories.Services.Interfaces
{
    public interface IHackerNewsClient
    {
        Task<T?> GetAsync<T>(string path);
    }
}