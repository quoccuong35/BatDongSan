using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Libs;
using RealEstate.Libs;
using RealEstate.Entity;
using System.Collections;

namespace RealEstate.Controllers
{
    [RoleAuthorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            return View();
        }
        RealEstateEntities db = new RealEstateEntities();
        public JsonResult test()
        {
            SerializerPHP serializerPHP = new SerializerPHP();
            ArrayList list = new ArrayList();
            list.Add("123"); list.Add("4321"); list.Add(45); list.Add(1);
           // return Json(serializerPHP.Serialize(list), JsonRequestBehavior.AllowGet);
            return Json(serializerPHP.Deserialize("a:5:{s:5:\"width\";i:256;s:6:\"height\";i:256;s:4:\"file\";s:19:\"2020/10/favicon.png\";s:5:\"sizes\";a:7:{s:9:\"thumbnail\";a:4:{s:4:\"file\";s:19:\"favicon-150x150.png\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:9:\"image/png\";}s:17:\"myhome-standard-s\";a:4:{s:4:\"file\";s:19:\"favicon-256x250.png\";s:5:\"width\";i:256;s:6:\"height\";i:250;s:9:\"mime-type\";s:9:\"image/png\";}s:18:\"myhome-standard-xs\";a:4:{s:4:\"file\";s:19:\"favicon-224x140.png\";s:5:\"width\";i:224;s:6:\"height\";i:140;s:9:\"mime-type\";s:9:\"image/png\";}s:20:\"myhome-standard-xxxs\";a:4:{s:4:\"file\";s:18:\"favicon-120x75.png\";s:5:\"width\";i:120;s:6:\"height\";i:75;s:9:\"mime-type\";s:9:\"image/png\";}s:16:\"myhome-square-xs\";a:4:{s:4:\"file\";s:19:\"favicon-200x200.png\";s:5:\"width\";i:200;s:6:\"height\";i:200;s:9:\"mime-type\";s:9:\"image/png\";}s:18:\"myhome-square-xxxs\";a:4:{s:4:\"file\";s:19:\"favicon-100x100.png\";s:5:\"width\";i:100;s:6:\"height\";i:100;s:9:\"mime-type\";s:9:\"image/png\";}s:14:\"myhome-wide-xs\";a:4:{s:4:\"file\";s:19:\"favicon-256x250.png\";s:5:\"width\";i:256;s:6:\"height\";i:250;s:9:\"mime-type\";s:9:\"image/png\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}"), JsonRequestBehavior.AllowGet);
        }

        public string Encrypt(string text)
        {
            return HashPassword.Encrypt(text);
        }

    }
}
