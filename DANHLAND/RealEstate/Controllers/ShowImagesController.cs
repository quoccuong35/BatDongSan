using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RealEstate.Libs;
using RealEstate.Libs.Models;
using RealEstate.Entity;
using System.Globalization;

namespace RealEstate.Controllers
{
    public class ShowImagesController : Controller
    {
        // GET: ShowImages

        RealEstateEntities db = new RealEstateEntities();
        public ActionResult Index(string IdCanHo, string Time)
        {
            string sid = HashPassword.Decrypt(IdCanHo.Replace(" ", "+")).ToString();
            string sTime = HashPassword.Decrypt(Time.Replace(" ", "+")).ToString();
            DateTime time = (DateTime.ParseExact(sTime, "MM/dd/yyyy HH:mm", new CultureInfo("en-US")));
            int soPhut = 0;
            try
            {
                soPhut = int.Parse(db.dl_configs.FirstOrDefault(it => it.con_key == "ThoiGianXemLink").con_value);
            }
            catch (Exception)
            {
                soPhut = 0;
            }
            time = time.AddMinutes(soPhut);
            if (DateTime.Compare(time, DateTime.Now) < 0)
            {
                return Content("Link xem hết hiệu lực liên hệ Sale để lấy link mới");
            }
            ChiTietCanHo model = new ChiTietCanHo();

            long idcanho = long.Parse(sid);
            v_canho data = db.Database.SqlQuery<v_canho>("CALL Pro_CanHoChiTiet({0});", idcanho).FirstOrDefault();
            model.CanHo = data;
            model.Images = db.dl_canho_images.Where(it => it.IDCanHo == idcanho).ToList();
            return View(model);
        }
    }
}