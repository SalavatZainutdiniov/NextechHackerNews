using NewestStories.Mappings;
using NewestStories.Models.Settings;
using NewestStories.Services;
using NewestStories.Services.Interfaces;

using Autofac;
using Autofac.Extensions.DependencyInjection;

namespace NewestStories
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.Configure<HackerNewsOptions>(
                builder.Configuration.GetSection("HackerNews"));

            var origins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
              ?? builder.Configuration["Cors__AllowedOrigins"]?.Split(",")
              ?? [];

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins(origins) 
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddAutoMapper(typeof(MappingProfile));

            builder.Services.AddMemoryCache(options =>
            {
                options.SizeLimit = 1024; // cache units
            });

            builder.Services.AddHttpClient();

            builder.Services.AddScoped<IHackerNewsClient, HackerNewsClient>();
            builder.Services.AddScoped<IHackerNewsFetcher, HackerNewsFetcher>();
            builder.Services.AddScoped<INewestStoriesService, NewestStoriesService>();

            // decorators
            builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
            builder.Host.ConfigureContainer<ContainerBuilder>(container =>
            {
                // services
                container.RegisterType<HackerNewsFetcher>().As<IHackerNewsFetcher>().InstancePerLifetimeScope();

                // decorators
                container.RegisterDecorator<HackerNewsFetcherMemoryCache, IHackerNewsFetcher>();
            });

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseCors();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
