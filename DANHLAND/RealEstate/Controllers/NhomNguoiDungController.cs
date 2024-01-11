using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using RealEstate.Libs.Models;
using RealEstate.Entity;
using RealEstate.Libs;
using System.Transactions;
using System.Web.Libs;

namespace RealEstate.Controllers
{
    public class NhomNguoiDungController : Controller
    {
        // GET: NhomNguoiDung
        [RoleAuthorize(Roles = "0=0,60=1")]
        public ActionResult Index()
        {
            return View();
        }
        public async Task<JsonResult> GetNhomNguoiDung() {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                var model = (from a in db.dl_nhom_nguoi_dung
                             join b in db.dl_nhom_nguoi_dung_level on a.id_level equals b.id_level
                             select new { a.id_nhom_nguoi_dung, a.ten_nhom_nguoi_dung, a.mo_ta, b.ten_level }).ToList();
                //var model = db.dl_nhom_nguoi_dung.ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
        [RoleAuthorize(Roles = "0=0,60=1")]
        public ActionResult ChiTietNhomNguoiDung(int? id)
        {
            try
            {
                using (RealEstateEntities db = new RealEstateEntities())
                {
                    var model = new dl_nhom_nguoi_dung();
                    List<v_phanquyen> phanQuyen;
                    if (id != null)
                    {
                        model = db.dl_nhom_nguoi_dung.FirstOrDefault(it => it.id_nhom_nguoi_dung == id);
                        phanQuyen = db.Database.SqlQuery<v_phanquyen>("CALL proc_phanquyen({0});", id).ToList();
                    }
                    else
                    {
                        phanQuyen = db.Database.SqlQuery<v_phanquyen>("CALL proc_phanquyen({0});", 0).ToList();
                    }
                    ViewBag.phanQuyen = phanQuyen;
                    return View(model);
                }
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,60=1")]
        public async Task<JsonResult> AdNhomNguoiDung(dl_nhom_nguoi_dung item, int []listQuyen)
        {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            try
            {
                using (RealEstateEntities db = new RealEstateEntities())
                {
                    using (var tran = new TransactionScope())
                    {
                        var nguoidung = Users.GetNguoiDung(User.Identity.Name);

                        var check = db.dl_nhom_nguoi_dung.Where(it => it.ten_nhom_nguoi_dung.Trim().ToLower() == item.ten_nhom_nguoi_dung.ToLower().Trim()).ToList();
                        if (check.Count > 0)
                        {
                            rs.rs_text = "Tên nhóm đã tồn tại không thể thêm";
                            return Json(rs, JsonRequestBehavior.AllowGet);
                        }
                        DateTime date = DateTime.Now;
                        item.NguoiDungTao = nguoidung.NguoiDung;
                        item.NgayTao = date;
                        db.dl_nhom_nguoi_dung.Add(item);
                        if (await db.SaveChangesAsync() > 0)
                        {
                            int idNhomNguoiDung = db.dl_nhom_nguoi_dung.Where(it => it.NguoiDungTao == item.NguoiDungTao).Max(it => it.id_nhom_nguoi_dung);
                            List<dl_phan_quyen> phanQuyen = new List<dl_phan_quyen>();
                            foreach (var q in listQuyen)
                            {
                                phanQuyen.Add(new dl_phan_quyen { IdDoiTuong = idNhomNguoiDung, IdQuyen = q, LaNguoiDung = false, Quyen = "" + q.ToString() + "=1", NguoiTao = (int)nguoidung.NguoiDung, NgayTao = date });
                            }
                            db.dl_phan_quyen.AddRange(phanQuyen);
                            db.SaveChanges();
                            tran.Complete();
                            rs.rs_code = 1;
                            rs.rs_text = idNhomNguoiDung.ToString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                rs.rs_text = ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,60=1")]
        public async Task<JsonResult> EditNhomNguoiDung(dl_nhom_nguoi_dung item, int[] listQuyen)
        {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            try
            {
                using (RealEstateEntities db = new RealEstateEntities())
                {
                    using (var tran = new TransactionScope())
                    {
                        var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                        DateTime date = DateTime.Now;
                        var edit = db.dl_nhom_nguoi_dung.FirstOrDefault(it => it.id_nhom_nguoi_dung == item.id_nhom_nguoi_dung);
                        edit.mo_ta = item.mo_ta;
                        edit.id_level = item.id_level;
                        edit.ten_nhom_nguoi_dung = item.ten_nhom_nguoi_dung;
                        edit.NgaySua = date;
                        edit.NguoiDungSua = nguoidung.NguoiDung;
                        var delQuyen = db.dl_phan_quyen.Where(it => it.IdDoiTuong == item.id_nhom_nguoi_dung).ToList();
                        db.dl_phan_quyen.RemoveRange(delQuyen);
                        List<dl_phan_quyen> phanQuyen = new List<dl_phan_quyen>();
                        foreach (var q in listQuyen)
                        {
                            phanQuyen.Add(new dl_phan_quyen { IdDoiTuong = item.id_nhom_nguoi_dung, IdQuyen = q, LaNguoiDung = false, Quyen = "" + q.ToString() + "=1", NguoiTao = (int)nguoidung.NguoiDung, NgayTao = date });
                        }
                        db.dl_phan_quyen.AddRange(phanQuyen);
                        db.SaveChanges();
                        tran.Complete();
                        rs.rs_code = 1;
                        rs.rs_text = item.id_nhom_nguoi_dung.ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                rs.rs_text = ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,60=1")]
        public async Task<JsonResult> XoaNhomNguoiDung(int id)
        {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            try
            {
                using (RealEstateEntities db = new RealEstateEntities())
                {
                    using (var tran = new TransactionScope())
                    {
                        var delNhomNguoiDung = db.dl_nhom_nguoi_dung.FirstOrDefault(it => it.id_nhom_nguoi_dung == id);
                        var delQuyen = db.dl_phan_quyen.Where(it => it.IdDoiTuong == id).ToList();
                        db.dl_phan_quyen.RemoveRange(delQuyen);
                        db.dl_nhom_nguoi_dung.Remove(delNhomNguoiDung);
                        db.SaveChanges();
                        tran.Complete();
                        rs.rs_code = 1;
                    }
                }
            }
            catch (Exception ex)
            {
                rs.rs_text = ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}