using news_app_dotnet.controllers;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Test
{
    public class NewsControllerTest
    {
        [Fact]
        public void GetHeadlinesTest()
        {
            var controller = new NewsController();
            var result = controller.GetHeadlines();            
            Assert.True(result != null);
        }

        [Fact]
        public void GetSourcesTest()
        {
            var controller = new NewsController();
            var result = controller.GetSources();
            Assert.True(result != null);
        }

        [Fact]
        public void GetNewsByCategoryTest()
        {
            var controller = new NewsController();
            var result = controller.GetNewsByCategory("general",2);
            Assert.True(result != null);
        }

        [Fact]
        public void GetSearchedNewsTest()
        {
            var controller = new NewsController();
            var result = controller.GetSearchedNews("sachin", 1);
            Assert.True(result != null);
        }
    }
}
