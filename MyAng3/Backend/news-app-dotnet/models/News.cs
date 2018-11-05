using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace news_app_dotnet.Models
{
  public class News
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string NewsTitle { get; set; }
    public string NewsDescription { get; set; }
    public string NewsImage { get; set; }
    public DateTime NewsPubishedTime { get; set; }
  }
}
