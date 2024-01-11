using Newtonsoft.Json;
using RealEstate.Libs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Libs;
using System.Web.Mvc;

namespace RealEstate.Controllers
{
    public class LichXemNhaController : Controller
    {
        // GET: LichXemNha
        [RoleAuthorize(Roles = "0=0,26=1")]
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetLichXemNha(string fill)
        {
           
            string[] ar = fill.Split(',');
            string tu = ar[2].Substring(1, 10), den = ar[5].Substring(1, 10);
            clsFunction cls = new clsFunction();
            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            DataTable dt = cls.GetData("call proc_yeucau_lichxemnha( " + nguoidung.NhomNguoiDung + "," + nguoidung.NguoiDung + ",'" + tu + "','" + den + "' );", "RealEstateEntities");
            
            var json = Json(JsonConvert.SerializeObject(dt, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore }), JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;
        }
    }
}