using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using RealEstate.Libs.Models;
using RealEstate.Entity;
using RealEstate.Libs;
using System.Transactions;
using System.Web.Libs;
using System.IO;
using System.Drawing;
using ClosedXML.Excel;
using System.Text;
using System.Data.Entity;
using Ionic.Zip;

namespace RealEstate.Controllers
{
    [RoleAuthorize]
    public class CanHoController : Controller
    {
        
        RealEstateEntities db = new RealEstateEntities();
        // GET: CanHo
        //[RoleAuthorize(Roles = "0=0,1=1")]
        public ActionResult Index()
        {
            return View();
        }
        public async Task<JsonResult> GetCanHo()
        {
            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                db.Database.CommandTimeout = 60;
                var model = db.Database.SqlQuery<v_canho>("CALL proc_canho_salesmans({0});", nguoidung.NguoiDung).ToList();
                var json = Json(model, JsonRequestBehavior.AllowGet);
                json.MaxJsonLength = int.MaxValue;
                return json;
            }
            catch (Exception ex)
            {
                var json1 = Json(ex.ToString(), JsonRequestBehavior.AllowGet);
                return json1; ;
            }
           

        }
        #region Tạo căn hộ
        [RoleAuthorize(Roles = "0=0,6=1")]
        public async Task<ActionResult> Create()
        {
            var configs = await db.dl_configs.Where(m => m.con_key == "dangtin_hinhtoida" || m.con_key == "dangtin_hinhtoithieu").ToListAsync();
            ViewBag.dangtin_hinhtoida = configs.FirstOrDefault(m => m.con_key == "dangtin_hinhtoida").con_value; ViewBag.dangtin_hinhtoithieu = configs.FirstOrDefault(m => m.con_key == "dangtin_hinhtoithieu").con_value;
            return View();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [ValidateInput(false)]
        [RoleAuthorize(Roles = "0=0,6=1")]
        public async Task<JsonResult> CreateSubmit(CanHo item)
        {
            using (var tran = new TransactionScope())
            {
                ResponseStatus r = new ResponseStatus();
                decimal idCanHo = 0;
                try
                {
                    var check = db.dl_canho.Where(it => it.IDDuAn == item.IDDuAn && it.Thap == item.Thap.Trim() && it.Tang == item.Tang.Trim() && it.SoCan == item.SoCan).ToList();
                    if (check.Count > 0)
                    {
                        r.rs_code = 0;
                        r.rs_text = "Căn hộ đã tồn tại không thể thêm";
                        return Json(r, JsonRequestBehavior.AllowGet);
                    }
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    dl_canho add = new dl_canho();
                    add.IDChuNha = item.IDChuNha;
                    add.IDDuAn = item.IDDuAn;
                    add.Thap = item.Thap;
                    add.Tang = item.Tang;
                    add.SoCan = item.SoCan;
                    add.DienTich = item.DienTich;
                    add.HuongCua = item.HuongCua;
                    add.HuongBanCong = item.HuongBanCong;
                    add.PhongNgu = item.PhongNgu;
                    add.WC = item.WC;
                    add.View = item.View;
                    add.IDTinhTrangCH = item.IDTinhTrangCH;
                    add.IDLoaiCanHo = item.IDLoaiCanHo;
                    add.IDLoaiBanGiao = item.IDLoaiBanGiao;
                    add.VideoLink = item.VideoLink;
                    add.MatKhauCua = item.MatKhauCua;
                    add.GiaHopDong = item.GiaHopDong;
                    add.GiaHopDongDVT = item.GiaHopDongDVT;
                    add.GiaChuNhaGui = item.GiaChuNhaGui;
                    add.GiaChuNhaGuiDVT = item.GiaChuNhaGuiDVT;
                    add.GiaChotBan = item.GiaChotBan;
                    add.GiaChotBanDVT = item.GiaChotBanDVT;
                    //add.GiaChaoBan = item.GiaChaoBan;
                    //add.GiaChaoBanDVT = item.GiaChaoBanDVT;
                    add.GiaBan = item.GiaBan;
                    add.GIaBanDVT = item.GIaBanDVT;
                    add.GiaThueNet = item.GiaThueNet;
                    add.GiaThueNetDVT = item.GiaThueNetDVT;
                    add.GiaThueBaoPhi = item.GiaThueBaoPhi;
                    add.GIaThueBaoPhiDVT = item.GIaThueBaoPhiDVT;
                    add.GiaHopDongUSD = item.GiaHopDongUSD;
                    add.GiaChuNhaGuiUSD = item.GiaChuNhaGuiUSD;
                    // add.GiaChaoBanUSD = item.GiaChaoBanUSD;
                    add.GiaBanUSD = item.GiaBanUSD;
                    add.GiaChotBanUSD = item.GiaChotBanUSD;
                    add.GiaThueNetUSD = item.GiaThueNetUSD;
                    add.GiaThueBaoPhiUSD = item.GiaThueBaoPhiUSD;
                    add.NguoiDungTao = (int)nguoidung.NguoiDung;
                    add.NgayTao = DateTime.Now;
                    db.dl_canho.Add(add);
                    string slocalFlile = Server.MapPath("~/Content/upload/temps/imgs/" + item.imgs_key);
                    if (await db.SaveChangesAsync() > 0)
                    {
                        idCanHo = db.dl_canho.Where(it => it.NguoiDungTao == add.NguoiDungTao).Max(it => it.IDCanHo);
                        DirectoryInfo flies = new DirectoryInfo(slocalFlile);
                        string p = Server.MapPath("~/Content/upload/canho/" + idCanHo.ToString());
                        //if (!Directory.Exists(p))
                        //    Directory.CreateDirectory(p);
                        string surl = "/Content/upload/canho/" + idCanHo.ToString() + "/";
                        try
                        {
                            List<dl_canho_images> addImages = new List<dl_canho_images>();
                            foreach (var fl in flies.GetFiles())
                            {

                                if (fl.Name == item.HinhDaiDien)
                                {
                                    addImages.Add(new dl_canho_images { IDCanHo = (long)idCanHo, Url = @surl + fl.Name, TenHinh = fl.Name, HinhDaiDien = true, Size = (fl.Length / 1024).ToString() + " KB", });
                                }
                                else
                                {
                                    addImages.Add(new dl_canho_images { IDCanHo = (long)idCanHo, Url = @surl + fl.Name, TenHinh = fl.Name, HinhDaiDien = false, Size = (fl.Length / 1024).ToString() + " KB" });
                                }
                            }
                            if (addImages.Count > 0)
                            {
                                db.dl_canho_images.AddRange(addImages);
                            }
                            var chuNha = db.dl_dm_chunha.FirstOrDefault(it => it.IdChuNha == item.IDChuNha);
                            // add lich su chu nha
                            var lsChuNha = new dl_canho_chunha();
                            lsChuNha.IdCanho = (long)idCanHo;
                            lsChuNha.IdChuNha = item.IDChuNha;
                            lsChuNha.GhiChu = chuNha.GhiChu;
                            lsChuNha.IdNguoiDung = (long)nguoidung.NguoiDung;
                            lsChuNha.Ngay = DateTime.Now;
                            db.dl_canho_chunha.Add(lsChuNha);

                            // add lic su gia
                            var lsGia = new dl_canho_lichsugia();
                            lsGia.IDCanHo = (long)idCanHo;
                            string sTemp = "";
                            if (item.GiaHopDong != null && item.GiaHopDong > 0)
                            {
                                sTemp = item.GiaHopDong.ToString() + " " + item.GiaHopDongDVT;
                            }
                            if (item.GiaHopDongUSD != null && item.GiaHopDongUSD > 0)
                            {
                                sTemp = sTemp + ";" + item.GiaHopDongUSD.ToString() + " USD";
                            }
                            lsGia.GiaHopDong = sTemp;
                            sTemp = "";
                            if (item.GiaChuNhaGui != null && item.GiaChuNhaGui > 0)
                            {
                                sTemp = item.GiaChuNhaGui.ToString() + " " + item.GiaChuNhaGuiDVT;
                            }
                            if (item.GiaChuNhaGuiUSD != null && item.GiaChuNhaGuiUSD > 0)
                            {
                                sTemp = sTemp + ";" + item.GiaChuNhaGuiUSD.ToString() + " USD";
                            }
                            lsGia.GiaChuNhaGui = sTemp;

                            sTemp = "";
                            if (item.GiaThueNet != null && item.GiaThueNet > 0)
                            {
                                sTemp = sTemp + item.GiaThueNet.ToString() + " " + item.GiaThueNetDVT;
                            }
                            if (item.GiaThueNetUSD != null && item.GiaThueNetUSD > 0)
                            {
                                sTemp = sTemp + ";" + item.GiaThueNetUSD.ToString() + " USD";
                            }

                            if (item.GiaThueBaoPhi != null && item.GiaThueBaoPhi > 0)
                            {
                                sTemp = sTemp + ";" + item.GiaThueBaoPhi.ToString() + " " + item.GIaThueBaoPhiDVT;
                            }
                            if (item.GiaThueBaoPhiUSD != null && item.GiaThueBaoPhiUSD > 0)
                            {
                                sTemp = sTemp + ";" + item.GiaThueBaoPhiUSD.ToString() + " USD";
                            }
                            lsGia.GiaThue = sTemp;

                            sTemp = "";
                            if (item.GiaChaoBan != null && item.GiaChaoBan > 0)
                            {
                                sTemp = item.GiaChaoBan.ToString() + " " + item.GiaChaoBanDVT;
                            }
                            if (item.GiaChaoBanUSD != null && item.GiaChaoBanUSD > 0)
                            {
                                sTemp = sTemp + ";" + item.GiaChaoBanUSD.ToString() + " USD";
                            }
                            lsGia.GiaChaoBan = sTemp;

                            sTemp = "";
                            if (item.GiaChotBan != null && item.GiaChotBan > 0)
                            {
                                sTemp = item.GiaChotBan.ToString() + " " + item.GiaChotBanDVT;
                            }
                            if (item.GiaChotBanUSD != null && item.GiaChotBanUSD > 0)
                            {
                                sTemp = sTemp + ";" + item.GiaChotBanUSD.ToString() + " USD";
                            }
                            lsGia.GiaChotBan = sTemp;
                            lsGia.NguoiDungTao = nguoidung.NguoiDung;
                            lsGia.NgayTao = DateTime.Now;
                            db.dl_canho_lichsugia.Add(lsGia);
                            dl_historys hst = new dl_historys();
                            hst.Key = idCanHo.ToString();
                            hst.Type = "Thêm mới căn hộ";
                            hst.NguoiDung = nguoidung.NguoiDung;
                            hst.Ngay = DateTime.Now;
                            hst.TableName = "dl_canho";
                            hst.LinkView = Url.Action("Edit", "CanHo") + "?id=" + hst.Key;
                            hst.Content = Logchange.Insert(add, "dl_canho");
                            Logchange.SaveLogChange(db, hst);
                            await db.SaveChangesAsync();
                            if (flies.GetFiles().Count() > 0)
                            {
                                flies.MoveTo(p);
                            }
                         
                            // add history
                           
                            tran.Complete();
                            r.rs_code = 1;
                            r.rs_text = idCanHo.ToString();

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
                            Directory.Delete(slocalFlile, true);
                            Directory.Delete(p, true);
                            r.rs_code = 0;
                            r.rs_text = sb.ToString();
                        }

                    }


                }
                catch (Exception ex)
                {
                    r.rs_code = 0;
                    r.rs_text = ex.ToString();
                }
                return Json(r, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult UploadImages(string id)
        {
            ResponseStatus r = new ResponseStatus();
            int StatusCode = 0;
            try
            {
                string p = Server.MapPath("~/Content/upload/temps/imgs/" + id);
                if (!Directory.Exists(p))
                    Directory.CreateDirectory(p);
                if (Request.Files.Count > 0)
                {
                    for (int i = 0; i < Request.Files.Count; i++)
                    {
                        var file = Request.Files[i];
                        if (file != null && file.ContentLength > 0)
                        {
                            string extension = Path.GetExtension(file.FileName);
                            var fileName = clsFunction.GenerateSlug(file.FileName.Replace(extension, ""));
                            var path = Path.Combine(p, fileName + extension);
                            string s_watermark = Server.MapPath("~/Content/upload/images/watermark.png");
                            Bitmap watermark = new Bitmap(s_watermark);
                            Bitmap bitmap = new Bitmap(file.InputStream);
                            bitmap = clsFunction.WatermarkImage(bitmap, watermark);
                            bitmap.Save(path);
                        }
                    }
                }
                StatusCode = 1;
                r.rs_code = 1;
            }
            catch
            {
                StatusCode = 0;
            }
            return Json(StatusCode);
        }
        public JsonResult GetFileImages(string id, decimal post)
        {
            if (post == 0)
            {
                string p = Server.MapPath("~/Content/upload/temps/imgs/" + id);
                clsFunction fn = new clsFunction();
                return Json(fn.GetFile(p, "/Content/upload/temps/imgs/" + id + "/"), JsonRequestBehavior.AllowGet);
            }
            else
            {
                string p = Server.MapPath("~/Content/upload/canho/imgs/" + id);
                clsFunction fn = new clsFunction();
                List<FileModel> f = fn.GetFile(p, "/Content/upload/canho/imgs/" + id + "/");
                string p2 = Server.MapPath("~/Content/upload/canho/json/" + id);
                if (!System.IO.Directory.Exists(p2))
                {
                    System.IO.Directory.CreateDirectory(p2);
                }
                string fi = p2 + @"\" + post + ".json";
                return Json(f, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult XoaFileLocal(string id, string file)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                string p = Server.MapPath("~/Content/upload/temps/imgs/" + id);
                System.IO.File.Delete(p + "/" + file);
                r.rs_code = 1;
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = ex.Message;
            }
            return Json(r);
        }
        #endregion

        #region Edit căn hộ
        [RoleAuthorize(Roles = "0=0,6=1")]
        public async Task<ActionResult> Edit(long id)
        {
            if (!User.IsInRole("1=1"))
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                var checkCanHo = db.dl_canho_giohangsalesman.Where(it => it.IDCanHo == id && it.NguoiDung == nguoidung.NguoiDung).ToList();
                if (checkCanHo.Count == 0)
                {
                    return Content("Căn hộ có ID " + id.ToString() + " bạn không có quyền truy cập");
                }
            }
            var model = new CanHo();
            var itemCanHo = db.dl_canho.FirstOrDefault(it => it.IDCanHo == id);
            var listImages = db.dl_canho_images.Where(it => it.IDCanHo == id).ToList();
            model.IDCanHo = itemCanHo.IDCanHo;
            model.IDChuNha = itemCanHo.IDChuNha;
            model.IDDuAn = itemCanHo.IDDuAn;
            model.Thap = itemCanHo.Thap;
            model.Tang = itemCanHo.Tang;
            model.SoCan = itemCanHo.SoCan;
            model.DienTich = itemCanHo.DienTich;
            model.HuongCua = itemCanHo.HuongCua;
            model.HuongBanCong = itemCanHo.HuongBanCong;
            model.PhongNgu = itemCanHo.PhongNgu;
            model.WC = itemCanHo.WC;
            model.View = itemCanHo.View;
            model.IDTinhTrangCH = itemCanHo.IDTinhTrangCH;
            model.IDLoaiCanHo = itemCanHo.IDLoaiCanHo;
            model.IDLoaiBanGiao = itemCanHo.IDLoaiBanGiao;
            model.VideoLink = itemCanHo.VideoLink;
            model.MatKhauCua = itemCanHo.MatKhauCua;
            model.GiaHopDong = itemCanHo.GiaHopDong;
            model.GiaHopDongDVT = itemCanHo.GiaHopDongDVT;
            model.GiaChuNhaGui = itemCanHo.GiaChuNhaGui;
            model.GiaChuNhaGuiDVT = itemCanHo.GiaChuNhaGuiDVT;
            model.GiaChotBan = itemCanHo.GiaChotBan;
            model.GiaChotBanDVT = itemCanHo.GiaChotBanDVT;
            model.GiaChaoBan = itemCanHo.GiaChaoBan;
            model.GiaChaoBanDVT = itemCanHo.GiaChaoBanDVT;
            model.GiaThueNet = itemCanHo.GiaThueNet;
            model.GiaThueNetDVT = itemCanHo.GiaThueNetDVT;
            model.GiaThueBaoPhi = itemCanHo.GiaThueBaoPhi;
            model.GIaThueBaoPhiDVT = itemCanHo.GIaThueBaoPhiDVT;
            model.GiaHopDongUSD = itemCanHo.GiaHopDongUSD;
            model.GiaChuNhaGuiUSD = itemCanHo.GiaChuNhaGuiUSD;
            model.GiaChaoBanUSD = itemCanHo.GiaChaoBanUSD;
            model.GiaChotBanUSD = itemCanHo.GiaChotBanUSD;
            model.GiaThueNetUSD = itemCanHo.GiaThueNetUSD;
            model.GiaThueBaoPhiUSD = itemCanHo.GiaThueBaoPhiUSD;
            model.GiaBan = itemCanHo.GiaBan;
            model.GIaBanDVT = itemCanHo.GIaBanDVT;
            model.GiaBanUSD = itemCanHo.GiaBanUSD;
            model.GiaGoc = itemCanHo.GiaGoc;
            model.GiaGocDVT = itemCanHo.GiaGocDVT;
            model.GiaGocUSD = itemCanHo.GiaGocUSD;
            model.GhiChuQuanLy = itemCanHo.GhiChuQuanLy;
            model.GhiChuAdmin = itemCanHo.GhiChuAdmin;
            model.GhiChuSales = itemCanHo.GhiChuSales;

            var hinhDaiDien = listImages.FirstOrDefault(it => it.HinhDaiDien == true);
            if (hinhDaiDien != null)
            {
                model.HinhDaiDien = hinhDaiDien.TenHinh;
            }
            // model.HinhDaiDien = listImages.Count > 0 ? listImages.FirstOrDefault(it => it.HinhDaiDien == true).TenHinh : null;
            model.listGhiChu = LoadGhiChu(id);
            model.listImages = listImages;
            var configs = await db.dl_configs.Where(m => m.con_key == "dangtin_hinhtoida" || m.con_key == "dangtin_hinhtoithieu").ToListAsync();
            ViewBag.dangtin_hinhtoida = configs.FirstOrDefault(m => m.con_key == "dangtin_hinhtoida").con_value; ViewBag.dangtin_hinhtoithieu = configs.FirstOrDefault(m => m.con_key == "dangtin_hinhtoithieu").con_value;
            return View(model);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,6=1")]
        public async Task<JsonResult> EditSubmit(CanHo item)
        {
            using (var tran = new TransactionScope())
            {
                ResponseStatus r = new ResponseStatus();

                try
                {

                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    
                   

                    if (!User.IsInRole("1=1"))
                    {
                        var checkCanHo = db.dl_canho_giohangsalesman.Where(it => it.IDCanHo == item.IDCanHo && it.NguoiDung == nguoidung.NguoiDung).ToList();
                        if (checkCanHo.Count == 0)
                        {
                            r.rs_code = 0;
                            r.rs_text = "Căn hộ có ID " + item.IDCanHo.ToString() + " bạn không có quyền truy cập";
                            return Json(r, JsonRequestBehavior.AllowGet);
                        }
                    }
                    var add = db.dl_canho.FirstOrDefault(it => it.IDCanHo == item.IDCanHo);
                    dl_historys hst = new dl_historys();
                    hst.Content = Logchange.Edit(item, add, "dl_canho");
                    add.IDDuAn = item.IDDuAn;
                    add.Thap = item.Thap;
                    add.Tang = item.Tang;
                    add.SoCan = item.SoCan;
                    add.DienTich = item.DienTich;
                    add.HuongCua = item.HuongCua;
                    add.HuongBanCong = item.HuongBanCong;
                    add.PhongNgu = item.PhongNgu; 
                   
                    /// Add ghi chú căn hộ
                    var addGhChu = new List<dl_canho_ghichu>();
                    if (item.GhiChuAdmin != null && item.GhiChuAdmin.Length > 0 && item.GhiChuAdmin != add.GhiChuAdmin)
                    {
                        addGhChu.Add(new dl_canho_ghichu { canho = (long)add.IDCanHo, noidung = item.GhiChuAdmin, nhom_nguoidung = 1, nguoidung = (int)nguoidung.NguoiDung, ngaynhap = DateTime.Now });
                        add.GhiChuAdmin = item.GhiChuAdmin;
                    }
                    if (item.GhiChuQuanLy != null && item.GhiChuQuanLy.Length > 0 && item.GhiChuQuanLy != add.GhiChuQuanLy)
                    {
                        addGhChu.Add(new dl_canho_ghichu { canho = (long)add.IDCanHo, noidung = item.GhiChuQuanLy, nhom_nguoidung = 2, nguoidung = (int)nguoidung.NguoiDung, ngaynhap = DateTime.Now });
                        add.GhiChuQuanLy = item.GhiChuQuanLy;
                    }
                    if (item.GhiChuSales != null && item.GhiChuSales.Length > 0 && item.GhiChuSales != add.GhiChuSales)
                    {
                        addGhChu.Add(new dl_canho_ghichu { canho = (long)add.IDCanHo, noidung = item.GhiChuSales, nhom_nguoidung = 3, nguoidung = (int)nguoidung.NguoiDung, ngaynhap = DateTime.Now });
                        add.GhiChuSales = item.GhiChuSales;
                    }
                    if (addGhChu.Count > 0)
                    {
                        db.dl_canho_ghichu.AddRange(addGhChu);
                    }
                    
                    /////
                    var chuNha = db.dl_dm_chunha.FirstOrDefault(it => it.IdChuNha == item.IDChuNha);
                    // add lich su chu nha
                    var lsChuNha = new dl_canho_chunha();
                    if (item.IDChuNha != add.IDChuNha)
                    {
                        lsChuNha.IdCanho = (long)item.IDCanHo;
                        lsChuNha.IdChuNha = item.IDChuNha;
                        lsChuNha.GhiChu = chuNha.GhiChu;
                        lsChuNha.IdNguoiDung = (long)nguoidung.NguoiDung;
                        lsChuNha.Ngay = DateTime.Now;
                        db.dl_canho_chunha.Add(lsChuNha);
                    }
                    // add lic su gia
                    var lsGia = new dl_canho_lichsugia();
                    lsGia.IDCanHo = (long)(long)item.IDCanHo;
                    string sTemp = "";
                    if (item.GiaHopDong != null && item.GiaHopDong > 0 && item.GiaHopDong != add.GiaHopDong)
                    {
                        sTemp = item.GiaHopDong.ToString() + " " + item.GiaHopDongDVT;
                    }
                    if (item.GiaHopDongUSD != null && item.GiaHopDongUSD > 0 && item.GiaHopDongUSD != add.GiaHopDongUSD)
                    {
                        if (sTemp.Length > 0)
                        {
                            sTemp = sTemp + ";" + item.GiaHopDongUSD.ToString() + " USD";
                        }
                        else
                        {
                            sTemp = item.GiaHopDongUSD.ToString() + " USD";
                        }
                    }
                    lsGia.GiaHopDong = sTemp;
                    sTemp = "";
                    if (item.GiaChuNhaGui != null && item.GiaChuNhaGui > 0 && item.GiaChuNhaGui != add.GiaChuNhaGui)
                    {
                        sTemp = item.GiaChuNhaGui.ToString() + " " + item.GiaChuNhaGuiDVT;
                    }
                    if (item.GiaChuNhaGuiUSD != null && item.GiaChuNhaGuiUSD > 0 && item.GiaChuNhaGuiUSD != add.GiaChuNhaGuiUSD)
                    {
                        if (sTemp == "")
                        {
                            sTemp = item.GiaChuNhaGuiUSD.ToString() + " USD";
                        }
                        else
                        {
                            sTemp = sTemp + ";" + item.GiaChuNhaGuiUSD.ToString() + " USD";
                        }

                    }
                    lsGia.GiaChuNhaGui = sTemp;

                    sTemp = "";
                    if (item.GiaThueNet != null && item.GiaThueNet > 0 && item.GiaThueNet != add.GiaThueNet)
                    {
                        sTemp = item.GiaThueNet.ToString() + " " + item.GiaThueNetDVT;
                    }
                    if (item.GiaThueNetUSD != null && item.GiaThueNetUSD > 0 && item.GiaThueNetUSD != add.GiaThueNetUSD)
                    {
                        if (sTemp == "")
                        {
                            sTemp = item.GiaThueNetUSD.ToString() + " USD";
                        }
                        else
                            sTemp = sTemp + ";" + item.GiaThueNetUSD.ToString() + " USD";
                    }
                    sTemp = "";
                    if (item.GiaThueBaoPhi != null && item.GiaThueBaoPhi > 0 && item.GiaThueBaoPhi != add.GiaThueBaoPhi)
                    {
                        sTemp = item.GiaThueBaoPhi.ToString() + " " + item.GIaThueBaoPhiDVT;
                    }
                    if (item.GiaThueBaoPhiUSD != null && item.GiaThueBaoPhiUSD > 0 && item.GiaThueBaoPhiUSD != add.GiaThueBaoPhiUSD)
                    {
                        if (sTemp == "")
                        {
                            sTemp = item.GiaThueBaoPhiUSD.ToString() + " USD";
                        }
                        else
                            sTemp = sTemp + ";" + item.GiaThueBaoPhiUSD.ToString() + " USD";
                    }
                    lsGia.GiaThue = sTemp;

                    sTemp = "";
                    if (item.GiaChaoBan != null && item.GiaChaoBan > 0 && item.GiaChaoBan != add.GiaChaoBan)
                    {
                        sTemp = item.GiaChaoBan.ToString() + " " + item.GiaChaoBanDVT;
                    }
                    if (item.GiaChaoBanUSD != null && item.GiaChaoBanUSD > 0 && item.GiaChaoBanUSD != add.GiaChaoBanUSD)
                    {
                        if (sTemp == "")
                            sTemp = item.GiaChaoBanUSD.ToString() + " USD";
                        else
                            sTemp = sTemp + ";" + item.GiaChaoBanUSD.ToString() + " USD";
                    }
                    lsGia.GiaChaoBan = sTemp;

                    sTemp = "";
                    if (item.GiaChotBan != null && item.GiaChotBan > 0 && item.GiaChotBan != add.GiaChotBan)
                    {
                        sTemp = item.GiaChotBan.ToString() + " " + item.GiaChotBanDVT;
                    }
                    if (item.GiaChotBanUSD != null && item.GiaChotBanUSD > 0 && item.GiaChotBanUSD != add.GiaChotBanUSD)
                    {
                        if (sTemp == "")
                            sTemp = item.GiaChotBanUSD.ToString() + " USD";
                        else
                            sTemp = sTemp + ";" + item.GiaChotBanUSD.ToString() + " USD";
                    }
                    lsGia.GiaChotBan = sTemp;
                    lsGia.NguoiDungTao = nguoidung.NguoiDung;
                    lsGia.NgayTao = DateTime.Now;
                    if (lsGia.GiaChaoBan.Length > 0 || lsGia.GiaChotBan.Length > 0 || lsGia.GiaChuNhaGui.Length > 0
                         || lsGia.GiaHopDong.Length > 0 || lsGia.GiaThue.Length > 0)
                    {
                        db.dl_canho_lichsugia.Add(lsGia);
                    }
                    ///
                    add.IDChuNha = item.IDChuNha;
                    add.WC = item.WC;
                    add.View = item.View;
                    add.IDTinhTrangCH = item.IDTinhTrangCH;
                    add.IDLoaiCanHo = item.IDLoaiCanHo;
                    add.IDLoaiBanGiao = item.IDLoaiBanGiao;
                    add.VideoLink = item.VideoLink;
                    add.MatKhauCua = item.MatKhauCua;
                    add.GiaHopDong = item.GiaHopDong;
                    add.GiaHopDongDVT = item.GiaHopDongDVT;
                    add.GiaChuNhaGui = item.GiaChuNhaGui;
                    add.GiaChuNhaGuiDVT = item.GiaChuNhaGuiDVT;
                    add.GiaChotBan = item.GiaChotBan;
                    add.GiaChotBanDVT = item.GiaChotBanDVT;
                    add.GiaChaoBan = item.GiaChaoBan;
                    add.GiaChaoBanDVT = item.GiaChaoBanDVT;
                    add.GiaThueNet = item.GiaThueNet;
                    add.GiaThueNetDVT = item.GiaThueNetDVT;
                    add.GiaThueBaoPhi = item.GiaThueBaoPhi;
                    add.GIaThueBaoPhiDVT = item.GIaThueBaoPhiDVT;
                    add.GiaHopDongUSD = item.GiaHopDongUSD;
                    add.GiaChuNhaGuiUSD = item.GiaChuNhaGuiUSD;
                    add.GiaChaoBanUSD = item.GiaChaoBanUSD;
                    add.GiaChotBanUSD = item.GiaChotBanUSD;
                    add.GiaThueNetUSD = item.GiaThueNetUSD;
                    add.GiaThueBaoPhiUSD = item.GiaThueBaoPhiUSD;
                    add.NguoiDungSua = (int)nguoidung.NguoiDung;
                    add.NgaySua = DateTime.Now;

                    add.GiaGoc = item.GiaGoc;
                    add.GiaGocDVT = item.GiaGocDVT;
                    add.GiaGocUSD = item.GiaGocUSD;
                    add.GiaBan = item.GiaBan;
                    add.GiaBanUSD = item.GiaBanUSD;
                    add.GIaBanDVT = item.GIaBanDVT;

                    // add history

                    hst.Key = item.IDCanHo.ToString();
                    hst.Type = "Chỉnh sửa căn hộ";
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.Ngay = DateTime.Now;
                    hst.TableName = "dl_canho";
                    hst.LinkView = Url.Action("Edit", "CanHo") + "?id=" + hst.Key;

                    Logchange.SaveLogChange(db, hst);
                    db.SaveChanges();
                    tran.Complete();
                    r.rs_code = 1;
                    r.rs_text = "Thêm mới thành công";
                }
                catch (Exception ex)
                {
                    r.rs_code = 0;
                    r.rs_text = ex.ToString();
                }
                return Json(r, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult XoaFileEdit(long id)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                var del = db.dl_canho_images.FirstOrDefault(it => it.ID == id);
                db.dl_canho_images.Remove(del);
                dl_historys item = new dl_historys();
                item.Key = id.ToString();
                item.TableName = "dl_canho_images";
                item.NguoiDung = nguoidung.NguoiDung;
                item.Ngay = DateTime.Now;
                item.Type = "Xóa hình căn hộ";
                item.LinkView = Url.Action("Edit", "CanHo") + "?id=" + id;
                item.Content = Logchange.Insert(del, "dl_canho_images");
                Logchange.SaveLogChange(db,item);
                string p = Server.MapPath("~" + del.Url);
                System.IO.File.Delete(p);
                db.SaveChanges();
                r.rs_code = 1;
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = ex.Message;
            }
            return Json(r, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFileImagesEdit(string id)
        {
            long idCanHo = long.Parse(id);
            var modle = db.dl_canho_images.Where(it => it.IDCanHo == idCanHo).ToList();
            return Json(modle, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UploadImagesEdit(string id, string HinhDaiDien)
        {
            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            int iHinhToiDa = 0;
            try
            {
                iHinhToiDa = int.Parse(db.dl_configs.FirstOrDefault(it => it.con_key == "dangtin_hinhtoida").con_value);
            }
            catch
            {
                iHinhToiDa = 50;
            }
            ResponseStatus r = new ResponseStatus();
            try
            {
                string p = Server.MapPath("~/Content/upload/canho/" + id);
                if (!Directory.Exists(p))
                    Directory.CreateDirectory(p);
                if (Request.Files.Count > 0)
                {
                    List<dl_canho_images> addImages = new List<dl_canho_images>();
                    long idCanHo = long.Parse(id);
                    var checkData = db.dl_canho_images.Where(it => it.IDCanHo == idCanHo).ToList();
                    bool bHinhDaiDien = false;
                    if (checkData.Count() == 0)
                        bHinhDaiDien = true;
                    else
                    {
                        if ((checkData.Count + Request.Files.Count) > iHinhToiDa)
                        {
                            r.rs_code = 0;
                            r.rs_text = "Số hình vượt quá "+ iHinhToiDa .ToString()+ " hình không thể up";
                            return Json(r, JsonRequestBehavior.AllowGet);
                        }
                    }
                    for (int i = 0; i < Request.Files.Count; i++)
                    {
                        var file = Request.Files[i];
                        if (file != null && file.ContentLength > 0)
                        {
                            string extension = Path.GetExtension(file.FileName);
                            var fileName = clsFunction.GenerateSlug(file.FileName.Replace(extension, ""));
                            var path = Path.Combine(p, fileName + extension);
                            string s_watermark = Server.MapPath("~/Content/upload/images/watermark.png");
                            Bitmap watermark = new Bitmap(s_watermark);
                            Bitmap bitmap = new Bitmap(file.InputStream);
                            bitmap = clsFunction.WatermarkImage(bitmap, watermark);

                            if (checkData.Where(it => it.TenHinh == (fileName + extension)).Count() > 0)
                                continue;
                            addImages.Add(new dl_canho_images { IDCanHo = long.Parse(id), Url = "/Content/upload/canho/" + id + "/" + fileName + extension, TenHinh = fileName + extension, HinhDaiDien = bHinhDaiDien, Size = (file.ContentLength / 1024).ToString() + " KB" });
                            bHinhDaiDien = false;
                            bitmap.Save(path);

                        }
                    }
                    db.dl_canho_images.AddRange(addImages);
                    List<dl_historys> hst = new List<dl_historys>();
                    foreach (var item in addImages)
                    {
                        dl_historys it = new dl_historys();
                        it.Key = id;
                        it.TableName = "dl_canho_images";
                        it.NguoiDung = nguoidung.NguoiDung;
                        it.Ngay = DateTime.Now;
                        it.Type = "Thêm hình vào căn hộ";
                        it.LinkView = Url.Action("Edit", "CanHo") + "?id=" + id;
                        it.Content = Logchange.Insert(item, "dl_canho_images");
                        hst.Add(it);
                    }
                    Logchange.SaveLogChangeList(db, hst);
                    db.SaveChanges();
                    r.rs_code = 1;
                    r.rs_text = "Thành công";
                }

            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = ex.Message;
            }
            return Json(r, JsonRequestBehavior.AllowGet);
        }
        #endregion
        [RoleAuthorize(Roles = "0=0,7=1")]
        public ActionResult EditGhiChu(long id)
        {
            var model = new CanHo();
            var itemCanHo = db.dl_canho.FirstOrDefault(it => it.IDCanHo == id);
            // var listImages = db.dl_canho_images.Where(it => it.IDCanHo == id).ToList();

            model.IDCanHo = itemCanHo.IDCanHo;
            model.IDChuNha = itemCanHo.IDChuNha;
            model.IDDuAn = itemCanHo.IDDuAn;
            model.Thap = itemCanHo.Thap;
            model.Tang = itemCanHo.Tang;
            model.SoCan = itemCanHo.SoCan;
            model.DienTich = itemCanHo.DienTich;
            model.HuongCua = itemCanHo.HuongCua;
            model.HuongBanCong = itemCanHo.HuongBanCong;
            model.PhongNgu = itemCanHo.PhongNgu;
            model.WC = itemCanHo.WC;
            model.View = itemCanHo.View;
            model.IDTinhTrangCH = itemCanHo.IDTinhTrangCH;
            model.IDLoaiCanHo = itemCanHo.IDLoaiCanHo;
            model.IDLoaiBanGiao = itemCanHo.IDLoaiBanGiao;
            model.VideoLink = itemCanHo.VideoLink;
            model.MatKhauCua = itemCanHo.MatKhauCua;
            model.GiaHopDong = itemCanHo.GiaHopDong;
            model.GiaHopDongDVT = itemCanHo.GiaHopDongDVT;
            model.GiaChuNhaGui = itemCanHo.GiaChuNhaGui;
            model.GiaChuNhaGuiDVT = itemCanHo.GiaChuNhaGuiDVT;
            model.GiaChotBan = itemCanHo.GiaChotBan;
            model.GiaChotBanDVT = itemCanHo.GiaChotBanDVT;
            model.GiaChaoBan = itemCanHo.GiaChaoBan;
            model.GiaChaoBanDVT = itemCanHo.GiaChaoBanDVT;
            model.GiaThueNet = itemCanHo.GiaThueNet;
            model.GiaThueNetDVT = itemCanHo.GiaThueNetDVT;
            model.GiaThueBaoPhi = itemCanHo.GiaThueBaoPhi;
            model.GIaThueBaoPhiDVT = itemCanHo.GIaThueBaoPhiDVT;
            model.GiaHopDongUSD = itemCanHo.GiaHopDongUSD;
            model.GiaChuNhaGuiUSD = itemCanHo.GiaChuNhaGuiUSD;
            model.GiaChaoBanUSD = itemCanHo.GiaChaoBanUSD;
            model.GiaChotBanUSD = itemCanHo.GiaChotBanUSD;
            model.GiaThueNetUSD = itemCanHo.GiaThueNetUSD;
            model.GiaThueBaoPhiUSD = itemCanHo.GiaThueBaoPhiUSD;
            model.GhiChuAdmin = itemCanHo.GhiChuAdmin;
            model.GhiChuQuanLy = itemCanHo.GhiChuQuanLy;
            model.GhiChuSales = itemCanHo.GhiChuSales;
            // model.HinhDaiDien = listImages.FirstOrDefault(it => it.HinhDaiDien == true).TenHinh;
            model.listGhiChu = LoadGhiChu(id);
            // model.listImages = listImages;
            return View(model);
        }
        // Add ghi chú căn hộ
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,12=1")]
        public async Task<JsonResult> AddGhiChuCanHo(CanHo item)
        {
            ResponseStatus r = new ResponseStatus();
            r.rs_code = 0;
            try
            {
                var canHo = db.dl_canho.FirstOrDefault(it => it.IDCanHo == item.IDCanHo);
                var addGhChu = new List<dl_canho_ghichu>();
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                if (item.GhiChuAdmin != null && item.GhiChuAdmin.Length > 0 && item.GhiChuAdmin != canHo.GhiChuAdmin)
                {
                    addGhChu.Add(new dl_canho_ghichu { canho = (long)canHo.IDCanHo, noidung = item.GhiChuAdmin, nhom_nguoidung = 1, nguoidung = (int)nguoidung.NguoiDung, ngaynhap = DateTime.Now });
                    canHo.GhiChuAdmin = item.GhiChuAdmin;
                }
                if (item.GhiChuQuanLy != null && item.GhiChuQuanLy.Length > 0 && item.GhiChuQuanLy != canHo.GhiChuQuanLy)
                {
                    addGhChu.Add(new dl_canho_ghichu { canho = (long)canHo.IDCanHo, noidung = item.GhiChuQuanLy, nhom_nguoidung = 2, nguoidung = (int)nguoidung.NguoiDung, ngaynhap = DateTime.Now });
                    canHo.GhiChuQuanLy = item.GhiChuQuanLy;
                }
                if (item.GhiChuSales != null && item.GhiChuSales.Length > 0 && item.GhiChuSales != canHo.GhiChuSales)
                {
                    addGhChu.Add(new dl_canho_ghichu { canho = (long)canHo.IDCanHo, noidung = item.GhiChuSales, nhom_nguoidung = 3, nguoidung = (int)nguoidung.NguoiDung, ngaynhap = DateTime.Now });
                    canHo.GhiChuSales = item.GhiChuSales;
                }
                if (addGhChu.Count > 0)
                {
                    
                    List<dl_historys> hst = new List<dl_historys>();
                    foreach (var it in addGhChu)
                    {
                        dl_historys hstItem = new dl_historys();
                        hstItem.Key = item.IDCanHo.ToString();
                        hstItem.Ngay = DateTime.Now;
                        hstItem.NguoiDung = nguoidung.NguoiDung;
                        hstItem.TableName = "dl_canho_ghichu";
                        hstItem.Type = "Thêm ghi chú căn hộ";
                        hstItem.LinkView = Url.Action("EditGhiChu", "CanHo") + "?id=" + item.IDCanHo.ToString();
                        hstItem.Content = Logchange.Insert(it, "dl_canho_ghichu");
                        hst.Add(hstItem);
                    }
                    Logchange.SaveLogChangeList(db, hst);
                    db.dl_canho_ghichu.AddRange(addGhChu);
                    db.SaveChanges();
                    r.rs_code = 1;
                }
                else
                {
                    r.rs_text = "Không có nội dung ghi chú cập nhật";
                }
            }
            catch (Exception ex)
            {
                r.rs_text = ex.ToString();
            }
            r.rs_data = LoadGhiChu((long)item.IDCanHo);
            return Json(r, JsonRequestBehavior.AllowGet);
        }
        // xóa ghi chú căn hộ
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,13=1")]
        public async Task<JsonResult> XoaGhiChuCanHo(long id)
        {
            ResponseStatus r = new ResponseStatus();
            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            r.rs_code = 0;
            var del = db.dl_canho_ghichu.FirstOrDefault(it => it.id_ghichu == id);
            long diCanHo = del.canho.Value;
            db.dl_canho_ghichu.Remove(del);

            dl_historys hst = new dl_historys();
            hst.Key = id.ToString();
            hst.TableName = "dl_canho_ghichu";
            hst.Ngay = DateTime.Now;
            hst.NguoiDung = nguoidung.NguoiDung;
            hst.Type = "Xóa ghi chú căn hộ";
            hst.Content = "Xóa ghi chú ID #" + id.ToString();
            hst.LinkView = "#";
            Logchange.SaveLogChange(db,hst);

            db.SaveChanges();
            r.rs_code = 1;
            r.rs_data = LoadGhiChu(diCanHo);
            return Json(r, JsonRequestBehavior.AllowGet);

        }

        [RoleAuthorize(Roles = "0=0,3=1")]
        // chi tiết căn hộ
        public ActionResult ChiTietCanHo(long id)
        {
            if (!User.IsInRole("1=1"))
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                var checkCanHo = db.dl_canho_giohangsalesman.Where(it => it.IDCanHo == id && it.NguoiDung == nguoidung.NguoiDung).ToList();
                if (checkCanHo.Count == 0)
                {
                    return Content("Căn hộ có ID " + id.ToString() + " bạn không có quyền truy cập");
                }
            }
            ChiTietCanHo model = new ChiTietCanHo();
            v_canho data = db.Database.SqlQuery<v_canho>("CALL Pro_CanHoChiTiet({0});", id).FirstOrDefault();
            model.CanHo = data;
            model.GhiChu = LoadGhiChu(id);
            model.Images = db.dl_canho_images.Where(it => it.IDCanHo == id).ToList();
            model.LichSuGia = db.dl_canho_lichsugia.Where(it => it.IDCanHo == id).ToList();

            var chuNha = db.dl_canho_chunha.Join(db.dl_dm_chunha,
                                                 canho => canho.IdChuNha,
                                                 chunha => chunha.IdChuNha,

                                                 (CHNh, CNh) => new ChuNha { TenChuNha = CNh.TenChuNha, IdChuNha = CNh.IdChuNha, NgayTao = CHNh.Ngay.ToString(), GhiChu = CHNh.GhiChu, IdCanho = CHNh.IdCanho }).Where(it => it.IdCanho == id).ToList();
            model.LichSuChuNha = chuNha;
            try
            {
                model.HinhDaiDien = model.Images.FirstOrDefault(it => it.HinhDaiDien == true).Url;
            }
            catch
            {
            }
            if (model.Images.Count > 1)
            {
                // ViewBag.UrlImage = db.dl_configs.FirstOrDefault(it=>it.con_key == "Danhland").con_value +""+ Url.Action("Index", "ShowImages", new { IdCanHo = HashPassword.Encrypt(id.ToString()), Time = HashPassword.Encrypt(DateTime.Now.ToString("MM/dd/yyyy HH:mm")) }) ;
                ViewBag.UrlImage = Url.Action("Index", "ShowImages", new { IdCanHo = HashPassword.Encrypt(id.ToString()), Time = HashPassword.Encrypt(DateTime.Now.ToString("MM/dd/yyyy HH:mm")) });
                ViewBag.Web = db.dl_configs.FirstOrDefault(it => it.con_key == "Danhland").con_value;
            }
            else
            {
                ViewBag.UrlImage = "#";
            }

            return View(model);
        }
        public List<GhiChu> LoadGhiChu(long IDCanHo)
        {
            return db.dl_canho_ghichu.Where(it => it.canho == IDCanHo).Select(it => new GhiChu
            {
                id_ghichu = it.id_ghichu,
                canho = it.canho,
                noidung = it.noidung,
                ThoiGian = it.ngaynhap.ToString(),
                TenLoai = it.nhom_nguoidung.Value == 1 ? "Admin" : it.nhom_nguoidung.Value
            == 2 ? "Manager" : "SALE",
                nhom_nguoidung = it.nhom_nguoidung
            }).ToList();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,9=1")]
        public async Task<JsonResult> AnCanHo(long id)
        {
            
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            if (!User.IsInRole("1=1"))
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                var checkCanHo = db.dl_canho_giohangsalesman.Where(it => it.IDCanHo == id && it.NguoiDung == nguoidung.NguoiDung).ToList();
                if (checkCanHo.Count == 0)
                {
                    rs.rs_code = 0;
                    rs.rs_text = "Bạn không có quền xóa căn hộ này ";
                    return Json(rs, JsonRequestBehavior.AllowGet);
                }
            }
            try
            {
                var nguoiDung = Users.GetNguoiDung(User.Identity.Name);
                var del = db.dl_canho.FirstOrDefault(it => it.IDCanHo == id);
                if (del != null)
                {
                    del.Del = true;
                    del.NguoiDungDel = nguoiDung.NguoiDung;
                    del.NgayDel = DateTime.Now;
                    dl_historys hst = new dl_historys();
                    hst.Key = id.ToString();
                    hst.TableName = "dl_canho";
                    hst.Type = "Xóa căn hộ";
                    hst.Content = Logchange.Insert(del, "dl_canho");
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoiDung.NguoiDung;
                    hst.LinkView = "#";
                    Logchange.SaveLogChange(db, hst);
                    db.SaveChanges();
                    rs.rs_code = 1;
                    rs.rs_text = "Thành cônng";
                }

            }
            catch (Exception ex)
            {

                rs.rs_text = ex.Message.ToString();
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        #region phân giỏ hàng
        [RoleAuthorize(Roles = "0=0,4=1")]
        public async Task<ActionResult> PhanGioHangChoSale()
        {
            var NguoiDung = db.v_users.ToList();
            ViewBag.NguoiDung = NguoiDung;
            return View();
        }
        public JsonResult GetPhanGioHangChoSale()
        {
            db.Database.CommandTimeout = 3600;
            var model = db.v_canho_giohang.ToList();
            var json = Json(model, JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,4=1")]
        public async Task<JsonResult> PhanGioHangChoSaleSubmit(List<decimal> NguoiDung, List<long> CanHo)
        {
            ResponseStatus rs = new ResponseStatus();
            var user = Users.GetNguoiDung(User.Identity.Name);
            rs.rs_code = 0;
            var dataCheck = db.dl_canho_giohangsalesman.ToList();
            using (var tran = new TransactionScope())
            {
                try
                {
                    List<dl_canho_giohangsalesman> addList = new List<dl_canho_giohangsalesman>();
                 
                    var date = DateTime.Now;
                    List<dl_historys> hst = new List<dl_historys>();
                    var NhanVien = db.wp_users.Select(it => new { it.ID, it.display_name }).ToList();
                    foreach (var item in NguoiDung)
                    {

                        var checkCanHo = dataCheck.Where(it => it.NguoiDung == item).ToList();
                        //if (checkCanHo.Count > 0)
                        //{
                        //    var dataInsert = CanHo.Where(it => checkCanHo.Select(j => j.IDCanHo).Contains(it) == false).ToList();
                        //    dataInsert.ForEach(ch => addList.Add(new dl_canho_giohangsalesman { IDCanHo = ch, NguoiDung = item, NgayPhan = date, NguoiPhan = user.NguoiDung, Del = false }));
                        //}
                        //else
                        //{
                        //    CanHo.ForEach(ch => addList.Add(new dl_canho_giohangsalesman { IDCanHo = ch, NguoiDung = item, NgayPhan = date, NguoiPhan = user.NguoiDung, Del = false }));
                        //}
                        if (checkCanHo.Count > 0)
                        {

                            foreach (var ch in CanHo)
                            {
                                if (checkCanHo.Where(it => it.IDCanHo == (long)ch).ToList().Count == 0)
                                {
                                    addList.Add(new dl_canho_giohangsalesman { IDCanHo = ch, NguoiDung = item, NgayPhan = date, NguoiPhan = user.NguoiDung, Del = false });
                                }
                            }
                            dl_historys hstItem = new dl_historys();
                            hstItem.Key = item.ToString();
                            hstItem.Ngay = DateTime.Now;
                            hstItem.NguoiDung = user.NguoiDung;
                            hstItem.TableName = "dl_canho_giohangsalesman";
                            hstItem.Type = "Phân giỏ hàng salesman";
                            hstItem.Content = user.TenHienThi + " Phân id căn hộ (" + string.Join(",", CanHo.Select(it => it.ToString())) + ") cho " + NhanVien.FirstOrDefault(it => it.ID == item).display_name;
                            hstItem.LinkView = "#";
                            hst.Add(hstItem);
                            //  checkCanHo.All(it => { it.Del = false; it.NguoiDung = item; it.NgayPhan = date; it.NguoiPhan = user.NguoiDung; it.Del = false; return true; });
                        }
                        else
                        {
                            dl_historys hstItem = new dl_historys();
                            hstItem.Key = item.ToString();
                            hstItem.Ngay = DateTime.Now;
                            hstItem.NguoiDung = user.NguoiDung;
                            hstItem.TableName = "dl_canho_giohangsalesman";
                            hstItem.Type = "Phân giỏ hàng salesman";
                            hstItem.Content = user.TenHienThi + " Phân id căn hộ (" + string.Join(",", CanHo.Select(it => it.ToString())) + ") cho " + NhanVien.FirstOrDefault(it => it.ID == item).display_name;
                            hstItem.LinkView = "#";
                            hst.Add(hstItem);
                            CanHo.ForEach(ch => addList.Add(new dl_canho_giohangsalesman { IDCanHo = ch, NguoiDung = item, NgayPhan = date, NguoiPhan = user.NguoiDung, Del = false }));
                        }
                      
                    }
                    if (addList.Count > 0)
                    {
                        db.dl_canho_giohangsalesman.AddRange(addList);
                        Logchange.SaveLogChangeList(db, hst);
                       
                    }
                    int i= db.SaveChanges();
                    tran.Complete();

                    if (i > 0)
                    {
                        rs.rs_code = 1;
                        rs.rs_text = "Thành công";
                    }
                    else
                    {
                        rs.rs_code = 0;
                        rs.rs_text = "Không có dữ liệu cập nhật";
                    }
                    return Json(rs, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    rs.rs_text = ex.Message;
                    return Json(rs, JsonRequestBehavior.AllowGet);
                }
            }

        }
        [RoleAuthorize(Roles = "0=0,4=1")]
        public async Task<JsonResult> TimCanHoPhanGioHang(double? DienTich, double? GiaBan, double? GiaThue, double? GiaBanUSD, double? GiaThueUSD)
        {
            DienTich = DienTich == null ? 0 : DienTich;
            GiaBan = GiaBan == null ? 0 : GiaBan;
            GiaThue = GiaThue == null ? 0 : GiaThue;
            GiaBanUSD = GiaBanUSD == null ? 0 : GiaBanUSD;
            GiaThueUSD = GiaThueUSD == null ? 0 : GiaThueUSD;
            string sql = "CALL proc_canho_giohang(" + DienTich + "," + GiaBan + "," + GiaThue + "," + GiaBanUSD + "," + GiaThueUSD + ")";
            var model = db.Database.SqlQuery<v_canho_giohang>(sql).ToList();
            var rs = Json(model, JsonRequestBehavior.AllowGet);
            rs.MaxJsonLength = int.MaxValue;
            return rs;
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<JsonResult> XoaPhanGioHangChoSaleSubmit(List<decimal> NguoiDung, List<long> CanHo)
        {
            ResponseStatus rs = new ResponseStatus();
            var user = Users.GetNguoiDung(User.Identity.Name);
            rs.rs_code = 0;
            var dataCheck = db.dl_canho_giohangsalesman.ToList();
            TimeSpan time = new TimeSpan(0, 30, 0);
     
            using (var tran = new TransactionScope(TransactionScopeOption.RequiresNew,time))
            {

                try
                {

                    foreach (var nguoidung in NguoiDung)
                    {
                        var canhoNguoiDung = dataCheck.Where(it => it.NguoiDung == nguoidung && CanHo.Contains(it.IDCanHo.Value)).ToList();
                        if (canhoNguoiDung.Count > 0)
                        {
                            // canhoNguoiDung.All(it => { it.Del = true; return true; });
                            db.dl_canho_giohangsalesman.RemoveRange(canhoNguoiDung);
                        }
                        
                    }
                    int stt = db.SaveChanges();
                    rs.rs_code = 1;
                    tran.Complete();
                    return Json(rs, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    rs.rs_text = ex.InnerException.Message;
                    return Json(rs, JsonRequestBehavior.AllowGet);
                }
            }

        }
        #endregion
        public ActionResult ImportExcel()
        {
            var model = new ImportCanHo();
            return View(model);
        }
        public async Task<FileResult> XuatFileMau()
        {
            string filename = Server.MapPath("~/Content/upload/filemau/sample-upload.xlsx");
            return File(filename, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "sample-upload.xlsx");
        }

        // [RoleAuthorize(Roles = "0,3=2")]

        [HttpPost]
        public async Task<JsonResult> ImportFileExcel(HttpPostedFileBase importFile)
        {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            rs.rs_text = "Thất bại";
            int dong = 0;
            try
            {
                if (importFile != null && importFile.ContentLength > 0 && (Path.GetExtension(importFile.FileName).Equals(".xlsx")))
                {
                    string fileName = importFile.FileName;
                    fileName = User.Identity.Name + "_" + fileName;
                    string UploadDirectory = Server.MapPath("~/Content/temps/excel/");
                    bool folderExists = System.IO.Directory.Exists(UploadDirectory);
                    if (!folderExists)
                        System.IO.Directory.CreateDirectory(UploadDirectory);
                    string resultFilePath = UploadDirectory + fileName;
                    importFile.SaveAs(resultFilePath);
                    List<ImportCanHo> model = getDataTableFromExcel(resultFilePath, ref dong);
                    rs.rs_data = model;
                    rs.rs_code = 1;
                    FileInfo fDel = new FileInfo(resultFilePath);
                    fDel.Delete();
                }
            }
            catch (Exception ex)
            {
                rs.rs_text = ex.Message + "dòng " + dong.ToString();
            }
            var json = Json(rs, JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;
        }
        public List<ImportCanHo> getDataTableFromExcel(string path, ref int sError)
        {
            string nameSession = User.Identity.Name + "Import";
            if (Session[nameSession] != null)
            {
                Session.Remove(nameSession);
            }
            List<ImportCanHo> data = new List<ImportCanHo>();

            using (XLWorkbook workBook = new XLWorkbook(path))
            {
                IXLWorksheet workSheet = workBook.Worksheet(1);
                bool firstRow = true;
                int i = 1; string sLoi = "";
                string sTem = "", sDonVi = "";
                var TinhTrangCanHo = db.dl_dm_tinhtrangcanho.ToList();
                string[] swhere = new string[4] { "huong", "trang-thai", "loai", "loai-ban-giao" };
                var terms = (from term in db.wp_terms
                             join taxonomy in db.wp_term_taxonomy on term.term_id equals taxonomy.term_id
                             where swhere.Contains(taxonomy.taxonomy) && term.name != "0"
                             select new { taxonomy.term_id, taxonomy.term_taxonomy_id, term.name }).ToList();
                var duan = db.dl_duan.ToList();

                foreach (IXLRow row in workSheet.Rows())
                {
                    sError = i;
                    sLoi = "";
                    ImportCanHo add = new ImportCanHo();
                    if (row.Cell(1).Value.ToString() == "")
                        break;
                    if (firstRow)
                    {
                        firstRow = false;
                        continue;
                    }
                    else
                    {
                        add.IDCanHo = i;
                        sTem = row.Cell(1).Value.ToString().Trim();
                        add.DuAn = sTem;
                        var checkduan = duan.FirstOrDefault(it => it.ma_duan == sTem);
                        if (checkduan == null)
                        {
                            sLoi += ";Mã dự án chưa tồn tại";
                        }
                        else
                            add.IDDuAn = checkduan.duan;

                        add.Thap = row.Cell(2).Value.ToString().Trim();
                        add.Tang = row.Cell(3).Value.ToString().Trim();
                        add.SoCan = row.Cell(4).Value.ToString().Trim();
                        add.TenChuNha = row.Cell(5).Value.ToString().Trim();
                        add.LienHe = row.Cell(6).Value.ToString().Trim();
                        sTem = row.Cell(7).Value.ToString().Trim();
                        add.TinhTrang = sTem;
                        if (sTem != "")
                        {
                            var check1 = TinhTrangCanHo.FirstOrDefault(it => it.tentinhtrangcanho.Trim().ToLower() == sTem.ToLower());
                            if (check1 == null)
                                sLoi += ";Tình trạng căn hộ không tồn tại";
                            else
                                add.IDTinhTrangCH = check1.tinhtrangcanho;
                        }
                        else
                        {
                            add.IDTinhTrangCH = 13;
                        }
                        sTem = row.Cell(8).Value.ToString().Trim();
                        add.LoaiCanHo = sTem;
                        var check = terms.FirstOrDefault(it => it.name.ToLower() == sTem.ToLower());
                        // add.IDLoaiCanHo = check != null ? check.term_id : 211;
                        if (check != null)
                        {
                            add.IDLoaiCanHo = check.term_id;
                        }
                        else
                        {
                            sLoi += ";Loại không tồn tại";
                        }

                        add.PhongNgu = row.Cell(9).Value.ToString().Trim();
                        add.WC = row.Cell(10).Value.ToString().Trim();
                        sTem = row.Cell(11).Value.ToString().Trim();
                        add.DienTichS = sTem;
                        try
                        {
                            if (sTem.Length > 0)
                            {
                                add.DienTich = Convert.ToDouble(row.Cell(11).Value.ToString().Trim());
                            }
                            else
                            {
                                add.DienTich = null;
                            }
                        }
                        catch
                        {
                           
                            sLoi += ";Cột diện tích không hợp lệ ";
                        }
                        add.VIEW = row.Cell(12).Value.ToString().Trim();
                        sTem = row.Cell(13).Value.ToString().Trim();
                        add.HuongCua = sTem;
                        add.IDHuongCua = check != null ? check.term_id : 211;
                        if (sTem != "")
                        {
                            check = terms.FirstOrDefault(it => it.name.Trim().ToLower() == sTem.ToLower());
                            if (check != null)
                            {
                                add.IDHuongCua = check.term_id;
                            }
                            else
                            {
                                add.IDHuongCua = null;
                            }
                        }
                        
                       
                        sTem = row.Cell(14).Value.ToString().Trim();
                        add.HuongBanCong = sTem;
                        if (sTem != "")
                        {
                            check = terms.FirstOrDefault(it => it.name.Trim().ToLower() == sTem.ToLower());
                            if (check == null)
                            {
                                add.IDHuongBanCong = null;
                                sLoi += ";Cột hướng ban công dữ liệu không tìm thấy";
                            }
                            else
                                add.IDHuongBanCong = check.term_id;
                        }

                        sTem = row.Cell(15).Value.ToString().Trim();
                        add.LoaiBanGiao = sTem;
                        check = terms.FirstOrDefault(it => it.name.Trim().ToLower() == sTem.ToLower());

                        if (check != null )
                        {
                            add.IDLoaiBanGiao = check.term_id;
                        }
        
                        add.MatKhauCua = row.Cell(16).Value.ToString().Trim();
                        sTem = row.Cell(17).Value.ToString().Trim();
                        add.GiaGoc = sTem;
                        if (sTem != "")
                        {
                            sDonVi = checkDonGia(sTem);
                            if (sDonVi != "")
                            {
                                add.GiaGocDVT = sDonVi;
                                try
                                {
                                    add.TienGiaGoc = double.Parse(sTem.ToLower().Replace("tỷ", "").Replace("triệu", "").Trim());
                                }
                                catch
                                {
                                    sLoi += ";Tiền giá góc không hợp lệ";
                                }

                            }
                            else
                            {
                                sLoi += ";Đơn giá bán trong cột giá góc không hợp lệ";
                            }
                        }

                        sTem = row.Cell(18).Value.ToString().Trim();
                        add.GiaGocUSDS = sTem;
                        if (sTem != "")
                        {
                            try
                            {
                                add.GiaGocUSD = Convert.ToDouble(sTem.Replace("$", "").Trim());
                            }
                            catch
                            {
                                sLoi += "Cột giá góc USD không hợp lệ ";
                            }
                        }
                        sTem = row.Cell(19).Value.ToString().Trim();
                        add.GiaChuNhaGui = sTem;
                        if (sTem != "")
                        {
                            sDonVi = checkDonGia(sTem);
                            if (sDonVi != "")
                            {
                                try
                                {
                                    add.TienGiaChuNhaGui = double.Parse(sTem.ToLower().Replace("tỷ", "").Replace("triệu", "").Trim());
                                }
                                catch
                                {
                                    sLoi += ";Tiền giá chủ nhà gửi không hợp lệ";
                                }
                                add.GiaChuNhaGuiDVT = sDonVi;
                            }
                            else
                            {
                                sLoi += ";Đơn giá trong cột giá chủ nhà gửi  không hợp lệ";
                            }
                        }
                        sTem = row.Cell(20).Value.ToString().Trim();
                        add.GiaChuNhaGuiUSDS = sTem;
                        if (sTem != "")
                        {
                            try
                            {
                                add.GiaChuNhaGuiUSD = Convert.ToDouble(sTem.Replace("$", "").Trim());
                            }
                            catch
                            {
                                sLoi += "Cột giá chủ nhà gửi USD không hợp lệ ";
                            }
                        }
                        sTem = row.Cell(21).Value.ToString().Trim();
                        add.GiaChotBan = sTem;
                        if (sTem != "")
                        {
                            sDonVi = checkDonGia(sTem);
                            if (sDonVi != "")
                            {
                                add.GiaChotBanDVT = sDonVi;
                                try
                                {
                                    add.TienGiaChotBan = double.Parse(sTem.ToLower().Replace("tỷ", "").Replace("triệu", "").Trim());
                                }
                                catch
                                {
                                    sLoi += ";Tiền giá chốt bán không hợp lệ";
                                }
                            }
                            else
                            {
                                sLoi += ";Đơn giá  trong cột giá chốt bán  không hợp lệ";
                            }
                        }
                        sTem = row.Cell(22).Value.ToString().Trim();
                        add.GiaChotBanUSDS = sTem;
                        if (sTem != "")
                        {
                            try
                            {
                                add.GiaChotBanUSD = Convert.ToDouble(sTem.Replace("$", "").Trim());
                            }
                            catch
                            {
                                sLoi += "Cột giá chốt bán USD không hợp lệ ";
                            }
                        }
                        sTem = row.Cell(23).Value.ToString().Trim();
                        add.GiaBan = sTem;
                        if (sTem != "")
                        {
                            sDonVi = checkDonGia(sTem);
                            if (sDonVi != "")
                            {
                                add.GiaBanDVT = sDonVi;
                                try
                                {
                                    add.TienGiaBan = double.Parse(sTem.ToLower().Replace("tỷ", "").Replace("triệu", "").Trim());
                                }
                                catch
                                {
                                    sLoi += ";Tiền giá bán không hợp lệ";
                                }
                            }
                            else
                            {
                                sLoi += ";Đơn giá  trong cột giá bán không hợp lệ";
                            }
                        }
                        sTem = row.Cell(24).Value.ToString().Trim();
                        add.GiaBanUSDS = sTem;
                        if (sTem != "")
                        {
                            try
                            {
                                add.GiaBanUSD = Convert.ToDouble(sTem.Replace("$", "").Trim());
                            }
                            catch
                            {
                                sLoi += "Cột giá bán USD không hợp lệ ";
                            }
                        }
                        sTem = row.Cell(25).Value.ToString().Trim();
                        add.GiaThue = sTem;
                        if (sTem != "")
                        {
                            sDonVi = checkDonGia(sTem);
                            if (sDonVi != "")
                            {
                                add.GiaThueDVT = sDonVi;
                                try
                                {
                                    add.TienGiaThue = double.Parse(sTem.ToLower().Replace("tỷ", "").Replace("triệu", "").Trim());
                                }
                                catch
                                {
                                    sLoi += ";Tiền giá thuê không hợp lệ";
                                }
                            }
                            else
                            {
                                sLoi += ";Đơn giá  trong cột giá thuê không hợp lệ";
                            }
                        }
                        sTem = row.Cell(26).Value.ToString().Replace("$", "").Trim();
                        add.GiaThueUSDS = sTem;
                        if (sTem != "")
                        {
                            try
                            {
                                add.GiaThueUSD = Convert.ToDouble(sTem.Replace("$", "").Trim());
                            }
                            catch
                            {
                                sLoi += "Cột giá thuê USD không hợp lệ ";
                            }
                        }
                        sTem = row.Cell(27).Value.ToString().Trim();
                        add.GiaThueBaoPhi = sTem;
                        if (sTem != "")
                        {
                            sDonVi = checkDonGia(sTem);
                            if (sDonVi != "")
                            {
                                add.GiaThueBaoPhiDVT = sDonVi;
                                try
                                {
                                    add.TienGiaThueBaoPhi = double.Parse(sTem.ToLower().Replace("tỷ", "").Replace("triệu", "").Trim());
                                }
                                catch
                                {
                                    sLoi += ";Tiền giá thuê bao phí không hợp lệ";
                                }
                            }
                            else
                            {
                                sLoi += ";Đơn giá  trong cột giá thuê bao phí không hợp lệ";
                            }
                        }
                        sTem = row.Cell(28).Value.ToString().Trim();
                        add.GiaThueBaoPhiUSDS = sTem;
                        if (sTem != "")
                        {
                            try
                            {
                                add.GiaThueBaoPhiUSD = Convert.ToDouble(sTem.Replace("$", "").Trim());
                            }
                            catch
                            {
                                sLoi += "Cột giá thuê bao phí USD không hợp lệ ";
                            }
                        }
                        add.GhiChuAdmin = row.Cell(29).Value.ToString().Trim();
                        add.GhiChuQuanLy = row.Cell(30).Value.ToString().Trim();
                        add.GhiChuSales = row.Cell(31).Value.ToString().Trim();
                        add.QuocTich = row.Cell(32).Value.ToString().Trim();
                        add.Loi = sLoi;
                        data.Add(add);
                        i++;
                    }
                }
            }
            //ViewBag.HopLe = "Dữ liệu hợp lệ " + data.Where(it => it.Loi == "").Count().ToString();
            // ViewBag.Loi = "Dữ liệu không hợp lệ " + data.Where(it => it.Loi != "").Count().ToString();
            Session[nameSession] = data.Where(it => it.Loi == "").ToList();
            return data;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> AddImportFileExcel( )
        {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;

            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                using (var tran = new TransactionScope())
                {
                    db.Database.CommandTimeout = 36000;
                    string nameSession = User.Identity.Name + "Import";

                    if (Session[nameSession] == null)
                    {
                        rs.rs_text = "Không có dữ liệu cập nhật";
                        return Json(rs, JsonRequestBehavior.AllowGet);
                    }
                    var dataCanHo = db.dl_canho.ToList();
                    List<ImportCanHo> CanHo = (List<ImportCanHo>)Session[nameSession];
                    List<dl_canho> checkCH;

                    List<dl_canho_temp> listAdd = new List<dl_canho_temp>();
                    DateTime temp = DateTime.Now;
                    foreach (var item in CanHo)
                    {
                        checkCH = dataCanHo.Where(it => it.IDDuAn == item.IDDuAn && it.Thap.ToLower().Trim() == item.Thap.ToString().ToLower()
                                                        && it.Tang.Trim().ToLower() == item.Tang.ToLower() && it.SoCan.ToLower().Trim() == item.SoCan.ToLower().Trim()).ToList();
                        if (checkCH.Count > 0)
                            continue;
                        dl_canho_temp add = new dl_canho_temp();
                        add.TenChuNha = item.TenChuNha;
                        add.QuocTich = item.QuocTich;
                        add.LienHe = item.LienHe;
                        add.IDDuAn = item.IDDuAn;
                        add.Thap = item.Thap;
                        add.Tang = item.Tang;
                        add.SoCan = item.SoCan;
                        add.DienTich = item.DienTich;
                        add.IDHuongCua = item.IDHuongCua;
                        add.IDHuongBanCong = item.IDHuongBanCong;
                        add.PhongNgu = item.PhongNgu;
                        add.WC = item.WC;
                        add.VIEW = item.VIEW;
                        add.IDTinhTrangCH = item.IDTinhTrangCH;
                        add.IDLoaiCanHo = item.IDLoaiCanHo;
                        add.IDLoaiBanGiao = item.IDLoaiBanGiao;
                        add.MatKhauCua = item.MatKhauCua;
                        add.TienGiaChuNhaGui = item.TienGiaChuNhaGui;
                        add.GiaChuNhaGuiDVT = item.GiaChuNhaGuiDVT;
                        add.GiaChuNhaGuiUSD = item.GiaChuNhaGuiUSD;
                        add.TienGiaChotBan = item.TienGiaChotBan;
                        add.GiaChotBanDVT = item.GiaChotBanDVT;
                        add.GiaChotBanUSD = item.GiaChotBanUSD;
                        add.TienGiaGoc = item.TienGiaGoc;
                        add.GiaGocDVT = item.GiaGocDVT;
                        add.GiaGocUSD = item.GiaGocUSD;
                        add.TienGiaBan = item.TienGiaBan;
                        add.GiaBanDVT = item.GiaBanDVT;
                        add.GiaBanUSD = item.GiaBanUSD;
                        add.TienGiaThue = item.TienGiaThue;
                        add.GiaThueDVT = item.GiaThueDVT;
                        add.GiaThueUSD = item.GiaThueUSD;
                        add.TienGiaThueBaoPhi = item.TienGiaThueBaoPhi;
                        add.GiaThueBaoPhiDVT = item.GiaThueBaoPhiDVT;
                        add.GiaThueBaoPhiUSD = item.GiaThueBaoPhiUSD;
                        add.GhiChuAdmin = item.GhiChuAdmin;
                        add.GhiChuQuanLy = item.GhiChuQuanLy;
                        add.GhiChuSales = item.GhiChuSales;
                        add.NguoiDungTao = nguoidung.NguoiDung;
                        add.NgayTao = temp;
                        listAdd.Add(add);
                    }
                    if (listAdd.Count > 0)
                    {
                        var del = db.dl_canho_temp.Where(it => it.NguoiDungTao == nguoidung.NguoiDung).ToList();
                        db.dl_canho_temp.RemoveRange(del);
                        db.dl_canho_temp.AddRange(listAdd);
                        //await db.SaveChangesAsync();
                        //tran.Complete();
                        //tran.Dispose();
                        db.Database.CommandTimeout = 3600;
                        if (await db.SaveChangesAsync() > 0)
                        {
                            tran.Complete();
                            tran.Dispose();

                            int sq = db.Database.SqlQuery<int>("CALL proc_importcanho({0});", nguoidung.NguoiDung).FirstOrDefault();
                            // string sq = "Thành công";
                            if (sq > 0)
                            {
                                rs.rs_code = 1;
                                rs.rs_text = "Thành công";
                            }
                            else
                            {
                                rs.rs_code = 0;
                                rs.rs_text = "Thất bại liên hệ nhà quản trị để biết thêm thông tin";
                            }
                            
                            dl_historys hst = new dl_historys();
                            hst.Key = nguoidung.NguoiDung.ToString();
                            hst.TableName = "dl_canho";
                            hst.Type = "Import căn hộ từ excel";
                            hst.Ngay = DateTime.Now;
                            hst.NguoiDung = nguoidung.NguoiDung;
                            hst.Content =  "Cập nhật thành công " +sq.ToString();
                            hst.LinkView = "#";
                            Logchange.SaveLogChange(db, hst);
                            db.SaveChanges();
                            //rs.rs_text = "Không có dữ liệu cập nhật";
                        }

                    }
                    else
                    {
                        rs.rs_code = 1;
                        rs.rs_text = "Không có dữ liệu cập nhật";
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
                rs.rs_code = 0;
                rs.rs_text = sb.ToString();
            }
            catch (Exception ex)
            {
                rs.rs_code = 0;
                rs.rs_text = ex.Message;
            }
            #region code cu

            //try
            //{
            //    var dataCanHo = db.dl_canho.Where(it=>it.Del !=true).ToList();
            //    long idChuNha = 0;
            //    TransactionScopeOption otp = new TransactionScopeOption();
            //    TimeSpan timeout = new TimeSpan(0, 30, 0);
            //    using (var tran = new TransactionScope(otp, timeout))
            //    {
            //        db.Database.CommandTimeout = 3600;
            //        var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            //        string nameSession = User.Identity.Name + "Import";

            //        if (Session[nameSession] == null)
            //        {
            //            rs.rs_text = "Không có dữ liệu cập nhật";
            //            return Json(rs, JsonRequestBehavior.AllowGet);
            //        }
            //        List<ImportCanHo> CanHo = (List<ImportCanHo>)Session[nameSession];

            //        List<dl_canho> checkCH; int iBoQua = 0, iCapNhat = 0; ;
            //        foreach (var item in CanHo)
            //        {
            //            checkCH = dataCanHo.Where(it => it.IDDuAn == item.IDDuAn && it.Thap.ToLower().Trim() == item.Thap.ToString().ToLower()
            //                                      && it.Tang.Trim().ToLower() == item.Tang.ToLower() && it.SoCan.ToLower().Trim() == item.SoCan.ToLower().Trim()).ToList();
            //            if (checkCH.Count > 0)
            //            {
            //                iBoQua++;
            //                continue;
            //            }

            //            dl_dm_chunha adchunha = new dl_dm_chunha();
            //            adchunha.NgayTao = DateTime.Now;
            //            adchunha.TenChuNha = item.TenChuNha;
            //            adchunha.QuocTich = item.QuocTich;

            //            adchunha.Del = false;
            //            adchunha.NguoiDungTao = (int)nguoidung.NguoiDung;
            //            db.dl_dm_chunha.Add(adchunha);
            //            if (await db.SaveChangesAsync() > 0)
            //            {
            //                // idChuNha = db.dl_dm_chunha.Where(it => it.NguoiDungTao == adchunha.NguoiDungTao).Max(it => it.IdChuNha);
            //                dl_dm_chunha_chitiet addChuNhaCT = new dl_dm_chunha_chitiet();
            //                addChuNhaCT.IdChuNha = adchunha.IdChuNha;
            //                addChuNhaCT.Ten = item.LienHe;
            //                db.dl_dm_chunha_chitiet.Add(addChuNhaCT);

            //                dl_canho addCanHo = new dl_canho();
            //                addCanHo.IDChuNha = idChuNha;
            //                addCanHo.IDDuAn = item.IDDuAn;
            //                addCanHo.Thap = item.Thap;
            //                addCanHo.Tang = item.Tang;
            //                addCanHo.SoCan = item.SoCan;
            //                addCanHo.DienTich = item.DienTich;
            //                addCanHo.HuongCua = item.IDHuongCua;
            //                addCanHo.HuongBanCong = item.IDHuongBanCong;
            //                addCanHo.PhongNgu = item.PhongNgu;
            //                addCanHo.WC = item.WC;
            //                addCanHo.View = item.VIEW;
            //                addCanHo.IDTinhTrangCH = item.IDTinhTrangCH;
            //                addCanHo.IDLoaiCanHo = (long)item.IDLoaiCanHo;
            //                addCanHo.IDLoaiBanGiao = item.IDLoaiBanGiao;
            //                //addCanHo.VideoLink = item.VideoLink;
            //                addCanHo.MatKhauCua = item.MatKhauCua;
            //                //addCanHo.GiaHopDong = item.Tiengia;
            //                //addCanHo.GiaHopDongDVT = item.GiaHopDongDVT;
            //                addCanHo.GiaChuNhaGui = item.TienGiaChuNhaGui;
            //                addCanHo.GiaChuNhaGuiDVT = item.GiaChuNhaGuiDVT;
            //                addCanHo.GiaChuNhaGuiUSD = item.GiaChuNhaGuiUSD;

            //                addCanHo.GiaChotBan = item.TienGiaChotBan;
            //                addCanHo.GiaChotBanDVT = item.GiaChotBanDVT;
            //                addCanHo.GiaChotBanUSD = item.GiaChotBanUSD;

            //                addCanHo.GiaGoc = item.TienGiaGoc;
            //                addCanHo.GiaGocDVT = item.GiaGocDVT;
            //                addCanHo.GiaGocUSD = item.GiaGocUSD;

            //                addCanHo.GiaBan = item.TienGiaBan;
            //                addCanHo.GIaBanDVT = item.GiaBanDVT;
            //                addCanHo.GiaBanUSD = item.GiaBanUSD;

            //                addCanHo.GiaThueNet = item.TienGiaThue;
            //                addCanHo.GiaThueNetDVT = item.GiaThueDVT;
            //                addCanHo.GiaThueNetUSD = item.GiaThueUSD;

            //                addCanHo.GiaThueBaoPhi = item.TienGiaThueBaoPhi;
            //                addCanHo.GIaThueBaoPhiDVT = item.GiaThueBaoPhiDVT;
            //                addCanHo.GiaThueBaoPhiUSD = item.GiaThueBaoPhiUSD;

            //                addCanHo.GhiChuAdmin = item.GhiChuAdmin;
            //                addCanHo.GhiChuQuanLy = item.GhiChuQuanLy;
            //                addCanHo.GhiChuSales = item.GhiChuSales;
            //                addCanHo.NguoiDungTao = (int)nguoidung.NguoiDung;
            //                addCanHo.NgayTao = DateTime.Now;
            //                db.dl_canho.Add(addCanHo);
            //                if (await db.SaveChangesAsync() > 0)
            //                {
            //                    // idCanHo = (long)db.dl_canho.Where(it => it.NguoiDungTao == addCanHo.NguoiDungTao).ToList().Max(it => it.IDCanHo);
            //                    // add lich su chu nha
            //                    var lsChuNha = new dl_canho_chunha();
            //                    lsChuNha.IdCanho = (long)addCanHo.IDCanHo;
            //                    lsChuNha.IdChuNha = idChuNha;
            //                    lsChuNha.IdNguoiDung = (long)nguoidung.NguoiDung;
            //                    lsChuNha.Ngay = DateTime.Now;
            //                    db.dl_canho_chunha.Add(lsChuNha);
            //                    var lsGia = new dl_canho_lichsugia();
            //                    lsGia.IDCanHo = (long)addCanHo.IDCanHo;
            //                    string sTemp = "";
            //                    if (addCanHo.GiaChuNhaGui != null && addCanHo.GiaChuNhaGui > 0)
            //                    {
            //                        sTemp = addCanHo.GiaChuNhaGui.ToString() + " " + addCanHo.GiaChuNhaGuiDVT;
            //                    }
            //                    if (addCanHo.GiaChuNhaGuiUSD != null && addCanHo.GiaChuNhaGuiUSD > 0)
            //                    {
            //                        sTemp = sTemp + ";" + addCanHo.GiaChuNhaGuiUSD.ToString() + " USD";
            //                    }
            //                    lsGia.GiaChuNhaGui = sTemp;

            //                    sTemp = "";
            //                    if (addCanHo.GiaThueNet != null && addCanHo.GiaThueNet > 0)
            //                    {
            //                        sTemp = sTemp + addCanHo.GiaThueNet.ToString() + " " + addCanHo.GiaThueNetDVT;
            //                    }
            //                    if (addCanHo.GiaThueNetUSD != null && addCanHo.GiaThueNetUSD > 0)
            //                    {
            //                        sTemp = sTemp + ";" + addCanHo.GiaThueNetUSD.ToString() + " USD";
            //                    }

            //                    if (addCanHo.GiaThueBaoPhi != null && addCanHo.GiaThueBaoPhi > 0)
            //                    {
            //                        sTemp = sTemp + ";" + addCanHo.GiaThueBaoPhi.ToString() + " " + addCanHo.GIaThueBaoPhiDVT;
            //                    }
            //                    if (addCanHo.GiaThueBaoPhiUSD != null && addCanHo.GiaThueBaoPhiUSD > 0)
            //                    {
            //                        sTemp = sTemp + ";" + addCanHo.GiaThueBaoPhiUSD.ToString() + " USD";
            //                    }
            //                    lsGia.GiaThue = sTemp;

            //                    sTemp = "";
            //                    if (addCanHo.GiaChaoBan != null && addCanHo.GiaChaoBan > 0)
            //                    {
            //                        sTemp = addCanHo.GiaChaoBan.ToString() + " " + addCanHo.GiaChaoBanDVT;
            //                    }
            //                    if (addCanHo.GiaChaoBanUSD != null && addCanHo.GiaChaoBanUSD > 0)
            //                    {
            //                        sTemp = sTemp + ";" + addCanHo.GiaChaoBanUSD.ToString() + " USD";
            //                    }
            //                    lsGia.GiaChaoBan = sTemp;

            //                    sTemp = "";
            //                    if (item.GiaChotBan != null && addCanHo.GiaChotBan > 0)
            //                    {
            //                        sTemp = item.GiaChotBan.ToString() + " " + item.GiaChotBanDVT;
            //                    }
            //                    if (item.GiaChotBanUSD != null && item.GiaChotBanUSD > 0)
            //                    {
            //                        sTemp = sTemp + ";" + item.GiaChotBanUSD.ToString() + " USD";
            //                    }
            //                    lsGia.GiaChotBan = sTemp;
            //                    lsGia.NguoiDungTao = nguoidung.NguoiDung;
            //                    lsGia.NgayTao = DateTime.Now;
            //                    db.dl_canho_lichsugia.Add(lsGia);
            //                    iCapNhat++;
            //                }
            //            }
            //        }
            //        int s = db.SaveChanges();
            //        tran.Complete();
            //        rs.rs_text = "Thêm thành công " + iCapNhat.ToString() + (iBoQua > 0 ? " Bỏ qua " + iBoQua.ToString() : "");
            //        rs.rs_code = 1;
            //        Session.Remove(nameSession);
            //    }
            //}
            ////catch (Exception ex)
            ////{
            ////    rs.rs_text = ex.Message;
            ////}
            //catch (System.Data.Entity.Validation.DbEntityValidationException ex)
            //{
            //    StringBuilder sb = new StringBuilder();
            //    foreach (var eve in ex.EntityValidationErrors)
            //    {
            //        sb.AppendLine(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
            //                                        eve.Entry.Entity.GetType().Name,
            //                                        eve.Entry.State));
            //        foreach (var ve in eve.ValidationErrors)
            //        {
            //            sb.AppendLine(string.Format("- Property: \"{0}\", Error: \"{1}\"",
            //                                        ve.PropertyName,
            //                                        ve.ErrorMessage));
            //        }
            //    }

            //    rs.rs_text = sb.ToString();
            //}

            #endregion

            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        private string checkDonGia(string check)
        {
            if (check.ToLower().Contains("triệu"))
            {
                return "trieu";
            }
            else if (check.ToLower().Contains("tỷ"))
            {
                return "ty";
            }
            else return "";
        }

        
        public async Task<FileResult> XuatHinhCanHo()
        {
            using (ZipFile zip = new ZipFile())
            {
                zip.AddDirectory(Server.MapPath("~/Content/upload/canho"));
                zip.Save(Server.MapPath("~/Content/upload/temps/canho.zip"));
                return File(Server.MapPath("~/Content/upload/temps/canho.zip"), "canho.zip");
            }
            //    string filename = Server.MapPath("~/Content/upload/filemau/sample-upload.xlsx");
            //return File(filename, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "sample-upload.xlsx");
        }
        public async Task<FileResult> XuatHinhCanHoID(string id)
        {
            using (ZipFile zip = new ZipFile())
            {
                string url = Server.MapPath("~/Content/upload/canho/" + id);
                if (Directory.Exists(url))
                {
                    zip.AddDirectory(url);
                    zip.Save(Server.MapPath("~/Content/upload/temps/" + id + ".zip"));
                    return File(Server.MapPath("~/Content/upload/temps/" + id + ".zip"), "" + id + ".zip");
                }
                else
                    return null;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> XoaHinhTaoMoi(string nameFolder) {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            string url = Server.MapPath("~/Content/upload/temps/imgs/" + nameFolder);
            if (Directory.Exists(url))
            {
                clsFunction fn = new clsFunction();
                var file = fn.GetFile(url, "/Content/upload/temps/imgs/" + nameFolder + "/");
                if (file.Count > 0)
                {
                    foreach (var item in file)
                    {
                        System.IO.File.Delete(url + "/" + item.fileName);
                    }
                    rs.rs_code = 1;
                    rs.rs_text = "Xóa thành công";

                }
                else
                {
                    rs.rs_text = "Chưa up hình không thể xóa";
                }
            }
            else
            {
                rs.rs_text = "Chưa up hình không thể xóa";
            }
                return Json(rs, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> XoaHinhAllEdit(long id)
        {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            string url = Server.MapPath("~/Content/upload/canho/" + id.ToString());
            if (Directory.Exists(url))
            {
                clsFunction fn = new clsFunction();
                var file = fn.GetFile(url, "/Content/upload/canho/" + id.ToString() + "/");
                if (file.Count > 0)
                {
                    foreach (var item in file)
                    {
                        System.IO.File.Delete(url + "/" + item.fileName);
                    }
                    var del = db.dl_canho_images.Where(it => it.IDCanHo == id);
                    db.dl_canho_images.RemoveRange(del);

                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    dl_historys hst = new dl_historys();
                    hst.Key = id.ToString();
                    hst.TableName = "dl_canho_images";
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.Type = "Xóa hình căn hộ";
                    hst.Content = "Xóa  tất cả hình căn hộ ID #" + id.ToString();
                    hst.LinkView = "#";
                    Logchange.SaveLogChange(db, hst);
                    db.SaveChanges();
                    rs.rs_code = 1;
                    rs.rs_text = "Xóa thành công";

                }
                else
                {
                    rs.rs_text = "Chưa up hình không thể xóa";
                }
            }
            else
            {
                rs.rs_text = "Chưa up hình không thể xóa";
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

    }
}