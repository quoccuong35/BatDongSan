using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RealEstate.Entity;
using RealEstate.Libs.Models;
using System.Transactions;
using System.Threading.Tasks;
using System.Text;
using RealEstate.Libs;
using System.Web.Libs;

namespace RealEstate.Controllers
{
    public class NhanVienController : Controller
    {
        // GET: NhanVien
        [RoleAuthorize(Roles = "0=0,50=1")]
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetNhanVien()
        {
            using (RealEstateEntities db = new RealEstateEntities()) {
                var model = db.v_nhanvien.ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
        [RoleAuthorize(Roles = "0=0,51=1,52=1")]
        public ActionResult ChiTietNhanVien(decimal? id)
        {
            wp_users model = new wp_users();
            using (RealEstateEntities db = new RealEstateEntities())
            {
                if (id != null)
                {
                    model = db.wp_users.FirstOrDefault(it => it.ID == id);
                    model.user_activation_key = db.wp_usermeta.FirstOrDefault(it => it.meta_key == "agent_phone" && it.user_id == id).meta_value;
                    var NguoiDungPQ = db.dl_nguoidung_phanquyen_nhomnguoidung.Where(it => it.nguoi_dung == id).ToList();
                    ViewBag.NguoiDungPQ = NguoiDungPQ;
                }
                var NhomNguoiDung = db.dl_nhom_nguoi_dung.ToList();
                ViewBag.NhomNguoiDung = NhomNguoiDung;

            }
            return View(model);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [ValidateInput(false)]
        [RoleAuthorize(Roles = "0=0,51=1")]

        public async Task<JsonResult> AddNhanVien(wp_users item, int[] NhomNguoiDung)
        {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            using (RealEstateEntities db = new RealEstateEntities()) {
                var checkUser = db.wp_users.Where(it => it.user_login.ToLower().Trim() == item.user_login.ToLower().Trim()).ToList();
                if (checkUser.Count > 0)
                {
                    rs.rs_text = "Tài khoản đã tồn tại không thể thêm";
                    return Json(rs, JsonRequestBehavior.AllowGet);
                }
                try
                {
                    using (var tran = new TransactionScope())
                    {
                        string sodienthoai = item.user_activation_key;
                        item.id_nhom_nguoi_dung = NhomNguoiDung[0];
                        item.user_activation_key = "";
                        item.display_name = item.user_login;
                        item.user_nicename = item.user_login;
                        item.user_registered = DateTime.Now;
                        if (item.user_pass != "" )
                        {
                            item.user_pass = HashPassword.MD5Encode(item.user_pass.Trim(), "$P$BS2BkHbWoa1b4nabuGckv/JqdIZivm0");
                        }
                        item.user_url = "";
                     

                        db.wp_users.Add(item);
                        if (await db.SaveChangesAsync() > 0)
                        {
                            decimal id = db.wp_users.FirstOrDefault(it => it.user_login.Trim().ToLower() == item.user_login.ToLower().Trim()).ID;

                            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                            dl_historys hst = new dl_historys();
                            hst.Key = id.ToString();
                            hst.TableName = "wp_users";
                            hst.Type = "Thêm nhân viên";
                            hst.Ngay = DateTime.Now;
                            hst.NguoiDung = nguoidung.NguoiDung;
                            hst.Content = Logchange.Insert(item, "wp_users");
                            hst.LinkView = Url.Action("Index", "NhanVien");
                            Logchange.SaveLogChange(db,hst);

                            wp_usermeta additem = new wp_usermeta();
                            additem.user_id = id;
                            additem.meta_value = sodienthoai;
                            additem.meta_key = "agent_phone";
                            db.wp_usermeta.Add(additem);

                            List<dl_nguoidung_phanquyen_nhomnguoidung> quyenNgD = new List<dl_nguoidung_phanquyen_nhomnguoidung>();
                            foreach (var ite in NhomNguoiDung)
                            {
                                quyenNgD.Add(new dl_nguoidung_phanquyen_nhomnguoidung { nguoi_dung = id, id_nhom_nguoi_dung = ite });
                            }
                            db.dl_nguoidung_phanquyen_nhomnguoidung.AddRange(quyenNgD);

                            db.SaveChanges();
                            tran.Complete();
                            rs.rs_code = 1;
                        }
                    }
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException ex)
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (var eve in ex.EntityValidationErrors)
                    {
                        sb.AppendLine(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                                        eve.Entry.Entity.GetType().Name,
                                                        eve.Entry.State));
                        foreach (var ve in eve.ValidationErrors)
                        {
                            sb.AppendLine(string.Format("- Property: \"{0}\", Error: \"{1}\"",
                                                        ve.PropertyName,
                                                        ve.ErrorMessage));
                        }
                    }
                    rs.rs_text = sb.ToString();
                }
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [ValidateInput(false)]
        [RoleAuthorize(Roles = "0=0,52=1")]
        public async Task<JsonResult> EditNhanVien(wp_users item, int[] NhomNguoiDung) {
            ResponseStatus rs = new ResponseStatus();
            using (RealEstateEntities db = new RealEstateEntities())
            {
                var checkUser = db.wp_users.Where(it => it.user_login.ToLower().Trim() == item.user_login.ToLower().Trim() && it.ID != item.ID).ToList();
                if (checkUser.Count > 0)
                {
                    rs.rs_text = "Tài khoản đã tồn tại không thể sửa";
                    return Json(rs, JsonRequestBehavior.AllowGet);
                }
                try
                {
                    using (var tran = new TransactionScope())
                    {
                        var edit = db.wp_users.FirstOrDefault(it => it.ID == item.ID);

                        var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                        dl_historys hst = new dl_historys();
                        hst.Key = edit.ID.ToString();
                        hst.TableName = "wp_users";
                        hst.Type = "Sửa nhân viên";
                        hst.Ngay = DateTime.Now;
                        hst.NguoiDung = nguoidung.NguoiDung;
                        hst.Content = Logchange.Edit(item, edit, "wp_users");
                        hst.LinkView = Url.Action("Index", "NhanVien");
                        Logchange.SaveLogChange(db, hst);

                        string sodienthoai = item.user_activation_key;
                        edit.id_nhom_nguoi_dung = NhomNguoiDung[0];
                        //edit.user_activation_key = "";
                        // edit.display_name = item.user_login;
                        //edit.user_nicename = item.user_login;
                        // edit.user_registered = DateTime.Now;
                        //edit.user_url = "";
                        edit.user_email = item.user_email;
                        //edit.user_login = item.user_login;
                        edit.user_status = item.user_status;
                        if (item.user_pass != null && item.user_pass != "" && item.user_pass != edit.user_pass)
                        {
                            edit.user_pass = HashPassword.MD5Encode(item.user_pass.Trim(), "$P$BS2BkHbWoa1b4nabuGckv/JqdIZivm0");
                        }
                        var editPhone = db.wp_usermeta.FirstOrDefault(it => it.user_id == item.ID && it.meta_key == "agent_phone");
                        editPhone.meta_value = sodienthoai;

                        var delPhanQuyen = db.dl_nguoidung_phanquyen_nhomnguoidung.Where(it => it.nguoi_dung == item.ID).ToList();
                        db.dl_nguoidung_phanquyen_nhomnguoidung.RemoveRange(delPhanQuyen);

                        List<dl_nguoidung_phanquyen_nhomnguoidung> quyenNgD = new List<dl_nguoidung_phanquyen_nhomnguoidung>();
                        foreach (var ite in NhomNguoiDung)
                        {
                            quyenNgD.Add(new dl_nguoidung_phanquyen_nhomnguoidung { nguoi_dung = item.ID, id_nhom_nguoi_dung = ite });
                        }
                        db.dl_nguoidung_phanquyen_nhomnguoidung.AddRange(quyenNgD);
                        db.SaveChanges();
                        tran.Complete();
                        rs.rs_code = 1;
                    }
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException ex)
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (var eve in ex.EntityValidationErrors)
                    {
                        sb.AppendLine(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                                        eve.Entry.Entity.GetType().Name,
                                                        eve.Entry.State));
                        foreach (var ve in eve.ValidationErrors)
                        {
                            sb.AppendLine(string.Format("- Property: \"{0}\", Error: \"{1}\"",
                                                        ve.PropertyName,
                                                        ve.ErrorMessage));
                        }
                    }
                    rs.rs_text = sb.ToString();
                }
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,53=1")]
        public async Task<JsonResult> XoaNhanVien(decimal id)
        {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            using (RealEstateEntities db = new RealEstateEntities())
            {
                var del = db.wp_users.FirstOrDefault(it => it.ID == id);
                var deliItem = db.wp_usermeta.Where(it => it.user_id == id).ToList();
                var delPhanQuyen = db.dl_nguoidung_phanquyen_nhomnguoidung.Where(it => it.nguoi_dung == id).ToList();
                try
                {
                    using (var tran = new TransactionScope())
                    {
                        db.wp_users.Remove(del);
                        db.wp_usermeta.RemoveRange(deliItem);
                        db.dl_nguoidung_phanquyen_nhomnguoidung.RemoveRange(delPhanQuyen);

                        var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                        dl_historys hst = new dl_historys();
                        hst.Key = del.ID.ToString();
                        hst.TableName = "wp_users";
                        hst.Type = "Xóa nhân viên";
                        hst.Ngay = DateTime.Now;
                        hst.NguoiDung = nguoidung.NguoiDung;
                        hst.Content = Logchange.Insert(del, "wp_users");
                        hst.LinkView = "#";
                        Logchange.SaveLogChange(db, hst);

                        db.SaveChanges();
                        tran.Complete();
                        rs.rs_code = 1;
                    }
                }
                catch (Exception ex)
                {
                    rs.rs_text = ex.Message.ToString();
                }
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> ThongTinNhanVien() {
            wp_users model = new wp_users();
            using (RealEstateEntities db = new RealEstateEntities())
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                model = db.wp_users.FirstOrDefault(it => it.ID == nguoidung.NguoiDung);
                model.user_activation_key = db.wp_usermeta.FirstOrDefault(it => it.meta_key == "agent_phone" && it.user_id == nguoidung.NguoiDung).meta_value;
                var NguoiDungPQ = db.dl_nguoidung_phanquyen_nhomnguoidung.Where(it => it.nguoi_dung == nguoidung.NguoiDung).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);

            }
          
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<JsonResult> EditNhanVienCaNhan(wp_users item)
        {
            ResponseStatus rs = new ResponseStatus();
            using (RealEstateEntities db = new RealEstateEntities())
            {
                var checkUser = db.wp_users.Where(it => it.user_login.ToLower().Trim() == item.user_login.ToLower().Trim() && it.ID != item.ID).ToList();
                if (checkUser.Count > 0)
                {
                    rs.rs_text = "Tài khoản đã tồn tại không thể sửa";
                    return Json(rs, JsonRequestBehavior.AllowGet);
                }
                try
                {
                    using (var tran = new TransactionScope())
                    {
                        var edit = db.wp_users.FirstOrDefault(it => it.ID == item.ID);

                        var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                        dl_historys hst = new dl_historys();
                        hst.Key = edit.ID.ToString();
                        hst.TableName = "wp_users";
                        hst.Type = "Sửa thông tin cá nhân";
                        hst.Ngay = DateTime.Now;
                        hst.NguoiDung = nguoidung.NguoiDung;
                        hst.Content = Logchange.Edit(item, edit, "wp_users");
                        hst.LinkView = Url.Action("Index", "NhanVien");
                        Logchange.SaveLogChange(db, hst);

                        string sodienthoai = item.user_activation_key;
                        //edit.user_activation_key = "";
                        // edit.display_name = item.user_login;
                        //edit.user_nicename = item.user_login;
                        // edit.user_registered = DateTime.Now;
                        //edit.user_url = "";
                        edit.user_email = item.user_email;
                        //edit.user_login = item.user_login;
                        //edit.user_status = item.user_status;
                        if (item.user_pass != null && item.user_pass != "" && item.user_pass != edit.user_pass)
                        {
                            edit.user_pass = HashPassword.MD5Encode(item.user_pass.Trim(), "$P$BS2BkHbWoa1b4nabuGckv/JqdIZivm0");
                        }
                        var editPhone = db.wp_usermeta.FirstOrDefault(it => it.user_id == item.ID && it.meta_key == "agent_phone");
                        editPhone.meta_value = sodienthoai;
                        db.SaveChanges();
                        tran.Complete();
                        rs.rs_code = 1;
                    }
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException ex)
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (var eve in ex.EntityValidationErrors)
                    {
                        sb.AppendLine(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                                        eve.Entry.Entity.GetType().Name,
                                                        eve.Entry.State));
                        foreach (var ve in eve.ValidationErrors)
                        {
                            sb.AppendLine(string.Format("- Property: \"{0}\", Error: \"{1}\"",
                                                        ve.PropertyName,
                                                        ve.ErrorMessage));
                        }
                    }
                    rs.rs_text = sb.ToString();
                }
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}