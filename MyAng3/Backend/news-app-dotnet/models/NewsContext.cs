using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using news_app_dotnet.Models;

namespace news_app_dotnet.Models
{
  public class NewsContext : DbContext, IMyDbContext
  {
    public NewsContext(DbContextOptions<NewsContext> options)
        : base(options)
    {
    }

    public DbSet<News> NewsItems { get; set; }

  }
}
public interface IMyDbContext
{
  DbSet<News> NewsItems { get; set; }
}
