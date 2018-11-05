using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using news_app_dotnet.Controllers;
using news_app_dotnet.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Test
{
    public class FavoriteControllerTest
    {
        NewsContext _context;
        public FavoriteControllerTest()
        {
            var options = new DbContextOptionsBuilder<NewsContext>()
               .UseInMemoryDatabase(databaseName: "InMemoryNewsDB")
               .Options;

            _context = new NewsContext(options);
            _context.NewsItems.Add(new News { NewsTitle = "Item1" });
            _context.SaveChanges();
        }

        [Fact]
        public void GetAllTest()
        {
            var controller = new FavoritesController(_context);
            var result = controller.GetAll();
            Assert.True(result != null);
        }

        [Fact]
        public void CreateTest()
        {
            var controller = new FavoritesController(_context);
            News newsItem = new News { NewsTitle = "Title", NewsDescription = "Desc" };
            var result = controller.Create(newsItem);
            Assert.True(result != null);
        }

        [Fact]
        public void DeleteTest()
        {
            var controller = new FavoritesController(_context);
            var result = controller.Delete("Item1");
            Assert.True(result != null);
        }

        [Fact]
        public void GetByIdTest()
        {
            var controller = new FavoritesController(_context);
            var result = controller.GetById(1);
            Assert.True(result != null);
        }
    }
}
