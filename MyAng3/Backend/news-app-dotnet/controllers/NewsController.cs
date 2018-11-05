using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace news_app_dotnet.controllers
{
  [Produces("application/json")]
  public class NewsController : Controller
  {
    private const string URL = "https://newsapi.org/v2/";
    private string apiKey = "0db7c16f4e384352946379633a0c161e";

    [Route("api/News/Headlines")]
    [HttpGet]
    public string GetHeadlines()
    {
      string responseString = string.Empty;
      HttpClient client = new HttpClient();
      client.BaseAddress = new Uri(URL);
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      HttpResponseMessage response = client.GetAsync("top-headlines?country=in&apiKey=" + apiKey).Result;
      if (response.IsSuccessStatusCode)
      {
        responseString = response.Content.ReadAsStringAsync().Result;
      }
      return responseString;
    }

    [Route("api/News/Sources")]
    [HttpGet]
    public string GetSources()
    {
      string responseString = string.Empty;
      HttpClient client = new HttpClient();
      client.BaseAddress = new Uri(URL);
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      HttpResponseMessage response = client.GetAsync("sources?apiKey=" + apiKey).Result;
      if (response.IsSuccessStatusCode)
      {
        responseString = response.Content.ReadAsStringAsync().Result;
      }
      return responseString;
    }

    [Route("api/News/{category}/{page}")]
    [HttpGet]
    public string GetNewsByCategory(string category, int page)
    {
      string responseString = string.Empty;
      HttpClient client = new HttpClient();
      client.BaseAddress = new Uri(URL);
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      HttpResponseMessage response = client.GetAsync("top-headlines?country=in&category=" + category + "&apiKey=" + apiKey + "&page=" + page).Result;
      if (response.IsSuccessStatusCode)
      {
        responseString = response.Content.ReadAsStringAsync().Result;
      }
      return responseString;
    }

    [Route("api/News/Search/{searchtext}/{page}")]
    [HttpGet]
    public string GetSearchedNews(string searchtext, int page)
    {
      string responseString = string.Empty;
      HttpClient client = new HttpClient();
      client.BaseAddress = new Uri(URL);
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      HttpResponseMessage response = client.GetAsync("everything?q=" + searchtext + "&apiKey=" + apiKey + "&page=" + page + "&language=en").Result;
      if (response.IsSuccessStatusCode)
      {
        responseString = response.Content.ReadAsStringAsync().Result;
      }
      return responseString;
    }
  }
}
