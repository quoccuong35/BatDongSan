using Newtonsoft.Json;
using RealEstate.Entity;
using RealEstate.Libs;
using RealEstate.Libs.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Libs;
using System.Web.Mvc;

namespace RealEstate.Controllers
{
    [RoleAuthorize]
    public class GuiYeuCauController : Controller
    {
        RealEstateEntities db = new RealEstateEntities();

        #region Danh sách yêu cầu

        [RoleAuthorize(Roles = "0=0,15=1")]
        public ActionResult Index()
        {
            return View();
        }
        public async Task<JsonResult> getDataYeuCau()
        {
            string sSQL = "";
            if (User.IsInRole("0=0") || User.IsInRole("70=1"))
            {
                sSQL = "select dl_yeucau.id, ten_khach_hang, so_dien_thoai, user_login sale, ten_loai_nhu_cau   ten_loai_nhu_cau, concat(trim(dt_quan_tam_tu)+0, ' - ', trim(dt_quan_tam_den)+0)    dien_tich, concat(gia_tu, ' - ', gia_den) gia, so_phong_ngu, ten_huong huong, views, concat(tang_thap_nhat, ' - ', tang_cao_nhat)tang, date_format(ngay_tao, '%Y-%m-%d %H:%i:%s') ngay_tao, date_format(du_kien_xem_nha, '%Y-%m-%d %H:%i:%s') du_kien_xem_nha, trang_thai from dl_yeucau inner join wp_users on dl_yeucau.nguoi_phu_trach = wp_users.ID  inner join(select yeucau, GROUP_CONCAT(ten_loai_nhu_cau SEPARATOR '; ') ten_loai_nhu_cau from dl_dm_loai_nhu_cau inner join dl_yeucau_nhucau on gia_tri=loai_nhu_cau where tu_khoa = 'dl_dm_loai_nhu_cau'  group by  yeucau) nhu_cau on nhu_cau.yeucau=dl_yeucau.id left join (select yeucau, GROUP_CONCAT(ten_huong SEPARATOR '; ')  ten_huong from v_dm_huong inner join dl_yeucau_nhucau on huong = gia_tri where tu_khoa = 'v_dm_huong_cua'  group by  yeucau) huong_phong on dl_yeucau.id = huong_phong.yeucau where da_xoa=false order by dl_yeucau.id desc";
            }
            else
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                sSQL = "select dl_yeucau.id, ten_khach_hang, so_dien_thoai, user_login sale, ten_loai_nhu_cau   ten_loai_nhu_cau, concat(trim(dt_quan_tam_tu)+0, ' - ', trim(dt_quan_tam_den)+0)    dien_tich, concat(gia_tu, ' - ', gia_den) gia, so_phong_ngu, ten_huong huong, views, concat(tang_thap_nhat, ' - ', tang_cao_nhat)tang, date_format(ngay_tao, '%Y-%m-%d %H:%i:%s') ngay_tao, date_format(du_kien_xem_nha, '%Y-%m-%d %H:%i:%s') du_kien_xem_nha, trang_thai from (SELECT * FROM dl_yeucau WHERE dl_yeucau.nguoi_phu_trach= " + nguoidung.NguoiDung + ")dl_yeucau inner join wp_users on dl_yeucau.nguoi_phu_trach = wp_users.ID  inner join(select yeucau, GROUP_CONCAT(ten_loai_nhu_cau SEPARATOR '; ') ten_loai_nhu_cau from dl_dm_loai_nhu_cau inner join dl_yeucau_nhucau on gia_tri=loai_nhu_cau where tu_khoa = 'dl_dm_loai_nhu_cau'  group by  yeucau) nhu_cau on nhu_cau.yeucau=dl_yeucau.id left join (select yeucau, GROUP_CONCAT(ten_huong SEPARATOR '; ')  ten_huong from v_dm_huong inner join dl_yeucau_nhucau on huong = gia_tri where tu_khoa = 'v_dm_huong_cua'  group by  yeucau) huong_phong on dl_yeucau.id = huong_phong.yeucau where da_xoa=false order by dl_yeucau.id desc";
            }
            var data = await db.Database.SqlQuery<v_yeucau>(sSQL).ToListAsync();
            list_yeucau list = new list_yeucau();
            list.soyeucau = data.Count;
            list.yeucau = data;
            list.dadixemcanho = data.Count(m => m.trang_thai == 4);
            list.yeucauchidinh = data.Count(m => m.trang_thai == 3);
            list.chuachidinh= data.Count(m => m.trang_thai == 2);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Thêm mới yêu cầu
        [RoleAuthorize(Roles = "0=0,16=1")]
        public ActionResult TaoMoi()
        {
            return View();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public JsonResult ThemMoiYeuCau(dl_yeucau yeucau, string loai_nhu_cau, string du_an, string huong_ban_cong, string huong_cua)
        {
            ResponseStatus rs = new ResponseStatus();
            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                yeucau.nguoi_tao = (int)nguoidung.NguoiDung;
                yeucau.ngay_tao = DateTime.Now;
                yeucau.trang_thai = 2;
                yeucau.da_xoa = false;
                db.dl_yeucau.Add(yeucau);

                db.SaveChanges();

                if (!string.IsNullOrEmpty(loai_nhu_cau))
                {
                    var arr = loai_nhu_cau.Split(',');
                    foreach (var item in arr)
                    {
                        var chitiet = new dl_yeucau_nhucau();
                        chitiet.yeucau = (long)yeucau.id;
                        chitiet.gia_tri = int.Parse(item);
                        chitiet.tu_khoa = "dl_dm_loai_nhu_cau";
                        db.dl_yeucau_nhucau.Add(chitiet);
                    }
                    db.SaveChanges();
                }
                if (!string.IsNullOrEmpty(du_an))
                {
                    var arr = du_an.Split(',');
                    foreach (var item in arr)
                    {
                        var chitiet = new dl_yeucau_nhucau();
                        chitiet.yeucau = (long)yeucau.id;
                        chitiet.gia_tri = int.Parse(item);
                        chitiet.tu_khoa = "dl_duan";
                        db.dl_yeucau_nhucau.Add(chitiet);
                    }
                    db.SaveChanges();
                }
                if (!string.IsNullOrEmpty(huong_ban_cong))
                {
                    var arr = huong_ban_cong.Split(',');
                    foreach (var item in arr)
                    {
                        var chitiet = new dl_yeucau_nhucau();
                        chitiet.yeucau = (long)yeucau.id;
                        chitiet.gia_tri = int.Parse(item);
                        chitiet.tu_khoa = "v_dm_huong_ban_cong";
                        db.dl_yeucau_nhucau.Add(chitiet);
                    }
                    db.SaveChanges();
                }
                if (!string.IsNullOrEmpty(huong_cua))
                {
                    var arr = huong_cua.Split(',');
                    foreach (var item in arr)
                    {
                        var chitiet = new dl_yeucau_nhucau();
                        chitiet.yeucau = (long)yeucau.id;
                        chitiet.gia_tri = int.Parse(item);
                        chitiet.tu_khoa = "v_dm_huong_cua";
                        db.dl_yeucau_nhucau.Add(chitiet);
                    }
                    db.SaveChanges();
                }


                var log = new dl_yeucau_trangthai();
                log.IdYeuCau = (long)yeucau.id;
                log.NguoiDungTao = nguoidung.NguoiDung;
                log.GhiChu = nguoidung.TenHienThi + " gửi yêu cầu mới";
                log.NgayTao = DateTime.Now;
                log.Trang_Thai = 2;
                db.dl_yeucau_trangthai.Add(log);
                // lưu thông báo
                //var listThongBao = db.dl_thongbao_phanquyen.Where(it => it.thongbao == 1 && it.loaithongbao == 1).ToList();

                var user = (from a in db.dl_phan_quyen
                            join b in db.dl_nguoidung_phanquyen_nhomnguoidung on a.IdDoiTuong equals b.id_nhom_nguoi_dung
                            join c in db.wp_users on b.nguoi_dung equals c.ID
                            where (a.IdQuyen == 63 || c.ID == yeucau.nguoi_phu_trach)
                            select new { c.ID, c.display_name, c.user_email }).Distinct().ToList();
                if (user.Count > 0)
                {
                    var loainhucau = db.Database.SqlQuery<string>("SELECT GROUP_CONCAT(dl_dm_loai_nhu_cau.ten_loai_nhu_cau SEPARATOR '; ') AS tenloai FROM(SELECT gia_tri FROM dl_yeucau_nhucau WHERE dl_yeucau_nhucau.tu_khoa = 'dl_dm_loai_nhu_cau' AND dl_yeucau_nhucau.yeucau = " + yeucau.id + ")dl_yeucau_nhucau INNER JOIN dl_dm_loai_nhu_cau ON dl_yeucau_nhucau.gia_tri = dl_dm_loai_nhu_cau.loai_nhu_cau").ToListAsync();
                    string nguoiPhuTrach = db.wp_users.FirstOrDefault(it => it.ID == yeucau.nguoi_phu_trach).display_name.ToString();
                    string NoiDungThongBao = "<b>#" + yeucau.id + " " + yeucau.ten_khach_hang + " có nhu cầu " + loainhucau.Result[0].ToString() + "_" + nguoiPhuTrach +"</b>";
                    List<dl_thongbao_nguoidung> lstThongBao = new List<dl_thongbao_nguoidung>();
                    string sid = HashPassword.Encrypt(yeucau.id.ToString());
                    foreach (var item in user)
                    {
                        lstThongBao.Add(new dl_thongbao_nguoidung {thongbao=1,nguoidung = item.ID,Noidung = NoiDungThongBao,Link = Url.Action("ChiTietThongBao", "GuiYeuCau")+"?id="+ sid, Ngay = log.NgayTao,NguoiTao = nguoidung.NguoiDung });
                    }
                    db.dl_thongbao_nguoidung.AddRange(lstThongBao);
                }
              
                // lưu historry
                dl_historys hst = new dl_historys();
                hst.TableName = "dl_yeucau";
                hst.Key = yeucau.id.ToString();
                hst.LinkView = Url.Action("ChinhSua", "GuiYeuCau") + "?id=" + hst.Key;
                hst.Type = "Thêm yêu cầu";
                hst.Content = Logchange.Insert(yeucau, "dl_yeucau");
                hst.Ngay = DateTime.Now;
                hst.NguoiDung = nguoidung.NguoiDung;
                Logchange.SaveLogChange(db,hst);
               // db.dl_historys.Add(hst);
                db.SaveChanges();
                rs.rs_code = (int)yeucau.id;
                rs.rs_text = "Thêm mới yêu cầu thành công!";
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
                rs.rs_code = 0;
                rs.rs_text = sb.ToString();
            }
            //catch (Exception ex)
            //{
            //    rs.rs_code = 0;
            //    rs.rs_text = "Có lỗi xảy ra, thêm mới không thành công</ br>Mô tả lỗi: " + ex.InnerException.Message;
            //}
            return Json(rs);
        }
        #endregion

        #region Chỉnh sửa yêu cầu
        [RoleAuthorize(Roles = "0=0,18=1")]
        public ActionResult ChinhSua(int? id)
        {
            if (id == null)
                return RedirectToAction("TaoMoi", "GuiYeuCau");
            var yc = db.dl_yeucau.FirstOrDefault(m => m.id == id);
            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            if (!User.IsInRole("70=1"))
            {
                if (nguoidung.NguoiDung != yc.nguoi_phu_trach)
                {
                    return Content("Bạn không có quền thao tác trên yêu cầu " + id.ToString());
                }
            }
            return View(yc);
        }
        public JsonResult GetYeuCauChiTiet(int id)
        {
            return Json(db.dl_yeucau_nhucau.Where(m => m.yeucau == id).ToList(), JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult CapNhatYeuCau(dl_yeucau yc, string loai_nhu_cau, string du_an, string huong_ban_cong, string huong_cua)
        {
            ResponseStatus rs = new ResponseStatus();
            try
            {
                var yeucau = db.dl_yeucau.FirstOrDefault(m => m.id == yc.id);
                dl_historys hst = new dl_historys();
                hst.Content = Logchange.Edit(yc, yeucau, "dl_yeucau");
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                yeucau.so_dien_thoai = yc.so_dien_thoai;
                yeucau.ten_khach_hang = yc.ten_khach_hang;
                yeucau.dia_chi = yc.dia_chi;
                yeucau.zalo = yc.zalo;
                yeucau.messenger = yc.messenger;
                yeucau.nguon_khach = yc.nguon_khach;
                yeucau.so_phong_ngu = yc.so_phong_ngu;
                yeucau.email_khach_hang = yc.email_khach_hang;
                yeucau.nghe_nghiep = yc.nghe_nghiep;
                yeucau.tang_thap_nhat = yc.tang_thap_nhat;
                yeucau.tang_cao_nhat = yc.tang_cao_nhat;
                yeucau.gia_tu = yc.gia_tu;
                yeucau.gia_den = yc.gia_den;
                yeucau.ghi_chu = yc.ghi_chu;
                yeucau.nguoi_phu_trach = yc.nguoi_phu_trach;
                yeucau.views = yc.views;
                yeucau.tien_ich_bo_sung = yc.tien_ich_bo_sung;
                yeucau.du_kien_xem_nha = yc.du_kien_xem_nha;
                yeucau.dt_quan_tam_tu = yc.dt_quan_tam_tu;
                yeucau.dt_quan_tam_den = yc.dt_quan_tam_den;
                yeucau.nguoi_sua = (int)nguoidung.NguoiDung;
                yeucau.ngay_sua = DateTime.Now;
                db.SaveChanges();
                db.Database.ExecuteSqlCommand("delete  from dl_yeucau_nhucau where yeucau=" + yc.id);
                if (!string.IsNullOrEmpty(loai_nhu_cau))
                {
                    var arr = loai_nhu_cau.Split(',');
                    foreach (var item in arr)
                    {
                        var chitiet = new dl_yeucau_nhucau();
                        chitiet.yeucau = (long)yeucau.id;
                        chitiet.gia_tri = int.Parse(item);
                        chitiet.tu_khoa = "dl_dm_loai_nhu_cau";
                        db.dl_yeucau_nhucau.Add(chitiet);
                    }
                    db.SaveChanges();
                }
                if (!string.IsNullOrEmpty(du_an))
                {
                    var arr = du_an.Split(',');
                    foreach (var item in arr)
                    {
                        var chitiet = new dl_yeucau_nhucau();
                        chitiet.yeucau = (long)yeucau.id;
                        chitiet.gia_tri = int.Parse(item);
                        chitiet.tu_khoa = "dl_duan";
                        db.dl_yeucau_nhucau.Add(chitiet);
                    }
                    db.SaveChanges();
                }
                if (!string.IsNullOrEmpty(huong_ban_cong))
                {
                    var arr = huong_ban_cong.Split(',');
                    foreach (var item in arr)
                    {
                        var chitiet = new dl_yeucau_nhucau();
                        chitiet.yeucau = (long)yeucau.id;
                        chitiet.gia_tri = int.Parse(item);
                        chitiet.tu_khoa = "v_dm_huong_ban_cong";
                        db.dl_yeucau_nhucau.Add(chitiet);
                    }
                    db.SaveChanges();
                }
                if (!string.IsNullOrEmpty(huong_cua))
                {
                    var arr = huong_cua.Split(',');
                    foreach (var item in arr)
                    {
                        var chitiet = new dl_yeucau_nhucau();
                        chitiet.yeucau = (long)yeucau.id;
                        chitiet.gia_tri = int.Parse(item);
                        chitiet.tu_khoa = "v_dm_huong_cua";
                        db.dl_yeucau_nhucau.Add(chitiet);
                    }
                    db.SaveChanges();
                }
              
                hst.TableName = "dl_yeucau";
                hst.Key = yeucau.id.ToString();
                hst.LinkView = Url.Action("ChinhSua", "GuiYeuCau") + "?id=" + hst.Key;
                hst.Type = "Chỉnh sửa yêu cầu";
                hst.Ngay = DateTime.Now;
                hst.NguoiDung = nguoidung.NguoiDung;
                db.dl_historys.Add(hst);
                db.SaveChanges();
                rs.rs_code = (int)yeucau.id;
                rs.rs_text = "Chỉnh sửa yêu cầu thành công!";
            }
            catch (Exception ex)
            {
                rs.rs_code = 0;
                rs.rs_text = "Có lỗi xảy ra, chỉnh sửa không thành công</ br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(rs);
        }
        #endregion

        #region Chi tiết yêu cầu
        [RoleAuthorize(Roles = "0=0,17=1")]
        public async Task<ActionResult> ChiTiet(int ?id)
        {
            if (id == null)
                return RedirectToAction("Index", "GuiYeuCau");
            string sSQL = " select dl_yeucau.id,  so_dien_thoai, ten_khach_hang, dia_chi, zalo, messenger, nguon_khach, ngay_tao, nguoi_tao, ngay_sua, nguoi_sua, so_phong_ngu, email_khach_hang, nghe_nghiep, tang_thap_nhat, tang_cao_nhat, gia_tu, gia_den, ghi_chu, user_login as    nguoi_phu_trach, views, tien_ich_bo_sung,  du_kien_xem_nha, dt_quan_tam_tu, dt_quan_tam_den,    ten_loai_nhu_cau ten_loai_nhu_cau,  huong_ban_cong, huong_cua, dl_yeucau.trang_thai, ten_trang_thai, du_an from dl_yeucau inner join dl_dm_trangthai_yeucau ddty on dl_yeucau.trang_thai = ddty.trang_thai inner join wp_users on dl_yeucau.nguoi_phu_trach = wp_users.ID inner join(select yeucau, GROUP_CONCAT(ten_loai_nhu_cau SEPARATOR '; ') ten_loai_nhu_cau from dl_dm_loai_nhu_cau inner join dl_yeucau_nhucau on gia_tri = loai_nhu_cau where yeucau=99999 and  tu_khoa = 'dl_dm_loai_nhu_cau' group by yeucau) nhu_cau on nhu_cau.yeucau = dl_yeucau.id inner join(select yeucau, GROUP_CONCAT(ten_duan SEPARATOR '; ') du_an from dl_duan inner join dl_yeucau_nhucau on gia_tri = duan where yeucau=99999 and  tu_khoa = 'dl_duan' group by yeucau) dl_duan on dl_duan.yeucau = dl_yeucau.id left join (select yeucau, GROUP_CONCAT(ten_huong SEPARATOR '; ') huong_ban_cong from v_dm_huong inner join dl_yeucau_nhucau on huong = gia_tri where yeucau=99999 and  tu_khoa = 'v_dm_huong_ban_cong' group by yeucau) huong_bc on dl_yeucau.id = huong_bc.yeucau left join (select yeucau, GROUP_CONCAT(ten_huong SEPARATOR '; ') huong_cua from v_dm_huong inner join dl_yeucau_nhucau on huong = gia_tri where yeucau=99999 and  tu_khoa = 'v_dm_huong_cua' group by yeucau) huongcua on dl_yeucau.id = huongcua.yeucau  where dl_yeucau.id=99999 and da_xoa = false  ";
            var data = await db.Database.SqlQuery<v_yeucau_chi_tiet>(sSQL.Replace("99999",id.ToString())).FirstOrDefaultAsync();
            if (data == null)
                return RedirectToAction("Index", "GuiYeuCau");

            if (!User.IsInRole("70=1"))
            {
                //var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                if (User.Identity.Name.ToLower() != data.nguoi_phu_trach.ToLower())
                {
                    return Content("Bạn không có quền thao tác trên yêu cầu " + id.ToString());
                }
            }
            return View(data);
        }
        public async Task<ActionResult> ChiTietThongBao(string id,string key)
        {
            //if (yeucau == null)
            //    return RedirectToAction("Index", "GuiYeuCau");
            string yeucau = HashPassword.Decrypt(id.Replace(" ", "+")).ToString();
          
            string sSQL = " select dl_yeucau.id,  so_dien_thoai, ten_khach_hang, dia_chi, zalo, messenger, nguon_khach, ngay_tao, nguoi_tao, ngay_sua, nguoi_sua, so_phong_ngu, email_khach_hang, nghe_nghiep, tang_thap_nhat, tang_cao_nhat, gia_tu, gia_den, ghi_chu, user_login as    nguoi_phu_trach, views, tien_ich_bo_sung,  du_kien_xem_nha, dt_quan_tam_tu, dt_quan_tam_den,    ten_loai_nhu_cau ten_loai_nhu_cau,  huong_ban_cong, huong_cua, dl_yeucau.trang_thai, ten_trang_thai, du_an from dl_yeucau inner join dl_dm_trangthai_yeucau ddty on dl_yeucau.trang_thai = ddty.trang_thai inner "+
                    " join wp_users on dl_yeucau.nguoi_phu_trach = wp_users.ID inner join(select yeucau, GROUP_CONCAT(ten_loai_nhu_cau SEPARATOR '; ') ten_loai_nhu_cau from dl_dm_loai_nhu_cau inner join dl_yeucau_nhucau on gia_tri = loai_nhu_cau where yeucau=99999 and  tu_khoa = 'dl_dm_loai_nhu_cau' group by yeucau) nhu_cau on nhu_cau.yeucau = dl_yeucau.id inner join(select yeucau, GROUP_CONCAT(ten_duan SEPARATOR '; ') du_an from dl_duan inner join dl_yeucau_nhucau on gia_tri = duan where yeucau=99999 and  tu_khoa = 'dl_duan' group by yeucau) dl_duan on dl_duan.yeucau = dl_yeucau.id "+
                    " left join (select yeucau, GROUP_CONCAT(ten_huong SEPARATOR '; ') huong_ban_cong from v_dm_huong inner join dl_yeucau_nhucau on huong = gia_tri where yeucau=99999 and  tu_khoa = 'v_dm_huong_ban_cong' group by yeucau) huong_bc on dl_yeucau.id = huong_bc.yeucau left join (select yeucau, GROUP_CONCAT(ten_huong SEPARATOR '; ') huong_cua from v_dm_huong inner join dl_yeucau_nhucau on huong = gia_tri where yeucau=99999 and  tu_khoa = 'v_dm_huong_cua' group by yeucau) huongcua on dl_yeucau.id = huongcua.yeucau  where dl_yeucau.id=99999 and da_xoa = false  ";
            var data = await db.Database.SqlQuery<v_yeucau_chi_tiet>(sSQL.Replace("99999", yeucau)).FirstOrDefaultAsync();
            if (data == null)
                return Content("Không tìm thấy yêu cầu hiện tại trong hệ thống");
            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            if (key != null && key.Trim() != "")
            {
                string skey = HashPassword.Decrypt(key.Replace(" ", "+")).ToString();
                db.Database.ExecuteSqlCommand("Update dl_thongbao_nguoidung set DaXem = 1 Where id = {0} ", skey);
            }
          
            return View(data);
        }

        [RoleAuthorize(Roles = "0=0,21=1")]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<JsonResult> CapNhatTrangThai(int id, int trangthai, string ghichu)
        {
            ResponseStatus rs = new ResponseStatus();
            try
            {
                var yeucau = await db.dl_yeucau.FirstOrDefaultAsync(m => m.id == id);
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                yeucau.trang_thai = trangthai;
                yeucau.nguoi_sua = (int)nguoidung.NguoiDung;
                yeucau.ngay_sua = DateTime.Now;
                var log = new dl_yeucau_trangthai();
                log.IdYeuCau = id;
                log.NguoiDungTao = nguoidung.NguoiDung;
                log.GhiChu = ghichu;
                log.NgayTao = DateTime.Now;
                log.Trang_Thai = trangthai;
                db.dl_yeucau_trangthai.Add(log);

                dl_historys hst = new dl_historys();
                hst.Key = id.ToString();
                hst.Type = "Cập nhật trạng thái yêu cầu";
                hst.TableName = "dl_yeucau_trangthai";
                hst.LinkView = Url.Action("ChiTiet", "GuiYeuCau") + "?id=" + hst.Key;
                hst.Content = Logchange.Insert(log, "dl_yeucau_trangthai");
                hst.NguoiDung = nguoidung.NguoiDung;
                hst.Ngay = DateTime.Now;
                db.dl_historys.Add(hst);
                await db.SaveChangesAsync();
                rs.rs_code = 1;
                rs.rs_text = "Thay đổi trạng thái yêu cầu thành công!";
            }
            catch (Exception ex)
            {
                rs.rs_code = 0;
                rs.rs_text = "Có lỗi xảy ra, chỉnh sửa không thành công</ br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(rs);
        }

        #endregion

        #region Xóa yêu cầu
        [HttpPost]
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,20=1")]
        public async Task<JsonResult> XoaYeuCau(int id)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var yeucau = db.dl_yeucau.FirstOrDefault(m => m.id == id);
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                if (!User.IsInRole("70=1"))
                {
                    if (nguoidung.NguoiDung != yeucau.nguoi_phu_trach)
                    {
                        r.rs_code = 0;
                        r.rs_text = "Bạn không được quền xóa yêu cầu " + id.ToString();
                        return Json(r);
                    }
                }
               
                yeucau.nguoi_xoa = (int)nguoidung.NguoiDung;
                yeucau.ngay_xoa = DateTime.Now;
                yeucau.trang_thai = 1;
                yeucau.da_xoa = true;
                var log = new dl_yeucau_trangthai();
                log.IdYeuCau = id;
                log.NguoiDungTao = nguoidung.NguoiDung;
                log.GhiChu = nguoidung.TenHienThi+ " xóa yêu cầu.";
                log.NgayTao = DateTime.Now;
                log.Trang_Thai = 1;
                db.dl_yeucau_trangthai.Add(log);
                

                dl_historys hst = new dl_historys();
                hst.TableName = "dl_yeucau";
                hst.Type = "Xóa yêu cầu";
                hst.Ngay = DateTime.Now;
                hst.NguoiDung = nguoidung.NguoiDung;
                hst.LinkView = "#";
                hst.Key = id.ToString();
                hst.Content = Logchange.Insert(yeucau, "dl_yeucau");
                Logchange.SaveLogChange(db, hst);
                await db.SaveChangesAsync();
                r.rs_code = 1;
                r.rs_text = "Xóa yêu cầu thành công!";
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = "Có lỗi xảy ra, chỉnh sửa không thành công</br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(r);
        }
        #endregion

        #region Chỉ định căn hộ
        [RoleAuthorize(Roles = "0=0,19=1")]
        public async Task<ActionResult> ChiDinhCanHo(int ?id)
        {
            if (id == null)
                return RedirectToAction("Index", "GuiYeuCau");
            string sSQL = " select dl_yeucau.id,  so_dien_thoai, ten_khach_hang, dia_chi, zalo, messenger, nguon_khach, ngay_tao, nguoi_tao, ngay_sua, nguoi_sua, so_phong_ngu, email_khach_hang, nghe_nghiep, tang_thap_nhat, tang_cao_nhat, gia_tu, gia_den, ghi_chu, user_login as    nguoi_phu_trach, views, tien_ich_bo_sung,  du_kien_xem_nha, dt_quan_tam_tu, dt_quan_tam_den,    ten_loai_nhu_cau ten_loai_nhu_cau,  huong_ban_cong, huong_cua, dl_yeucau.trang_thai, ten_trang_thai, du_an from dl_yeucau inner join dl_dm_trangthai_yeucau ddty on dl_yeucau.trang_thai = ddty.trang_thai inner join wp_users on dl_yeucau.nguoi_phu_trach = wp_users.ID inner join(select yeucau, GROUP_CONCAT(ten_loai_nhu_cau SEPARATOR '; ') ten_loai_nhu_cau from dl_dm_loai_nhu_cau inner join dl_yeucau_nhucau on gia_tri = loai_nhu_cau where yeucau=99999 and  tu_khoa = 'dl_dm_loai_nhu_cau' group by yeucau) nhu_cau on nhu_cau.yeucau = dl_yeucau.id inner join(select yeucau, GROUP_CONCAT(ten_duan SEPARATOR '; ') du_an from dl_duan inner join dl_yeucau_nhucau on gia_tri = duan where yeucau=99999 and  tu_khoa = 'dl_duan' group by yeucau) dl_duan on dl_duan.yeucau = dl_yeucau.id left join (select yeucau, GROUP_CONCAT(ten_huong SEPARATOR '; ') huong_ban_cong from v_dm_huong inner join dl_yeucau_nhucau on huong = gia_tri where yeucau=99999 and  tu_khoa = 'v_dm_huong_ban_cong' group by yeucau) huong_bc on dl_yeucau.id = huong_bc.yeucau left join (select yeucau, GROUP_CONCAT(ten_huong SEPARATOR '; ') huong_cua from v_dm_huong inner join dl_yeucau_nhucau on huong = gia_tri where yeucau=99999 and  tu_khoa = 'v_dm_huong_cua' group by yeucau) huongcua on dl_yeucau.id = huongcua.yeucau  where dl_yeucau.id=99999 and da_xoa = false  ";
            var data = await db.Database.SqlQuery<v_yeucau_chi_tiet>(sSQL.Replace("99999", id.ToString())).FirstOrDefaultAsync();
            if (data == null)
                return RedirectToAction("Index", "GuiYeuCau");
            ViewBag.Web = db.dl_configs.FirstOrDefault(it => it.con_key == "Danhland").con_value;
            return View(data);
        }
        public JsonResult GetCanHo(int id)
        {
            //db.Database.CommandTimeout = 3600;
            var yc = db.dl_yeucau.FirstOrDefault(m => m.id == id);
            if (User.IsInRole("0=0") || User.IsInRole("1=1"))
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                var model = db.Database.SqlQuery<v_canho>("CALL proc_canho_salesmans({0});", nguoidung.NguoiDung).ToList();
                //clsFunction cls = new clsFunction();
                //var json = Json(JsonConvert.SerializeObject(cls.GetData("call proc_yeucau_canho_admin( " + id + ");", "RealEstateEntities"), Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore }), JsonRequestBehavior.AllowGet);
                var json = Json(model, JsonRequestBehavior.AllowGet);
                json.MaxJsonLength = int.MaxValue; 
                return json;
            }
            else
            {

                //clsFunction cls = new clsFunction();
                //var json = Json(JsonConvert.SerializeObject(cls.GetData("call proc_yeucau_canho( " + id + ", " + yc.nguoi_phu_trach + " );", "RealEstateEntities"), Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore }), JsonRequestBehavior.AllowGet);
                var model = db.Database.SqlQuery<v_canho>("call proc_yeucau_canho(" + id + ", " + yc.nguoi_phu_trach + ")").ToList();
                var json = Json(model, JsonRequestBehavior.AllowGet);
                json.MaxJsonLength = int.MaxValue;
                return json;

            }
        }
        public JsonResult GetCanHoChiDinh(int id)
        {
           
            clsFunction cls = new clsFunction();
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            DataTable dt = cls.GetData("call proc_yeucau_canhochidinh( " + id + "," + nguoidung.NhomNguoiDung + " );", "RealEstateEntities");
            if (dt != null && dt.Rows.Count > 0)
            {
                for(int i = 0; i < dt.Rows.Count; i++)
                {
                   
                    dt.Rows[i]["img_key"] = HashPassword.Encrypt(dt.Rows[i]["can_ho"].ToString());
                    DateTime ngay = (DateTime)dt.Rows[i]["ngay_tao"];
                    if((DateTime.Now.Date - ngay.Date).Days > 7)
                    {
                        dt.Rows[i]["duoc_xem_anh"] = false;
                    }
                    else
                    {
                        dt.Rows[i]["duoc_xem_anh"] = true;
                    }
                    dt.Rows[i]["img_link"] = Url.Action("Index", "ShowImages", new { IdCanHo = HashPassword.Encrypt(dt.Rows[i]["can_ho"].ToString()), Time = HashPassword.Encrypt(DateTime.Now.ToString("MM/dd/yyyy HH:mm")) }); 
                }
            }
            var json = Json(JsonConvert.SerializeObject(dt, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore }), JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> TaoChiDinh(int id,int canho)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var check = db.dl_yeucau.Where(m => m.id == id && m.trang_thai < 4).FirstOrDefault();
                if (check == null)
                {
                    r.rs_code = 0;
                    r.rs_text = "Yêu cầu đã khóa dữ liệu!";
                }
                else
                {
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    var yeucau = db.dl_yeucau_canho.FirstOrDefault(m => m.yeu_cau == id && m.can_ho == canho);
                    if (yeucau != null)
                    {

                        yeucau.nguoi_sua = (int)nguoidung.NguoiDung;
                        yeucau.ngay_sua = DateTime.Now;
                        yeucau.da_xoa = false; yeucau.trang_thai_xem = 1;
                    }
                    else
                    {

                        var yeucau_canho = new dl_yeucau_canho();
                        yeucau_canho.yeu_cau = id;
                        yeucau_canho.can_ho = canho;
                        yeucau_canho.nguoi_tao = (int)nguoidung.NguoiDung;
                        yeucau_canho.trang_thai_xem = 1;
                        yeucau_canho.ngay_tao = DateTime.Now;
                        yeucau_canho.da_xoa = false;
                        db.dl_yeucau_canho.Add(yeucau_canho);
                    }
                    int[] iQuyen = { 64, 65 };

                    /// lưu thông báo;
                    var user = (from a in db.dl_phan_quyen
                                join b in db.dl_nguoidung_phanquyen_nhomnguoidung on a.IdDoiTuong equals b.id_nhom_nguoi_dung
                                join c in db.wp_users on b.nguoi_dung equals c.ID
                                where iQuyen.Contains(a.IdQuyen)
                                select new { c.ID, c.display_name, c.user_email,a.IdQuyen }).ToList();

                    var listThongBao = user.Where(it => it.IdQuyen == 64).ToList();
                    var loainhucau = db.Database.SqlQuery<string>("SELECT GROUP_CONCAT(dl_dm_loai_nhu_cau.ten_loai_nhu_cau SEPARATOR '; ') AS tenloai FROM(SELECT gia_tri FROM dl_yeucau_nhucau WHERE dl_yeucau_nhucau.tu_khoa = 'dl_dm_loai_nhu_cau' AND dl_yeucau_nhucau.yeucau = " + id + ")dl_yeucau_nhucau INNER JOIN dl_dm_loai_nhu_cau ON dl_yeucau_nhucau.gia_tri = dl_dm_loai_nhu_cau.loai_nhu_cau").ToListAsync();
                    string nguoiPhuTrach = db.wp_users.FirstOrDefault(it => it.ID == check.nguoi_phu_trach).display_name.ToString();
                    string title = "#" + check.id + " " + check.ten_khach_hang + " có nhu cầu " + loainhucau.Result[0].ToString() + "_" + nguoiPhuTrach;
                    string NoiDungThongBao = "<b>#" + check.id + " " + check.ten_khach_hang + " có nhu cầu " + loainhucau.Result[0].ToString() + "_" + nguoiPhuTrach + "</b><br/>" + " " + nguoidung.TenHienThi + " đã cập nhật chỉ định căn hộ #" + canho.ToString();
                    string sid = HashPassword.Encrypt(id.ToString());
                    if (listThongBao.Count > 0)
                    {
                        List<dl_thongbao_nguoidung> lstThongBao = new List<dl_thongbao_nguoidung>();
                        foreach (var item in listThongBao)
                        {
                            lstThongBao.Add(new dl_thongbao_nguoidung { thongbao = 1, nguoidung = item.ID, Noidung = NoiDungThongBao, Link = Url.Action("ChiTietThongBao", "GuiYeuCau") + "?id=" + sid, Ngay = DateTime.Now, NguoiTao = nguoidung.NguoiDung });
                        }
                        db.dl_thongbao_nguoidung.AddRange(lstThongBao);
                    }

                    // gửi mail thông báo
                    
                    string url = Url.Action("ChiTietThongBao", "GuiYeuCau") + "?id=" + sid+"&";

                    string eMail = string.Join (",",user.Where(it => it.IdQuyen == 65).Select(it => it.user_email).ToList());
                    if (eMail.Length > 0)
                    {
                        var dlComfig = db.dl_configs.FirstOrDefault(it => it.con_key== "Danhland");
                        if (dlComfig != null)
                        {
                            url = dlComfig.con_value + url;
                            NoiDungThongBao = NoiDungThongBao + "<br /> <br /><br />" + url;
                        }
                       

                        EMail.SenMail(title, "", eMail, "", NoiDungThongBao);
                    }
                    dl_historys hst = new dl_historys();
                    hst.Key = id.ToString();
                    hst.TableName = "dl_yeucau_canho";
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.Type = "Chỉ định căn hộ";
                    hst.Content = "Yêu cầu #" + id.ToString() + " đã được chỉ định căn hộ #" + canho.ToString();
                    hst.LinkView = Url.Action("ChiDinhCanHo", "GuiYeuCau") + "?id=" + id.ToString();
                    Logchange.SaveLogChange(db,hst);
                    await db.SaveChangesAsync();
                    r.rs_code = 1;
                    r.rs_text = "Tạo chỉ định thành công!";
                }
            }

            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = "Có lỗi xảy ra, tác vụ chưa xử lý được</ br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(r);
        }
        public async Task<JsonResult> TaoChiDinhNhieuCan(int id, int []canho)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var check = db.dl_yeucau.Where(m => m.id == id && m.trang_thai < 4).FirstOrDefault();
                if (check == null)
                {
                    r.rs_code = 0;
                    r.rs_text = "Yêu cầu đã khóa dữ liệu!";
                }
                else
                {
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    //var yeucau = db.dl_yeucau_canho.FirstOrDefault(m => m.yeu_cau == id && m.can_ho == canho);
                    //if (yeucau != null)
                    //{

                    //    yeucau.nguoi_sua = (int)nguoidung.NguoiDung;
                    //    yeucau.ngay_sua = DateTime.Now;
                    //    yeucau.da_xoa = false; yeucau.trang_thai_xem = 1;
                    //}
                    //else
                    //{

                    //}
                    var yeuCauTonTai = db.dl_yeucau_canho.Where(m => m.yeu_cau == id && canho.Contains(m.can_ho)).ToList();
                    if (yeuCauTonTai.Count > 0)
                    {
                        yeuCauTonTai.All(it => { it.nguoi_sua = (int)nguoidung.NguoiDung; it.ngay_sua = DateTime.Now; it.da_xoa = false; it.trang_thai_xem = 1; return true; });
                    }
                    List<dl_yeucau_canho> addChiDinh = new List<dl_yeucau_canho>();
                    foreach (var item in canho)
                    {
                        var test = yeuCauTonTai.FirstOrDefault(it => it.can_ho == item);
                        if (test != null)
                            continue;
                        var yeucau_canho = new dl_yeucau_canho();
                        yeucau_canho.yeu_cau = id;
                        yeucau_canho.can_ho = item;
                        yeucau_canho.nguoi_tao = (int)nguoidung.NguoiDung;
                        yeucau_canho.trang_thai_xem = 1;
                        yeucau_canho.ngay_tao = DateTime.Now;
                        yeucau_canho.da_xoa = false;
                        addChiDinh.Add(yeucau_canho);
                    }
                    if (addChiDinh.Count > 0)
                    {
                        db.dl_yeucau_canho.AddRange(addChiDinh);
                    }
                   
                    int[] iQuyen = { 64, 65 };

                    /// lưu thông báo;
                    var user = (from a in db.dl_phan_quyen
                                join b in db.dl_nguoidung_phanquyen_nhomnguoidung on a.IdDoiTuong equals b.id_nhom_nguoi_dung
                                join c in db.wp_users on b.nguoi_dung equals c.ID
                                where (iQuyen.Contains(a.IdQuyen) || c.ID == check.nguoi_phu_trach)
                                select new { c.ID, c.display_name, c.user_email, a.IdQuyen }).Distinct().ToList();

                    var listThongBao = user.Where(it => it.IdQuyen == 64 || it.ID == check.nguoi_phu_trach).Select(it=>new {it.ID}).Distinct().ToList();
                    var loainhucau = db.Database.SqlQuery<string>("SELECT GROUP_CONCAT(dl_dm_loai_nhu_cau.ten_loai_nhu_cau SEPARATOR '; ') AS tenloai FROM(SELECT gia_tri FROM dl_yeucau_nhucau WHERE dl_yeucau_nhucau.tu_khoa = 'dl_dm_loai_nhu_cau' AND dl_yeucau_nhucau.yeucau = " + id + ")dl_yeucau_nhucau INNER JOIN dl_dm_loai_nhu_cau ON dl_yeucau_nhucau.gia_tri = dl_dm_loai_nhu_cau.loai_nhu_cau").ToListAsync();
                    string nguoiPhuTrach = db.wp_users.FirstOrDefault(it => it.ID == check.nguoi_phu_trach).display_name.ToString();
                    string title = "#" + check.id + " " + check.ten_khach_hang + " có nhu cầu " + loainhucau.Result[0].ToString() + "_" + nguoiPhuTrach;
                    string NoiDungThongBao = "<b>#" + check.id + " " + check.ten_khach_hang + " có nhu cầu " + loainhucau.Result[0].ToString() + "_" + nguoiPhuTrach + "</b><br/>" + " " + nguoidung.TenHienThi + " đã cập nhật chỉ định căn hộ #" + canho.ToString();
                    string sid = HashPassword.Encrypt(id.ToString());
                    if (listThongBao.Count > 0)
                    {
                        List<dl_thongbao_nguoidung> lstThongBao = new List<dl_thongbao_nguoidung>();
                        foreach (var item in listThongBao)
                        {
                            lstThongBao.Add(new dl_thongbao_nguoidung { thongbao = 1, nguoidung = item.ID, Noidung = NoiDungThongBao, Link = Url.Action("ChiTietThongBao", "GuiYeuCau") + "?id=" + sid, Ngay = DateTime.Now, NguoiTao = nguoidung.NguoiDung });
                        }
                        db.dl_thongbao_nguoidung.AddRange(lstThongBao);
                    }

                    // gửi mail thông báo

                    string url = Url.Action("ChiTietThongBao", "GuiYeuCau") + "?id=" + sid + "&";

                    string eMail = string.Join(",", user.Where(it => it.IdQuyen == 65 ||  it.ID == check.nguoi_phu_trach).Select(it => it.user_email).Distinct().ToList());
                    if (eMail.Length > 0)
                    {
                        var dlComfig = db.dl_configs.FirstOrDefault(it => it.con_key == "Danhland");
                        if (dlComfig != null)
                        {
                            url = dlComfig.con_value + url;
                            NoiDungThongBao = NoiDungThongBao + "<br /> <br /><br />" + url;
                        }


                        EMail.SenMail(title, "", eMail, "", NoiDungThongBao);
                    }
                    dl_historys hst = new dl_historys();
                    hst.Key = id.ToString();
                    hst.TableName = "dl_yeucau_canho";
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.Type = "Chỉ định căn hộ";
                    hst.Content = "Yêu cầu #" + id.ToString() + " đã được chỉ định căn hộ #" + canho.ToString();
                    hst.LinkView = Url.Action("ChiDinhCanHo", "GuiYeuCau") + "?id=" + id.ToString();
                    Logchange.SaveLogChange(db, hst);
                    await db.SaveChangesAsync();
                    r.rs_code = 1;
                    r.rs_text = "Tạo chỉ định thành công!";
                }
            }

            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = "Có lỗi xảy ra, tác vụ chưa xử lý được</ br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(r);
        }

        [RoleAuthorize(Roles = "0=0,25=1")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> XoaCanHo(int id,int CanHo)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var check = db.dl_yeucau.Where(m => m.id == id && m.trang_thai < 4).FirstOrDefault();
                if (check == null)
                {
                    r.rs_code = 0;
                    r.rs_text = "Yêu cầu đã khóa dữ liệu!";
                }
                else
                {
                    var yeucau = db.dl_yeucau_canho.FirstOrDefault(m => m.yeu_cau == id && m.can_ho == CanHo);
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    yeucau.nguoi_xoa = (int)nguoidung.NguoiDung;
                    yeucau.ngay_xoa = DateTime.Now;
                    yeucau.da_xoa = true;

                    dl_historys hst = new dl_historys();
                    hst.Key = id.ToString();
                    hst.TableName = "dl_yeucau_canho";
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.Type = "Xóa chỉ định căn hộ";
                    hst.Content = "Yêu cầu #" + id.ToString() + " đã xóa chỉ định căn hộ #" + CanHo.ToString();
                    hst.LinkView = Url.Action("ChiDinhCanHo", "GuiYeuCau") + "?id=" + id.ToString();
                    Logchange.SaveLogChange(db, hst);

                    await db.SaveChangesAsync();
                    r.rs_code = 1;
                    r.rs_text = "Xóa căn hộ của yêu cầu thành công!";
                }
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = "Có lỗi xảy ra, tác vụ chưa xử lý được</ br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(r);
        }

        [RoleAuthorize(Roles = "0=0,24=1")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> CapNhatNgayXemNha(int id, int CanHo,DateTime Ngay)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var check = db.dl_yeucau.Where(m => m.id == id && m.trang_thai < 4).FirstOrDefault();
                if (check == null)
                {
                    r.rs_code = 0;
                    r.rs_text = "Yêu cầu đã khóa dữ liệu!";
                }
                else
                {
                    var yeucau = db.dl_yeucau_canho.FirstOrDefault(m => m.yeu_cau == id && m.can_ho == CanHo);
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    yeucau.nguoi_sua = (int)nguoidung.NguoiDung;
                    yeucau.ngay_sua = DateTime.Now;
                    yeucau.ngay_xem_nha = Ngay;

                    dl_historys hst = new dl_historys();
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.TableName = "dl_yeucau_canho";
                    hst.Key = id.ToString() + ";" + CanHo.ToString();
                    hst.Type = "Cập nhật ngày xem nhà";
                    hst.Content = "Yêu cầu #" + id.ToString() + " đã cập nhật ngày xem nhà cho cân hộ #" + CanHo.ToString();
                    hst.LinkView = Url.Action("ChiTiet", "GuiYeuCau") + "?id=" + id.ToString();
                    Logchange.SaveLogChange(db,hst);

                    await db.SaveChangesAsync();
                    r.rs_code = 1;
                    r.rs_text = "Cập nhật ngày xem nhà thành công!";
                }
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = "Có lỗi xảy ra, tác vụ chưa xử lý được</ br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(r);
        }

        [RoleAuthorize(Roles = "0=0,22=1")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> ChuyenTrangThai(int id, int CanHo,int TrangThai)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var check = db.dl_yeucau.Where(m => m.id == id && m.trang_thai < 4).FirstOrDefault();
                if (check == null)
                {
                    r.rs_code = 0;
                    r.rs_text = "Yêu cầu đã khóa dữ liệu!";
                }
                else
                {
                    var yeucau = db.dl_yeucau_canho.FirstOrDefault(m => m.yeu_cau == id && m.can_ho == CanHo);
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    yeucau.nguoi_sua = (int)nguoidung.NguoiDung;
                    yeucau.ngay_sua = DateTime.Now;
                    yeucau.trang_thai_xem = TrangThai;
                    dl_historys hst = new dl_historys();
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.TableName = "dl_yeucau_canho";
                    hst.Key = id.ToString() + ";" + CanHo.ToString();
                    hst.Type = "Chuyển trạng thái că hộ";
                    hst.Content = "Yêu cầu #" + id.ToString() + " đã chuyển trạng thái cho căn hộ #" + CanHo.ToString() + " thành #" + (TrangThai == 2 ? " Đã xem nhà " : "Không đi xem nhà");

                    hst.LinkView = Url.Action("ChiTiet", "GuiYeuCau") + "?id=" + id.ToString();
                    Logchange.SaveLogChange(db, hst);
                    await db.SaveChangesAsync();
                    r.rs_code = 1;
                    r.rs_text = "Chuyển trạng thái thành công!";
                }
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = "Có lỗi xảy ra, tác vụ chưa xử lý được</ br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(r);
        }

        [RoleAuthorize(Roles = "0=0,23=1")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UpdateGhiChu(int id, int CanHo, string GhiChu)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var check = db.dl_yeucau.Where(m => m.id == id && m.trang_thai < 4).FirstOrDefault();
                if(check==null)
                {
                    r.rs_code = 0;
                    r.rs_text = "Yêu cầu đã khóa dữ liệu!";
                }
                else
                {
                    var yeucau = db.dl_yeucau_canho.FirstOrDefault(m => m.yeu_cau == id && m.can_ho == CanHo);
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    yeucau.nguoi_sua = (int)nguoidung.NguoiDung;
                    yeucau.ngay_sua = DateTime.Now;
                    yeucau.ghi_chu = GhiChu;

                    dl_historys hst = new dl_historys();
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.TableName = "dl_yeucau_canho";
                    hst.Key = id.ToString() + ";" + CanHo.ToString();
                    hst.Type = "Yêu cầu cập nhật ghi chú căn hộ";
                    hst.Content = "Yêu cầu #" + id.ToString() + " đã cập nhật ghi chú cho căn hộ #" + CanHo.ToString() + " " +GhiChu;

                    hst.LinkView = Url.Action("ChiTiet", "GuiYeuCau") + "?id=" + id.ToString();
                    Logchange.SaveLogChange(db, hst);

                    await db.SaveChangesAsync();
                    r.rs_code = 1;
                    r.rs_text = "Cập nhật ghi chú thành công!";
                }
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = "Có lỗi xảy ra, tác vụ chưa xử lý được</ br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(r);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> CapNhatSTT(int id, string CanHo)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var check = db.dl_yeucau.Where(m => m.id == id && m.trang_thai < 4).FirstOrDefault();
                if (check == null)
                {
                    r.rs_code = 0;
                    r.rs_text = "Yêu cầu đã khóa dữ liệu!";
                }
                else
                {
                    string[] arr = CanHo.Split(',');
                    string sql = "";
                    for(int i = 0; i < arr.Length; i++)
                    {
                        sql += "update  dl_yeucau_canho set stt="+(i+1)+" where  yeu_cau="+id+" and can_ho="+arr[i]+";";
                    }
                    await db.Database.ExecuteSqlCommandAsync(sql);
                    r.rs_code = 1;
                    r.rs_text = "Cập nhật STT thành công!";
                }
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = "Có lỗi xảy ra, tác vụ chưa xử lý được</ br>Mô tả lỗi: " + ex.InnerException.Message;
            }
            return Json(r);
        }
        #endregion

        #region Lấy dữ liệu danh mục yêu cầu
        [ValidateAntiForgeryToken]
        public JsonResult getYeuCau(int id)
        {
            return Json(db.dl_yeucau.FirstOrDefault(m => m.id == id));
        }
        [ValidateAntiForgeryToken]
        public JsonResult getNhuCau(int id)
        {
            return Json(db.dl_yeucau_nhucau.Where(m => m.yeucau == id && m.tu_khoa == "dl_dm_loai_nhu_cau").Select(m => m.gia_tri).ToList());
        }
        [ValidateAntiForgeryToken]
        public JsonResult getDuAn(int id)
        {
            return Json(db.dl_yeucau_nhucau.Where(m => m.yeucau == id && m.tu_khoa == "dl_duan").Select(m => m.gia_tri).ToList());
        }
        [ValidateAntiForgeryToken]
        public JsonResult getHuongPhong(int id)
        {
            return Json(db.dl_yeucau_nhucau.Where(m => m.yeucau == id && m.tu_khoa == "v_dm_huong_ban_cong").Select(m => m.gia_tri).ToList());
        }
        [ValidateAntiForgeryToken]
        public JsonResult getHuongBanCong(int id)
        {
            return Json(db.dl_yeucau_nhucau.Where(m => m.yeucau == id && m.tu_khoa == "v_dm_huong_cua").Select(m => m.gia_tri).ToList());
        }
        #endregion
    }
}