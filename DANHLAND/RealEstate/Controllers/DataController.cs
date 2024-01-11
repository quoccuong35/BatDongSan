using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using RealEstate.Entity;

namespace RealEstate.Controllers
{
    public class DataController : Controller
    {
        // GET: Data
        RealEstateEntities db = new RealEstateEntities();
        public ActionResult Index()
        {
            return View();
        }
        public async Task<JsonResult> GetDanhMuc()
        {
            List<String> sWhere = new List<string>();
            sWhere.Add("huong");
            sWhere.Add("du-an");
            sWhere.Add("chu-dau-tu");
            sWhere.Add("loai-can-ho");
            sWhere.Add("loai-kinh-doanh");
            sWhere.Add("trang-thai");
            sWhere.Add("loai");
            var data = (from a in db.wp_terms join b in db.wp_term_taxonomy on a.term_id equals b.term_id
                        where sWhere.Contains(b.taxonomy) select new { b.term_taxonomy_id,a.name, b.taxonomy }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}