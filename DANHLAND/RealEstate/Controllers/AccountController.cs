using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Libs;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using RealEstate.Models;
using RealEstate.Providers;
using RealEstate.Entity;
using System.Web.Security;
using System.Linq;
using RealEstate.Libs;
using RealEstate.Libs.Models;

namespace RealEstate.Controllers
{
    [RoleAuthorize]
    public class AccountController : Controller
    {

        public AccountController()
        {
        }
        RealEstateEntities db = new RealEstateEntities();

        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public JsonResult GetLogin(string Username, string Password)
        {
            string[] rs = { "1", Url.Action("Index", "Home") };
            string stri = HashPassword.Encrypt(Password);
            try
            {
                db = new RealEstateEntities();
                var nguoidung = db.v_users.FirstOrDefault(m => m.TaiKhoan == Username);
                if (nguoidung != null)
                {
                    if (HashPassword.CheckPassWP(Password, nguoidung.MatKhau))
                    {
                        FormsAuthentication.SetAuthCookie(Username, true);
                        var ng = new NguoiDungModel();
                        ng.NguoiDung = nguoidung.NguoiDung;
                        ng.TaiKhoan = nguoidung.TaiKhoan;
                        ng.MatKhau = nguoidung.MatKhau;
                        ng.Email = nguoidung.Email;
                        ng.TenHienThi = nguoidung.TenHienThi;
                        ng.NhomNguoiDung = nguoidung.NhomNguoiDung;
                        ng.TenNhomNguoiDung = nguoidung.TenNhomNguoiDung;
                        Users.SetNguoiDung(ng);
                    }
                    else
                    {
                        rs[0] = "0";
                        rs[1] = "Thông tin đăng nhập không đúng.";
                    }
                }
                else
                {
                    rs[0] = "0";
                    rs[1] = "Thông tin đăng nhập không đúng.";
                }
            }
            catch (Exception ex)
            {
                rs[0] = "0";
              //  rs[1] = "Đã có lỗi xảy ra, xin vui lòng thử lại.";
                rs[1] = ex.Message;
            }
            return Json(rs);
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }
        [AllowAnonymous]
        public string test()
        {
            return HashPassword.MD5Encode("123456", "$P$BS2BkHbWoa1b4nabuGckv/JqdIZivm0");
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
