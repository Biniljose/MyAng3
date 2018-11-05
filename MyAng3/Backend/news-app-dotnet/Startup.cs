using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using news_app_dotnet.Models;

namespace news_app_dotnet
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      //services.AddDbContext<NewsContext>(opt => opt.UseInMemoryDatabase("NewsList"));
      services.AddCors();
      services.AddMvc();
      //var connection = @"data source=.\SQLEXPRESS;database=FavoriteNewsStore;Integrated Security=SSPI;persist security info=True;";
      var connection = @"data source=news-app-database-2,1433;Initial Catalog=FavoriteNewsStore;User Id=sa;Password=Test1234";
      services.AddDbContext<NewsContext>(options => options.UseSqlServer(connection));
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      // Enable Cors
      app.UseCors(builder => builder
                              .AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowAnyHeader()
                              .AllowCredentials());
      app.UseDefaultFiles();
      app.UseStaticFiles();
      app.UseMvc();

      // Migrate and seed the database during startup. Must be synchronous.
      /*using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
            .CreateScope())
      {
            serviceScope.ServiceProvider.GetService<NewsContext>().Database.Migrate();
            //serviceScope.ServiceProvider.GetService<ISeedService>().SeedDatabase().Wait();
      }*/
    }
  }
}
