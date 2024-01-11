using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RealEstate.Entity;
using RealEstate.Libs.Models;
using System.Threading.Tasks;
using System.Reflection;
using CaptchaMvc;
using System.Web.Libs;

namespace RealEstate.Controllers
{
    public class HistoryController : Controller
    {
        // GET: History
        [RoleAuthorize(Roles = "0=0,62=1")]
        public ActionResult Index()
        {
            // lấy tất cả contronler anh action
            //var result = Assembly.GetExecutingAssembly()
            //.GetTypes()
            //.Where(type => typeof(Controller).IsAssignableFrom(type))
            //.SelectMany(type => type.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public))
            //.Where(m => !m.GetCustomAttributes(typeof(System.Runtime.CompilerServices.CompilerGeneratedAttribute), true).Any())
            //.GroupBy(x => x.DeclaringType.Name)
            //.Select(x => new { Controller = x.Key, Actions = x.Select(s => s.Name).ToList() })
            //.ToList();

            return View();
        }
        [RoleAuthorize(Roles = "0=0,62=1")]
        public async Task<JsonResult>GetHistory()
        {
            ResponseStatus rs = new ResponseStatus();

            using (var db = new  RealEstateEntities())
            {
                rs.rs_data = db.v_history.ToList();
            }
            
            var rss = Json(rs, JsonRequestBehavior.AllowGet);
            rss.MaxJsonLength = int.MaxValue;
            return rss;
        }
    }

}
public class ControllerActions
{
    public string Controller { get; set; }
    public string Action { get; set; }
    public string Attributes { get; set; }
    public string ReturnType { get; set; }
}