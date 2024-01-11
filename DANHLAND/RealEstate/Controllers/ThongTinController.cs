using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using RealEstate.Entity;
using RealEstate.Libs.Models;
using RealEstate.Libs;
using RealEstate.Libs.Models;
using System.Transactions;
using System.Web.Libs;
using System.Web.Hosting;
using System.Data.Entity;
using System.Text;
using System.Transactions;

namespace RealEstate.Controllers
{
    [RoleAuthorize]
    public class ThongTinController : Controller
    {
        // GET: ThongTin
        #region Loại dự án
        RealEstateEntities db = new RealEstateEntities();
        [RoleAuthorize(Roles = "0=0,38=1")]
        public ActionResult LoaiDuAn()
        {
            return View();
        }
        
        public async Task<JsonResult> getLoaiDuAn() {
            return Json( db.dl_loaiduan.OrderBy(it=>it.ID).ToList(), JsonRequestBehavior.AllowGet);
        }
        [RoleAuthorize(Roles = "0=0,39=1")]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<JsonResult> AddLoaiDuAn(dl_loaiduan item)
        {
            string rs ="";
            try
            {
                var user = Users.GetNguoiDung(User.Identity.Name);
                item.NguoiDungTao = user.NguoiDung;
                item.NgayTao = DateTime.Now;
               
                db.dl_loaiduan.Add(item);
                if (db.SaveChanges() > 0)
                {
                    dl_historys hst = new dl_historys();
                    hst.Key = item.ID.ToString();
                    hst.LinkView = Url.Action("LoaiDuAn", "ThongTin");
                    hst.TableName = "dl_loaiduan";
                    hst.NguoiDung = user.NguoiDung;
                    hst.Ngay = DateTime.Now;
                    hst.Content = Logchange.Insert(item, "dl_loaiduan");
                    hst.Type = "Thêm loại dự án";
                    Logchange.SaveLogChange(db,hst);
                    db.SaveChanges();

                    rs = "1";
                }
                    
            }
            catch (Exception ex)
            {
                rs = "Thất bại " + ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        //[RoleAuthorize(Roles = "0,12=3")]
        [RoleAuthorize(Roles = "0=0,40=1")]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<JsonResult> EditLoaiDuAn(dl_loaiduan edit)
        {
            string rs = "";
            try
            {
                var user = Users.GetNguoiDung(User.Identity.Name);
                var item = db.dl_loaiduan.FirstOrDefault(it => it.ID == edit.ID);

                dl_historys hst = new dl_historys();
                hst.Key = item.ID.ToString();
                hst.LinkView = Url.Action("LoaiDuAn", "ThongTin");
                hst.TableName = "dl_loaiduan";
                hst.NguoiDung = user.NguoiDung;
                hst.Ngay = DateTime.Now;
                hst.Content = Logchange.Edit(edit, item, "dl_loaiduan");
                hst.Type = "Sửa loại dự án";
                Logchange.SaveLogChange(db, hst);

                item.NguoiDungSua = user.NguoiDung;
                item.NgaySua = DateTime.Now;
                if (item.TenLoaiDuAn != edit.TenLoaiDuAn)
                {
                    item.TenLoaiDuAn = edit.TenLoaiDuAn;
                }
                if (item.MoTa != edit.MoTa)
                {
                    item.MoTa = edit.MoTa;
                }
                if (db.SaveChanges() > 0)
                    rs = "1";
            }
            catch (Exception ex)
            {
                rs = "Thất bại " + ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [RoleAuthorize(Roles = "0=0,41=1")]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<JsonResult> DelLoaiDuAn(int id) {
            string rs = "0";
            try
            {
                var del = db.dl_loaiduan.FirstOrDefault(it => it.ID == id);
                var user = Users.GetNguoiDung(User.Identity.Name);

                dl_historys hst = new dl_historys();
                hst.Key = id.ToString();
                hst.LinkView = "#";
                hst.TableName = "dl_loaiduan";
                hst.NguoiDung = user.NguoiDung;
                hst.Ngay = DateTime.Now;
                hst.Content = Logchange.Insert(del, "dl_loaiduan");
                hst.Type = "Xóa loại dự án";
                Logchange.SaveLogChange(db, hst);
                db.dl_loaiduan.Remove(del);
                if (db.SaveChanges() > 0)
                {
                    rs = "1";
                }
            }
            catch (Exception ex)
            {
                rs = "Thất bại " + ex.Message;
            } 
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region chủ đầu tư
        [RoleAuthorize(Roles = "0=0,34=1")]
        public ActionResult ChuDauTu()
        {
            return View();
        }
        [OutputCache(Duration = 30)]
        public async Task<JsonResult> getChuDauTu() {
            var model = db.dl_chudautu.Where(it=>it.Del != true).ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,35=1")]
        public async Task<JsonResult> AddChuDauTu(dl_chudautu item)
        {
            string rs = "Thất bại";
            try
            {
                var user = Users.GetNguoiDung(User.Identity.Name);
                item.NguoiDungTao = user.NguoiDung;
                item.NgayTao = DateTime.Now;


                db.dl_chudautu.Add(item);
                if (db.SaveChanges() > 0)
                {
                    dl_historys hst = new dl_historys();
                    hst.Key = item.IdChuDauTu.ToString();
                    hst.LinkView = "#";
                    hst.TableName = "dl_chudautu";
                    hst.NguoiDung = user.NguoiDung;
                    hst.Ngay = DateTime.Now;
                    hst.Content = Logchange.Insert(item, "dl_chudautu");
                    hst.Type = "Thêm chủ đầu tư";
                    Logchange.SaveLogChange(db, hst);
                    db.SaveChanges();
                    rs = "1";
                }
            }
            catch (Exception ex)
            {
                rs = "Thất bại " + ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,36=1")]
        public async Task<JsonResult> EditChuDauTu(dl_chudautu edit)
        {
            string rs = "Thất bại";
            try
            {
               
                var user = Users.GetNguoiDung(User.Identity.Name);
                var item = db.dl_chudautu.FirstOrDefault(it => it.IdChuDauTu == edit.IdChuDauTu);

                dl_historys hst = new dl_historys();
                hst.Key = item.IdChuDauTu.ToString();
                hst.LinkView = "#";
                hst.TableName = "dl_chudautu";
                hst.NguoiDung = user.NguoiDung;
                hst.Ngay = DateTime.Now;
                hst.Content = Logchange.Edit(edit,item, "dl_chudautu");
                hst.Type = "Sửa chủ đầu tư";
                Logchange.SaveLogChange(db, hst);

                item.NguoiDungSua = user.NguoiDung;
                item.NgaySua = DateTime.Now;
                if (item.TenChuDauTu != edit.TenChuDauTu && edit.TenChuDauTu != null)
                    item.TenChuDauTu = edit.TenChuDauTu;
                if (item.MoTa != edit.MoTa)
                    item.MoTa = edit.MoTa;
                if (item.XuatXu != edit.XuatXu)
                    item.XuatXu = edit.XuatXu;
                if (item.DiemManh != edit.DiemManh)
                    item.DiemManh = edit.DiemManh;
                if (item.DiemYeu != edit.DiemYeu)
                    item.DiemYeu = edit.DiemYeu;
                if (item.GhiChu != edit.GhiChu)
                    item.GhiChu = edit.GhiChu;

                if (db.SaveChanges() > 0)
                {
                    rs = "1";
                }
            }
            catch (Exception ex)
            {
                rs = "Thất bại " + ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,37=1")]
        public async Task<JsonResult> DelChuDauTu(int IdChuDauTu) {
            string rs = "Thất bại";
            try
            {
                var user = Users.GetNguoiDung(User.Identity.Name);
                var del = db.dl_chudautu.FirstOrDefault(it => it.IdChuDauTu == IdChuDauTu);
                del.Del = true;
                del.NguoiDungSua = user.NguoiDung;
                del.NgaySua = DateTime.Now;

                dl_historys hst = new dl_historys();
                hst.Key = IdChuDauTu.ToString();
                hst.LinkView = "#";
                hst.TableName = "dl_loaiduan";
                hst.NguoiDung = user.NguoiDung;
                hst.Ngay = DateTime.Now;
                hst.Content = Logchange.Insert(del, "dl_chudautu");
                hst.Type = "Xóa chủ đầu tư";
                Logchange.SaveLogChange(db, hst);
                if (db.SaveChanges() > 0)
                {
                    rs = "1";
                }
            }
            catch (Exception ex)
            {
                rs = "Thất bại " + ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Chủ nhà
        [RoleAuthorize(Roles = "0=0,46=1")]
        public ActionResult ChuNha() {
            return View();
        }
        public async Task<JsonResult> dataChuNha()
        {
            var model = db.dl_dm_chunha.Where(it => it.Del != true).ToList();
            List<long> id = model.Select(it => it.IdChuNha).ToList();
            var listChiTiet = db.dl_dm_chunha_chitiet.Where(it => id.Contains(it.IdChuNha)).ToList();
            string s = "";
            foreach (var item in model)
            {
                var temp = listChiTiet.Where(it => it.IdChuNha == item.IdChuNha).Select(it => new { it.Ten, it.SoDienThoai }).ToList();
                if (temp.Count > 0)
                {
                    s = string.Join("-", temp.Select(it => it.Ten + " " + it.SoDienThoai));
                }
                item.TenChuNha = item.TenChuNha + "[" + s + "]";
            }
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Duration = 30)]
        public async Task<JsonResult> vChuNha() {
            var model = db.v_thongtin_chunha.ToList();
            var json = Json(model, JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;
        }
        [OutputCache(Duration = 30)]
        [HttpGet]
        public async Task<JsonResult> getChuNha() {
            var model = db.v_thongtin_chunha.ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        [RoleAuthorize(Roles = "0=0,47=1,48=1")]
        public async Task<ActionResult> ChuNhaChiTiet(int? Id)
        {
           
            clsChuNha model = new clsChuNha();
            if (Id != null)
            {
                var chuNha = db.dl_dm_chunha.FirstOrDefault(it => it.IdChuNha == Id);
                var chuNhaThongTin = db.dl_dm_chunha_chitiet.Where(it => it.IdChuNha == Id).ToList();
                model.ChuNha = chuNha;
                model.ChuNhaThongTin = chuNhaThongTin;
            }
            else {
                model.ChuNha = new dl_dm_chunha();
                model.ChuNha.IdChuNha = 0;
                model.ChuNhaThongTin = new List<dl_dm_chunha_chitiet>();
            }
            
            return View(model);
        }
        public async Task<JsonResult> getThongTinChiTietChuNha(long? id)
        {
            clsChuNha model = new clsChuNha();
            if (id != null)
            {
                var chuNha = db.dl_dm_chunha.FirstOrDefault(it => it.IdChuNha == id);
                var chuNhaThongTin = db.dl_dm_chunha_chitiet.Where(it => it.IdChuNha == id).ToList();
                model.ChuNha = chuNha;
                model.ChuNhaThongTin = chuNhaThongTin;
            }
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [ValidateInput(false)]
        [RoleAuthorize(Roles = "0=0,47=1")]
        public async Task<JsonResult> AddChuNha(clsChuNha item)
        {
            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            using (var tran = new TransactionScope())
            {
                ResponseStatus r = new ResponseStatus();
                r.rs_code = 0;
                try
                {
                    dl_dm_chunha addChuNha = new dl_dm_chunha();
                    addChuNha = item.ChuNha;
                    addChuNha.NguoiDungTao = (int)nguoidung.NguoiDung;
                    addChuNha.NgayTao = DateTime.Now;
                    db.dl_dm_chunha.Add(addChuNha);
                 

                    if (await db.SaveChangesAsync() > 0)
                    {
                        dl_historys hst = new dl_historys();
                        hst.Key = addChuNha.IdChuNha.ToString();
                        hst.TableName = "dl_dm_chunha";
                        hst.Ngay = DateTime.Now;
                        hst.NguoiDung = nguoidung.NguoiDung;
                        hst.Type = "Thêm chủ nhà";
                        hst.Content = Logchange.Insert(addChuNha, "dl_dm_chunha");
                        hst.LinkView = Url.Action("ChuNha", "ThongTin");
                        Logchange.SaveLogChange(db,hst);

                        long idChuNha = db.dl_dm_chunha.Where(it => it.TenChuNha == addChuNha.TenChuNha && it.NguoiDungTao == addChuNha.NguoiDungTao).Max(it => it.IdChuNha);
                        List<dl_dm_chunha_chitiet> addChiTiet = new List<dl_dm_chunha_chitiet>();
                        addChiTiet = item.ChuNhaThongTin;
                        addChiTiet.All(it => { it.IdChuNha = idChuNha; return true; });
                        db.dl_dm_chunha_chitiet.AddRange(addChiTiet);
                        if (await db.SaveChangesAsync() > 0)
                        {
                            tran.Complete();
                            r.rs_code = 1;
                            r.rs_text = idChuNha.ToString();
                        }
                    }
                }
                catch (Exception ex)
                {
                    r.rs_code = 0;
                    r.rs_text = ex.ToString();
                    throw;
                }
                return Json(r, JsonRequestBehavior.AllowGet);
            }
                
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,48=1")]
        public async Task<JsonResult> EditChuNha(clsChuNha item)
        {
            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            using (var tran = new TransactionScope())
            {
                ResponseStatus r = new ResponseStatus();
                r.rs_code = 0;
                try
                {
                    var editChuNha = db.dl_dm_chunha.FirstOrDefault(it => it.IdChuNha == item.ChuNha.IdChuNha);
                    if (editChuNha != null)
                    {
                        dl_historys hst = new dl_historys();
                        hst.Key = item.ChuNha.IdChuNha.ToString();
                        hst.TableName = "dl_dm_chunha";
                        hst.Ngay = DateTime.Now;
                        hst.NguoiDung = nguoidung.NguoiDung;
                        hst.Type = "Sửa chủ nhà";
                        hst.Content = Logchange.Edit(item.ChuNha, editChuNha, "dl_dm_chunha");
                        hst.LinkView = Url.Action("ChuNha", "ThongTin");

                        Logchange.SaveLogChange(db, hst);

                        editChuNha.TenChuNha = item.ChuNha.TenChuNha;
                        editChuNha.GhiChu = item.ChuNha.GhiChu;
                        editChuNha.QuocTich = item.ChuNha.QuocTich;
                        editChuNha.NguoiDungKyGui = item.ChuNha.NguoiDungKyGui;
                        List<dl_dm_chunha_chitiet> editListChuNha = db.dl_dm_chunha_chitiet.Where(it => it.IdChuNha == item.ChuNha.IdChuNha).ToList();
                        foreach (var temp in editListChuNha)
                        {
                            var tempedit = item.ChuNhaThongTin.FirstOrDefault(it => it.Id == temp.Id);
                            if (tempedit != null)
                            {
                                temp.Ten = tempedit.Ten;
                                temp.SoDienThoai = tempedit.SoDienThoai;
                                temp.EMail = tempedit.EMail;
                            }
                        }
                        var addChuNhaChiTiet = item.ChuNhaThongTin.Where(it => it.Id == 0).ToList();
                        if (addChuNhaChiTiet.Count > 0)
                        {
                            addChuNhaChiTiet.All(it => { it.IdChuNha = editChuNha.IdChuNha; return true; });
                            db.dl_dm_chunha_chitiet.AddRange(addChuNhaChiTiet);
                        }
                        if (await db.SaveChangesAsync() > 0)
                        {
                            tran.Complete();
                            r.rs_code = 1;
                            r.rs_data = item.ChuNha.IdChuNha;
                        }
                    }
                    
                }
                catch (Exception ex)
                {
                    r.rs_code = 0;
                    r.rs_text = ex.ToString();
                    throw;
                }
                return Json(r, JsonRequestBehavior.AllowGet);
            }

        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [ValidateInput(false)]
        public async Task<JsonResult> XoaThongTinChuNha(long id)
        {
            ResponseStatus r = new ResponseStatus();
            r.rs_code = 0;
            try
            {
                var del = db.dl_dm_chunha_chitiet.FirstOrDefault(it => it.Id == id);
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                db.dl_dm_chunha_chitiet.Remove(del);
                //dl_historys hst = new dl_historys();
                //hst.Key = id.ToString();
                //hst.TableName = "dl_dm_chunha_chitiet";
                //hst.Type = "Xóa chủ nhà chi tiết";
                //hst.Ngay = DateTime.Now;
                //hst.NguoiDung = nguoidung.NguoiDung;
                //hst.LinkView = "#";
                //hst.Content = Logchange.Insert(del, "dl_dm_chunha_chitiet");
                //Logchange.SaveLogChange(db, hst);
                db.SaveChanges();
                r.rs_code = 1;
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = ex.ToString();
                throw;
            }
            return Json(r, JsonRequestBehavior.AllowGet);

        }

        [RoleAuthorize(Roles = "0=0,49=1")]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<JsonResult> XoaChuNha(long id) {
            ResponseStatus r = new ResponseStatus();
            r.rs_code = 0;
            using (var tran = new TransactionScope())
            {
                try
                {
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    var delChiTiet = db.dl_dm_chunha_chitiet.Where(it => it.IdChuNha == id).ToList();
                    var del = db.dl_dm_chunha.FirstOrDefault(it => it.IdChuNha == id);
                    dl_historys hst = new dl_historys();
                    hst.Key = del.IdChuNha.ToString();
                    hst.TableName = "dl_dm_chunha";
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.Type = "Xóa chủ nhà";
                    hst.Content = Logchange.Insert(del, "dl_dm_chunha");
                    hst.LinkView = "#";
                    Logchange.SaveLogChange(db, hst);

                    db.dl_dm_chunha_chitiet.RemoveRange(delChiTiet);
                    db.dl_dm_chunha.Remove(del);
                    db.SaveChanges();
                    tran.Complete();
                    r.rs_code = 1;
                }
                catch (Exception ex)
                {
                    r.rs_text = ex.Message.ToString();
                }
            }
            return Json(r, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Tình trạng cân hộ
        [RoleAuthorize(Roles = "0=0,56=1")]
        public async Task<ActionResult> TinhTrangCanHo()
        {
            return View();
        }
        [HttpGet]
        [OutputCache(Duration = 30)]
        public async Task<JsonResult> getTinhTrangCanHo()
        {
            var json = Json(db.dl_dm_tinhtrangcanho.ToList(), JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,57=1")]
        public async Task<JsonResult> AddTinhTrangCanHo(string Ten) {
            ResponseStatus rs = new ResponseStatus();
            if (db.dl_dm_tinhtrangcanho.Where(it => it.tentinhtrangcanho == Ten).ToList().Count > 0)
            {
                rs.rs_text = "Tên tình trạng đã tồn tại không thể thêm";
                return Json(rs, JsonRequestBehavior.AllowGet);
            }
            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                dl_dm_tinhtrangcanho add = new dl_dm_tinhtrangcanho();
                add.tentinhtrangcanho = Ten;
                db.dl_dm_tinhtrangcanho.Add(add);
                db.SaveChanges();
                dl_historys hst = new dl_historys();
                hst.TableName = "dl_dm_tinhtrangcanho";
                hst.Ngay = DateTime.Now;
                hst.NguoiDung = nguoidung.NguoiDung;
                hst.Type = "Thêm tình trạng căn hộ";
                hst.LinkView = Url.Action("TinhTrangCanHo", "ThongTin");
                hst.Key = add.tinhtrangcanho.ToString();
                hst.Content = Logchange.Insert(add, "dl_dm_tinhtrangcanho");
                Logchange.SaveLogChange(db,hst);
                db.SaveChanges();
                rs.rs_code = 1;
            }
            catch (Exception ex)
            {
                rs.rs_text = ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);

        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,58=1")]
        public async Task<JsonResult> EditTinhTrangCanHo(string Ten, int id) {
            ResponseStatus rs = new ResponseStatus();
           // MoviesContext test = new MoviesContext();
            rs.rs_code = 0;
            if (db.dl_dm_tinhtrangcanho.Where(it => it.tentinhtrangcanho == Ten && it.tinhtrangcanho != id ).ToList().Count > 0)
            {
                rs.rs_text = "Tên tình trạng đã tồn tại không thể sửa";
                return Json(rs, JsonRequestBehavior.AllowGet);
            }
            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                var edit = db.dl_dm_tinhtrangcanho.FirstOrDefault(it => it.tinhtrangcanho == id);

                dl_historys hst = new dl_historys();
                hst.Type = "Sửa tình trạng căn hộ";
                hst.TableName = "dl_dm_tinhtrangcanho";
                hst.Key = id.ToString();
                hst.LinkView = Url.Action("TinhTrangCanHo", "ThongTin");
                hst.Content = string.Format("<li><b>{0}</b> changed from <b style ='color: red'>{1}</b> to <b style ='color:darkblue'>{2},</b></li> \n", "tentinhtrangcanho", edit.tentinhtrangcanho, Ten);
                hst.Ngay = DateTime.Now;
                hst.NguoiDung = nguoidung.NguoiDung;

                edit.tentinhtrangcanho = Ten;
                Logchange.SaveLogChange(db, hst);
                db.SaveChanges();
               
                rs.rs_code = 1;


            }
            catch (Exception ex)
            {
                rs.rs_text = ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,59=1")]
        public async Task<JsonResult> DelTinhTrangCanHo( int id)
        {
            ResponseStatus rs = new ResponseStatus();

            rs.rs_code = 0;
            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                var del = db.dl_dm_tinhtrangcanho.FirstOrDefault(it => it.tinhtrangcanho == id);

                dl_historys hst = new dl_historys();
                hst.Type = "Xóa tình trạng căn hộ";
                hst.TableName = "dl_dm_tinhtrangcanho";
                hst.Key = id.ToString();
                hst.LinkView = "#";
                hst.Content = Logchange.Insert(del, "dl_dm_tinhtrangcanho");
                hst.Ngay = DateTime.Now;
                hst.NguoiDung = nguoidung.NguoiDung;
                //  Logchange.SaveLogChange(db, hst);
                db.dl_dm_tinhtrangcanho.Remove(del);
                db.SaveChanges();
                rs.rs_code = 1;
            }
            catch (Exception ex)
            {
                rs.rs_text = ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Thong tin nhân viên
        public async Task<JsonResult> GetNhanVien()
        {
            return Json( db.wp_users.Select(it => new { NguoiDung = it.ID, Ten = it.display_name }).ToList(), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Thong tin nhân viên
        //public async Task<JsonResult> GetDuAn()
        //{
        //    return Json(db.dl_duan.ToList(), JsonRequestBehavior.AllowGet);
        //}
        #endregion
        #region dự án
        [RoleAuthorize(Roles = "0=0,42=1")]
        public ActionResult DuAn()
        {
            return View();
        }
        [HttpGet]
        [OutputCache(Duration = 30)]
        public JsonResult GetDuAn()
        {
            var json = Json(db.v_duan.ToList(), JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;
        }
        public JsonResult GetQuanHuyen(string Tinh)
        {
            return Json(db.dl_dm_quan_huyen.Where(m => m.id_tinh_thanh_pho == Tinh).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPhuongXa(string Quan)
        {
            return Json(db.dl_dm_phuong_xa.Where(m => m.id_quan_huyen == Quan).ToList(), JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,43=1,44=1")]
        public async Task<JsonResult> CapNhatDuAn(dl_duan da)
        {
            ResponseStatus r = new ResponseStatus();
            r.rs_code = 0;
            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                if (da.duan == 0)
                {
                    var check = await db.dl_duan.FirstOrDefaultAsync(m => m.ma_duan == da.ma_duan);
                    if (check == null)
                    {
                        da.tao_ngay = DateTime.Now;
                        da.tao_nguoidung = (int)nguoidung.NguoiDung;
                        db.dl_duan.Add(da);

                        dl_historys hst = new dl_historys();
                        hst.Key = da.duan.ToString();
                        hst.TableName = "dl_duan";
                        hst.Ngay = DateTime.Now;
                        hst.NguoiDung = nguoidung.NguoiDung;
                        hst.Type = "Thêm dự án";
                        hst.Content = Logchange.Insert(da, "dl_duan");
                        hst.LinkView = Url.Action("DuAn","ThongTin");
                        Logchange.SaveLogChange(db, hst);

                        await db.SaveChangesAsync();
                        r.rs_code = (int)da.duan; r.rs_text = "Tạo mới dự án thành công";
                    }
                    else
                    {
                        r.rs_text = "Mã dự án bị trùng";
                    }
                }
                else
                {
                    var duan = await db.dl_duan.FirstOrDefaultAsync(m => m.duan == da.duan);
                    if (duan != null)
                    {

                        dl_historys hst = new dl_historys();
                        hst.Key = da.duan.ToString();
                        hst.TableName = "dl_duan";
                        hst.Ngay = DateTime.Now;
                        hst.NguoiDung = nguoidung.NguoiDung;
                        hst.Type = "Sửa dự án";
                        hst.Content = Logchange.Edit(da, duan, "dl_duan");
                        hst.LinkView = Url.Action("DuAn", "ThongTin");
                        Logchange.SaveLogChange(db, hst);

                        duan.ten_duan = da.ten_duan;
                        duan.loai_duan = da.loai_duan;
                        duan.chudautu = da.chudautu;
                        duan.tinhtrang = da.tinhtrang;
                        duan.tinh_thanhpho = da.tinh_thanhpho;
                        duan.quanhuyen = da.quanhuyen;
                        duan.phuongxa = da.phuongxa;
                        duan.duong = da.duong;
                        duan.sonha = da.sonha;
                        duan.lat = da.lat;
                        duan.lng = da.lng;
                        duan.website = da.website;
                        duan.mota = da.mota;
                        duan.ghichu = da.ghichu;
                        duan.sua_ngay = DateTime.Now;
                        duan.sua_nguoidung = (int)nguoidung.NguoiDung;



                        await db.SaveChangesAsync();
                        r.rs_code = (int)duan.duan; r.rs_text = "Cập nhật dự án thành công";
                    }
                    else
                    {
                        r.rs_text = "Mã dự án không tồn tại";
                    }
                }
            }
            catch (Exception ex)
            {
                r.rs_text = "Có lỗi xảy ra không cập nhật được!";
            }
            return Json(r);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,45=1")]
        public JsonResult XoaDuAn(string id)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                dl_historys hst = new dl_historys();
                hst.Key = id;
                hst.TableName = "dl_duan";
                hst.Ngay = DateTime.Now;
                hst.NguoiDung = nguoidung.NguoiDung;
                hst.Type = "Xóa dự án";
                hst.Content = "Xóa ID dự án" + id;
                hst.LinkView = "#";
                Logchange.SaveLogChange(db, hst);
                db.SaveChanges();
                db.Database.ExecuteSqlCommandAsync("update  dl_duan set  an_duan=1,an_duan_ngay=now() ,an_duan_nguoi=" + nguoidung.NguoiDung + " where duan in (" + id + ")");
                r.rs_code = 1;
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = ex.Message;
            }
            return Json(r);
        }
        [HttpPost]
        public void DongBoDuAn(int id)
        {
            HostingEnvironment.QueueBackgroundWorkItem(cancellationToken => new DongBoThongTin().DongBoDuAn(id));
        }
        #endregion
        #region cấu hình
        [RoleAuthorize(Roles = "0=0,61=1")]
        public ActionResult CauHinh() {
            return View();
        }
        public async Task<JsonResult> GetCauHinh() {
            var model = db.dl_configs.ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,61=1")]
        public async Task<JsonResult> EditCauHinh(dl_configs item,string key)
        {
            var nguoidung = Users.GetNguoiDung(User.Identity.Name);
            ResponseStatus rs = new ResponseStatus();
            try
            {
                dl_historys hst = new dl_historys();
                
                var edit = db.dl_configs.FirstOrDefault(it => it.con_key == key);
                hst.Content = Logchange.Edit(item, edit, "dl_configs");
                hst.Key = edit.con_key;
                hst.Ngay = DateTime.Now;
                hst.NguoiDung = nguoidung.NguoiDung;
                hst.Type = "Chỉnh sửa cấu hình";
                hst.TableName = "dl_configs";
                hst.LinkView = Url.Action("CauHinh", "ThongTin");
                if (item.GhiChu != null)
                {
                    edit.GhiChu = item.GhiChu;
                }
                if (item.con_value != null)
                {
                    edit.con_value = item.con_value;
                }
                Logchange.SaveLogChange(db, hst);
                db.SaveChanges();
               
                rs.rs_code = 1;
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException ex)
            {
                System.Text.StringBuilder sb = new StringBuilder();
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
            //    rs.rs_text = ex.Message;
            //}
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Quản lý khách hàng
        [RoleAuthorize(Roles = "0=0,54=1")]
        public async Task<ActionResult> KhachHang()
        {
            return View();
        }
        public async Task<JsonResult> GetKhachHang()
        {
            ResponseStatus js = new ResponseStatus();
            if (User.IsInRole("0=0") || User.IsInRole("70=1"))
            {
                var model = db.dl_yeucau.Where(it => it.da_xoa != true).Select(it => new { it.id, it.ten_khach_hang, it.so_dien_thoai, it.dia_chi, it.zalo, it.messenger, it.nguon_khach, it.email_khach_hang, it.nghe_nghiep }).ToList();
                js.rs_data = model;
            }
            else
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                var model = db.dl_yeucau.Where(it => it.da_xoa != true && it.nguoi_phu_trach ==nguoidung.NguoiDung).Select(it => new { it.id, it.ten_khach_hang, it.so_dien_thoai, it.dia_chi, it.zalo, it.messenger, it.nguon_khach, it.email_khach_hang, it.nghe_nghiep }).ToList();
                js.rs_data = model;
            }
            var rrs = Json(js, JsonRequestBehavior.AllowGet);
            rrs.MaxJsonLength = int.MaxValue;
            return rrs;
        }
        [RoleAuthorize(Roles = "0=0,54=1")]
        public async Task<ActionResult> KhachhangChiTiet(decimal? id) {
           // id = 5;
            if (id == null)
            {
                return Content("Dữ liệu không hợp lệ");
            }
            else
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                var model = db.dl_yeucau.FirstOrDefault(it => it.id == id);
                if (!User.IsInRole("70=1"))
                {
                    if (nguoidung.NguoiDung != model.nguoi_phu_trach)
                    {
                        return Content("Bạn không có quền thao tác trên yêu cầu " + id.ToString());
                    }
                }
                return View(model);
            }
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [RoleAuthorize(Roles = "0=0,55=1")]
        public async Task<JsonResult> EditKhachHang(dl_yeucau item)
        {
            ResponseStatus rs = new ResponseStatus();
            rs.rs_code = 0;
            try
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                if (!User.IsInRole("70=1"))
                {
                    if (nguoidung.NguoiDung != item.nguoi_phu_trach)
                    {
                        rs.rs_text = ("Bạn không có quền thao tác trên yêu cầu " + item.id.ToString());
                        return Json(rs, JsonRequestBehavior.AllowGet);
                    }
                }
                dl_historys hst = new dl_historys();
                var edit = db.dl_yeucau.FirstOrDefault(it => it.id == item.id);
                hst.Content = Logchange.Edit(item, edit, "dl_yeucau");
                edit.ten_khach_hang = item.ten_khach_hang;
                edit.dia_chi = item.dia_chi;
                edit.so_dien_thoai = item.so_dien_thoai;
                edit.zalo = item.zalo;
                edit.messenger = item.messenger;
                edit.nghe_nghiep = item.nghe_nghiep;
                edit.email_khach_hang = item.email_khach_hang;
                edit.ngay_sua = DateTime.Now;
                edit.nguoi_sua = (int)nguoidung.NguoiDung;

                hst.Key = item.id.ToString();
                hst.TableName = "dl_yeucau";
                hst.Type = "Sửa thông tin khách hàng yêu cầu";
                hst.LinkView = Url.Action("KhachhangChiTiet", "ThongTin") + "?id=" + hst.Key;
                hst.Ngay = DateTime.Now;
                hst.NguoiDung = nguoidung.NguoiDung;
                Logchange.SaveLogChange(db, hst);
                db.SaveChanges();
                rs.rs_code = 1;
            }
            catch (Exception ex)
            {
                rs.rs_text = ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Danh muc đăng tin
        [RoleAuthorize(Roles = "0=0,66=1")]
        public async Task<ActionResult> DanhMucDangTin()
        {
            return View();
        }
        public async Task<JsonResult> GetDanhMuc(string id)
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                var model = (from term in db.wp_terms
                             join taxonomy in db.wp_term_taxonomy on term.term_id equals taxonomy.term_id
                             join loai in db.dl_dm_loai on taxonomy.taxonomy equals loai.ma_loai
                             where term.name != "0"
                             select new { taxonomy.term_id, taxonomy.term_taxonomy_id, term.name, taxonomy.taxonomy }).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,67=1")]
        public async Task<JsonResult> AddDanhMucLoai(string MaLoai,string TenLoai)
        {
            string rs = "Thất bại";
            try
            {
                var user = Users.GetNguoiDung(User.Identity.Name);

                var check = db.wp_terms.Where(it => it.name == TenLoai).ToList();
                if (check.Count > 0)
                {
                    rs = "Tên " + TenLoai + " đã tồn tại không thể thêm";
                }
                else
                {
                    using (var tran = new TransactionScope())
                    {
                        var terms = new wp_terms();
                        terms.name = TenLoai;
                        terms.slug = clsFunction.GenerateSlug(TenLoai);
                        terms.term_group = 0;
                        db.wp_terms.Add(terms);
                        await db.SaveChangesAsync();
                        var term_taxonomy = new wp_term_taxonomy();
                        term_taxonomy.term_id = terms.term_id;
                        term_taxonomy.taxonomy = MaLoai;
                        term_taxonomy.parent = 0;
                        term_taxonomy.count = 0;
                        term_taxonomy.description = "";
                        db.wp_term_taxonomy.Add(term_taxonomy);

                        dl_historys hst = new dl_historys();
                        hst.Key = terms.term_id.ToString();
                        hst.LinkView = "#";
                        hst.TableName = "wp_terms";
                        hst.NguoiDung = user.NguoiDung;
                        hst.Ngay = DateTime.Now;
                        hst.Content = Logchange.Insert(terms, "wp_terms");
                        hst.Type = "Ad danh mục" + MaLoai;
                        Logchange.SaveLogChange(db, hst);
                        await db.SaveChangesAsync();
                        tran.Complete();
                        rs = "1";
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

                rs = sb.ToString();
            }
            //catch (Exception ex)
            //{
            //    rs = "Thất bại " + ex.Message;
            //}
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,68=1")]
        public async Task<JsonResult> EditDanhMucLoai(string MaLoai, string TenLoai,decimal id)
        {
            string rs = "Thất bại";
            try
            {
                var detel = db.wp_term_taxonomy.FirstOrDefault(it => it.term_taxonomy_id == id);
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                if (detel != null)
                {
                    var term = db.wp_terms.FirstOrDefault(it => it.term_id == detel.term_id);
                    string sCapNhap = "";
                    if (MaLoai != null && MaLoai != "")
                    {

                        sCapNhap = "<li><b>taxonomy</b> changed from <b style ='color: red'>"+ detel.taxonomy + "</b> to <b style ='color:darkblue'>"+MaLoai+",</b></li> \n";
                       detel.taxonomy = MaLoai;
                    }
                    if (TenLoai != null && TenLoai != "")
                    {

                        sCapNhap += "<li><b>name</b> changed from <b style ='color: red'>" + term.name + "</b> to <b style ='color:darkblue'>" + TenLoai + ",</b></li> \n"; ;
                        term.name = TenLoai;
                        term.slug = clsFunction.GenerateSlug(TenLoai);
                    }
                    dl_historys hst = new dl_historys();
                    hst.Key = term.term_id.ToString();
                    hst.TableName = "dl_yeucau";
                    hst.Type = "Sửa thông tin ";
                    hst.LinkView = "#";
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.Content = sCapNhap;
                    Logchange.SaveLogChange(db, hst);
                    db.SaveChanges();
                    rs = "1";

                }
            }
            catch (Exception ex)
            {
                rs = "Thất bại " + ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,69=1")]
        public async Task<JsonResult> DelDanhMucLoai(decimal id)
        {
            string rs = "Thất bại";
            try
            {
                var del = db.wp_term_taxonomy.FirstOrDefault(it => it.term_taxonomy_id == id);
                if (del != null)
                {
                    var deldm = db.wp_terms.FirstOrDefault(it => it.term_id == del.term_id);
                    var delchitiet = db.wp_termmeta.Where(it => it.term_id == del.term_id).ToList();
                    var user = Users.GetNguoiDung(User.Identity.Name);
                    db.wp_terms.Remove(deldm);
                    db.wp_term_taxonomy.Remove(del);
                    db.wp_termmeta.RemoveRange(delchitiet);
                    dl_historys hst = new dl_historys();
                    hst.Key = id.ToString();
                    hst.LinkView = "#";
                    hst.TableName = "wp_terms";
                    hst.NguoiDung = user.NguoiDung;
                    hst.Ngay = DateTime.Now;
                    hst.Content = Logchange.Insert(deldm, "wp_terms");
                    hst.Type = "Xóa danh mục " + del.taxonomy;
                    Logchange.SaveLogChange(db, hst);
                    if (db.SaveChanges() > 0)
                    {
                        rs = "1";
                    }
                }
            }
            catch (Exception ex)
            {
                rs = "Thất bại " + ex.Message;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
    public class DongBoThongTin
    {
        public async Task DongBoDuAn(int id)
        {
            RealEstateEntities db = new RealEstateEntities();
            var duan = await db.dl_duan.FirstOrDefaultAsync(m => m.duan == id);
            if (duan.id_map != null)
            {
                var terms = await db.wp_terms.FirstOrDefaultAsync(m => m.term_id == duan.id_map);
                terms.name = duan.ten_duan;
                terms.slug = clsFunction.GenerateSlug(duan.ten_duan);
                await db.SaveChangesAsync();
            }
            else
            {
                var checkterm = await db.wp_terms.FirstOrDefaultAsync(m => m.name == duan.ten_duan);
                if (checkterm == null)
                {
                    var terms = new wp_terms();
                    terms.name = duan.ten_duan;
                    terms.slug = clsFunction.GenerateSlug(duan.ten_duan);
                    terms.term_group = 0;
                    db.wp_terms.Add(terms);
                    await db.SaveChangesAsync();
                    duan.id_map = (long)terms.term_id;
                    var term_taxonomy = new wp_term_taxonomy();
                    term_taxonomy.term_id = terms.term_id;
                    term_taxonomy.taxonomy = "dua-an";
                    term_taxonomy.parent = 0;
                    term_taxonomy.count = 0;
                    db.wp_term_taxonomy.Add(term_taxonomy);
                    await db.SaveChangesAsync();
                }
                else
                {
                    duan.id_map = (long)checkterm.term_id;
                    checkterm.name = duan.ten_duan;
                    checkterm.slug = clsFunction.GenerateSlug(duan.ten_duan);
                    await db.SaveChangesAsync();
                }
            }
        }
    }

    public  class LoaiDanhMuc {
        public string MaLoai { get; set; }
        public string TenLoai { get; set; }
    }
}
