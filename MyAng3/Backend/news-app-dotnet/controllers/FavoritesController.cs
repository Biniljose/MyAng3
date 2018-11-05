using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using news_app_dotnet.Models;

namespace news_app_dotnet.Controllers
{
  [Route("api/[controller]")]
  public class FavoritesController : Controller
  {

    private readonly NewsContext _context;

    public FavoritesController(NewsContext context)
    {
      _context = context;
    }

    [HttpGet]
    public IEnumerable<News> GetAll()
    {
      return _context.NewsItems.ToList();
    }

    [HttpGet("{id}", Name = "GetNews")]
    public IActionResult GetById(long id)
    {
      var item = _context.NewsItems.FirstOrDefault(t => t.Id == id);
      if (item == null)
      {
        return NotFound();
      }
      return new ObjectResult(item);
    }


    [HttpPost]
    public IActionResult Create([FromBody] News item)
    {
      if (item == null)
      {
        return BadRequest();
      }

      _context.NewsItems.Add(item);
      _context.SaveChanges();

      return CreatedAtRoute("GetNews", new { id = item.Id }, item);
    }

    [HttpDelete("{title}")]
    public IActionResult Delete(string title)
    {
      var todo = _context.NewsItems.FirstOrDefault(t => t.NewsTitle == title);
      if (todo == null)
      {
        return NotFound();
      }

      _context.NewsItems.Remove(todo);
      _context.SaveChanges();
      return new StatusCodeResult((int)HttpStatusCode.OK);
    }
  }
}
