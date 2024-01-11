using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Web;
using System.Web.Libs;
using System.Web.Mvc;
using Newtonsoft.Json;
using RealEstate.Entity;
using RealEstate.Libs;
using RealEstate.Libs.Models;
namespace RealEstate.Controllers
{
    [RoleAuthorize]
    public class DangTinController : Controller
    {
        // GET: DangTin
        RealEstateEntities db = new RealEstateEntities();
        [RoleAuthorize(Roles = "0=0,27=1")]
        public async Task<ActionResult> Index()
        {
            var configs = await db.dl_configs.Where(m => m.con_key == "site_url"|| m.con_key == "wp-content").ToListAsync();
            ViewBag.site_url = configs.FirstOrDefault(m => m.con_key == "site_url").con_value; ViewBag.wp_content = configs.FirstOrDefault(m => m.con_key == "wp-content").con_value;
            return View();
        }
        public async Task<JsonResult> getDataDangTin(int LoaiTin)
        {
            string postStatus = LoaiTin == 1 ? "publish" : "trash";
            var model = await db.v_tindang.OrderByDescending(m => m.post_modified).Where(m => m.post_status == postStatus).ToListAsync();
            if (!User.IsInRole("0=0") && !User.IsInRole("71=1"))
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                model = model.Where(it => it.NguoiDung == nguoidung.NguoiDung).ToList();
            }
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        //public async Task<ActionResult> ChiTietTinRao(decimal? id)
        //{
        //    var modle = new ChiTietDangTin();
        //    var post = db.wp_posts.FirstOrDefault(it => it.ID == id);
        //    var postMeta = db.wp_postmeta.Where(it => it.post_id == id);
        //    var terms = (from a in db.wp_term_relationships
        //                 join b in db.wp_term_taxonomy on a.term_taxonomy_id equals b.term_taxonomy_id
        //                 join c in db.wp_terms on b.term_id equals c.term_id
        //                 where a.object_id == id
        //                 select new { b.term_id, c.name, b.taxonomy }).ToList();
        //    if (post != null)
        //    {
        //        modle.Id = post.ID;
        //        modle.TieuDe = post.post_title;
        //        modle.MoTa = post.post_content;
        //        var giaThue = postMeta.FirstOrDefault(it => it.meta_key == "estate_attr_price");
        //        modle.GiaThue = giaThue != null ? giaThue.meta_value : null;
        //        var soPN = postMeta.FirstOrDefault(it => it.meta_key == "estate_attr_bedrooms");
        //        modle.PN = soPN != null ? soPN.meta_value : null;
        //        var wc = postMeta.FirstOrDefault(it => it.meta_key == "estate_attr_bathrooms");
        //        modle.WC = wc != null ? wc.meta_value : null;
        //        var dt = postMeta.FirstOrDefault(it => it.meta_key == "estate_attr_property-size");
        //        modle.DT = dt != null ? dt.meta_value : null;
        //        var giaBan = postMeta.FirstOrDefault(it => it.meta_key == "estate_attr_attribute_");
        //        modle.GiaBan = giaBan != null ? giaBan.meta_value : null;
        //        var duAn = terms.FirstOrDefault(it => it.taxonomy == "du-an");
        //        modle.DuAn = duAn != null ? duAn.name : null;
        //        var tinhTrang = terms.FirstOrDefault(it => it.taxonomy == "tinh-trang");
        //        modle.TinhTrang = tinhTrang != null ? tinhTrang.name : null;
        //        modle.NgayTao = post.post_date.ToString("dd/MM/yyyy");
        //        modle.NgaySua = post.post_modified.ToString("dd/MM/yyyy");
        //        var loaiCanHo = terms.FirstOrDefault(it => it.taxonomy == "loai-can-ho");
        //        modle.LoaiCanHo = loaiCanHo != null ? loaiCanHo.name : null;
        //        List<URLImage> images = new List<URLImage>();
        //        var urlImages = postMeta.FirstOrDefault(it => it.meta_key == "estate_gallery");
        //        if (urlImages != null && urlImages.meta_value.Length > 0)
        //        {
        //            SerializerPHP serializerPHP = new SerializerPHP();
        //            var dd = ((IEnumerable)serializerPHP.Deserialize(urlImages.meta_value)).Cast<object>().ToList();
        //            string url = db.wp_options.FirstOrDefault(it => it.option_name == "siteurl").option_value;
        //            List<decimal> imgID = new List<decimal>();
        //            for (int i = 0; i < dd.Count; i++)
        //            {
        //                imgID.Add(decimal.Parse(dd[i].ToString()));
        //            }
        //            var postImage = db.wp_posts.Where(it => imgID.Contains(it.ID)).ToList();
        //            foreach (var item in postImage)
        //            {
        //                string s = item.guid;
        //                s = s.Substring(s.IndexOf("wp-content"));
        //                s = url + '/' + s;
        //                images.Add(new URLImage { Id = item.ID, Url = s });
        //            }
        //            modle.listImage = images;
        //        }
        //    }
        //    return View(modle);
        //}
        #region Tạo đăng tin mới
        [RoleAuthorize(Roles = "0=0,28=1")]
        public async Task<ActionResult> Create()
        {
            var configs = await db.dl_configs.Where(m => m.con_key == "dangtin_hinhtoida" || m.con_key == "dangtin_hinhtoithieu").ToListAsync();
            ViewBag.dangtin_hinhtoida = configs.FirstOrDefault(m => m.con_key == "dangtin_hinhtoida").con_value; ViewBag.dangtin_hinhtoithieu = configs.FirstOrDefault(m => m.con_key == "dangtin_hinhtoithieu").con_value;
            return View();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [ValidateInput(false)]
        public async Task<JsonResult> CreateSubmit(DangTin item)
        {
            ResponseStatus r = new ResponseStatus();
            string local_path = "";
            try
            {
                using (var tran = new TransactionScope())
                {
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    wp_posts add = new wp_posts();
                  
                    add.post_author = nguoidung.NguoiDung;
                    add.post_date = DateTime.Now;
                    add.post_date_gmt = DateTime.Now;
                    add.post_modified = DateTime.Now;
                    add.post_modified_gmt = DateTime.Now;
                    add.post_content = item.NoiDung;
                    add.post_title = item.TieuDe;
                    add.post_status = "publish";
                    add.comment_status = "closed";
                    add.ping_status = "closed";
                    add.post_name = clsFunction.GenerateSlug(item.TieuDe);
                    add.post_type = "estate";
                    add.post_excerpt = "";
                    add.post_password = "";
                    add.to_ping = "";
                    add.pinged = "";
                    add.post_content_filtered = "";
                    add.guid = "";
                    add.post_mime_type = "";
                    db.wp_posts.Add(add);
                    if (await db.SaveChangesAsync() > 0)
                    {
                        dl_dangtin dangtin = new dl_dangtin();
                        dangtin.id = add.ID;
                        dangtin.NguoiDung = nguoidung.NguoiDung;
                        SerializerPHP serializerPHP = new SerializerPHP();
                        List<wp_postmeta> addmeta = new List<wp_postmeta>();
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_views", meta_value = null });/*Chưa rõ*/
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_views", meta_value = null });
                        if (!string.IsNullOrEmpty(item.SoPN))
                        {
                            dangtin.phong_ngu = item.SoPN;
                            dangtin.phong_ngu_key = "estate_attr_bedrooms";
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_bedrooms", meta_value = item.SoPN });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_bedrooms", meta_value = "myhome_estate_attr_bedrooms" });
                        }
                        if (!string.IsNullOrEmpty(item.SoWC ))
                        {
                            dangtin.wc = item.SoWC;
                            dangtin.wc_key = "estate_attr_bathrooms";
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_bathrooms", meta_value = item.SoWC });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_bathrooms", meta_value = "myhome_estate_attr_bathrooms" });
                        }
                        if (item.DienTich != null && item.DienTich > 0)
                        {
                            dangtin.dien_tich = item.DienTich.ToString();
                            dangtin.dien_tich_key = "estate_attr_property-size";
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_property-size", meta_value = item.DienTich.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_property-size", meta_value = "myhome_estate_attr_property-size" });
                        }
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "myhome_frontend", meta_value = "1" });
                        // Giá bán tỷ
                        if (item.giaban_ty != null && CheckNumber(item.giaban_ty))
                        {
                            dangtin.gia_ban_ty = item.giaban_ty.ToString();
                            dangtin.gia_ban_ty_key = "estate_attr_price";
                          
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price", meta_value = item.giaban_ty.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price", meta_value = "myhome_estate_attr_price" });
                        }
                        if (item.giaban_trieu != null && CheckNumber(item.giaban_trieu))
                        {
                            dangtin.gia_ban_trieu = item.giaban_trieu.ToString();
                            dangtin.gia_ban_trieu_key = "estate_attr_price_5";
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_5", meta_value = item.giaban_trieu.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_5", meta_value = "myhome_estate_attr_price_5" });
                        }
                        if (item.giaban_usd != null && CheckNumber(item.giaban_usd))
                        {
                            dangtin.gia_ban_usd = item.giaban_usd.ToString();
                            dangtin.gia_ban_usd_key = "estate_attr_price_7";
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_7", meta_value = item.giaban_usd.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_7", meta_value = "myhome_estate_attr_price_7" });
                        }
                        if (item.giathue_ty != null && CheckNumber(item.giathue_ty))
                        {
                            dangtin.gia_thue_ty = item.giathue_ty.ToString();
                            dangtin.gia_thue_ty_key = "estate_attr_price_offer_132";
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_offer_132", meta_value = item.giathue_ty.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_offer_132", meta_value = "myhome_estate_attr_price_offer_132" });
                        }
                        if (item.giathue_trieu != null && CheckNumber(item.giathue_trieu))
                        {
                            dangtin.gia_thue_trieu = item.giathue_trieu.ToString();
                            dangtin.gia_thue_trieu_key = "estate_attr_price_5_offer_132";
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_5_offer_132", meta_value = item.giathue_trieu.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_5_offer_132", meta_value = "myhome_estate_attr_price_5_offer_132" });
                        }
                        if (item.giathue_usd != null && CheckNumber(item.giathue_usd))
                        {
                            dangtin.gia_thue_usd = item.giathue_usd.ToString();
                            dangtin.gia_thue_usd_key = "estate_attr_price_7_offer_132";
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_7_offer_132", meta_value = item.giathue_usd.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_7_offer_132", meta_value = "myhome_estate_attr_price_7_offer_132" });
                        }
                        if (!string.IsNullOrEmpty(item.DiaChi.address))
                        {
                            Hashtable hash = new Hashtable();
                            hash.Add("address", item.DiaChi.address);
                            dangtin.dia_chi = item.DiaChi.address;
                            dangtin.dia_chi_key = "estate_location";
                            hash.Add("lat", item.DiaChi.lat.ToString());
                            hash.Add("lng", item.DiaChi.lng.ToString());
                            hash.Add("zoom", item.DiaChi.zoom.ToString());
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_location", meta_value = serializerPHP.Serialize(hash) });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_location", meta_value = "myhome_estate_location" });
                        }
                        if (!string.IsNullOrEmpty(item.VideoLink))
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_video", meta_value = item.VideoLink });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_video", meta_value = "myhome_estate_video" });
                        }
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_plans", meta_value = "" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_plans", meta_value = "myhome_estate_plans" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attachments", meta_value = null });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attachments", meta_value = "myhome_estate_attachments" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_featured", meta_value = "0" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_edit_lock", meta_value = "1601911919:12" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_edit_last", meta_value = "12" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_featured", meta_value = "myhome_estate_featured" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_5_offer_148", meta_value = "555555" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_5_offer_148", meta_value = "myhome_estate_attr_price_5_offer_148" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_7_offer_148", meta_value = "888888" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_7_offer_148", meta_value = "myhome_estate_attr_price_7_offer_148" });
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_attribute_22", meta_value = "" });
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_attribute_22", meta_value = "myhome_estate_attr_attribute_22" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "virtual_tour", meta_value = "" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_virtual_tour", meta_value = "myhome_estate_virtual_tour" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_sidebar_elements", meta_value = "" });
                        //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_sidebar_elements", meta_value = "myhome_estate_sidebar_elements" });
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "slide_template", meta_value = "default" });
                       
                        if (item.TinhNang!=null)
                        {
                            var tinhnang = item.TinhNang;
                            int dem = tinhnang.Count;
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_additional_features", meta_value = dem.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_additional_features", meta_value = "myhome_estate_additional_features" });
                            dem = 0;
                            foreach (var it in tinhnang)
                            {
                                addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_additional_features_" + dem + "_estate_additional_feature_name", meta_value = it.id });
                                addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_additional_features_" + dem + "_estate_additional_feature_name", meta_value = "myhome_estate_additional_feature_name" });
                                addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_additional_features_" + dem + "_estate_additional_feature_value", meta_value = it.value });
                                addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_additional_features_" + dem + "_estate_additional_feature_value", meta_value = "myhome_estate_additional_feature_value" });
                                dem++;
                            }
                        }
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_gallery", meta_value = "myhome_estate_gallery" });
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "essb_cache_expire", meta_value = "1601752174" });
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "myhome_agents", meta_value = "a:0:{}" });
                        // so phong ngu
                        // add wp_term_relationships
                        List<wp_term_relationships> liswp_terms = new List<wp_term_relationships>();
                        if (item.DuAn != null && item.DuAn > 0)
                        {
                            dangtin.du_an = item.DuAn;
                            dangtin.du_an_key = "du-an";
                            liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.DuAn.Value, term_order = 0 });
                        }
                        if (item.LoaiBanGiao != null && item.LoaiBanGiao > 0)
                        {
                            dangtin.loai_ban_giao = (long)item.LoaiBanGiao;
                            dangtin.loai_ban_giao_key = "loai-ban-giao";
                            liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.LoaiBanGiao.Value, term_order = 0 });
                        }
                        if (item.ChuDauTu != null && item.ChuDauTu > 0)
                        {
                            dangtin.chu_dau_tu = item.ChuDauTu;
                            dangtin.chu_dau_tu_key = "chu-dau-tu";
                            liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.ChuDauTu.Value, term_order = 0 });
                        }
                        if (item.HuongCua != null && item.HuongCua > 0)
                        {
                            dangtin.huong = item.HuongCua;
                            dangtin.huong_key = "huong";
                            liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.HuongCua.Value, term_order = 0 });
                        }
                        if (item.Vi_Tri != null && item.Vi_Tri > 0)
                        {
                            dangtin.vi_tri = (long)item.Vi_Tri;
                            dangtin.vi_tri_key = "vi-tri";
                            liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.Vi_Tri.Value, term_order = 0 });
                        }
                        if (item.View != null && item.View > 0)
                        {
                            dangtin.views = item.View;
                            dangtin.views_key = "views";
                            liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.View.Value, term_order = 0 });
                        }
                        if (!string.IsNullOrEmpty(item.LoaiKinhDoanh))
                        {
                            string[] arr = item.LoaiKinhDoanh.Split(',');
                            foreach(string s in arr)
                            {
                                liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = decimal.Parse(s), term_order = 0 });
                            }
                            dangtin.loai_kinh_doanh = item.LoaiKinhDoanh;
                            dangtin.loai_kinh_doanh_key = "loai-kinh-doanh";
                        }
                        if (item.TinhTrangCH != null && item.TinhTrangCH > 0)
                        {
                            dangtin.trang_thai = item.TinhTrangCH;
                            dangtin.trang_thai_key = "trang-thai";
                            liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.TinhTrangCH.Value, term_order = 0 });
                        }
                        if (item.LoaiCH != null && item.LoaiCH > 0)
                        {
                            dangtin.loai = item.LoaiCH;
                            dangtin.loai_key = "loai";
                            liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.LoaiCH.Value, term_order = 0 });
                        }
                        db.wp_postmeta.AddRange(addmeta);
                        db.wp_term_relationships.AddRange(liswp_terms);
                        if (await db.SaveChangesAsync() > 0)
                        {
                            FTPUpload upload = new FTPUpload();
                            local_path = Server.MapPath("~/Content/upload/dangtin/imgs/" + item.imgs_key);
                            var cauhinh = db.dl_configs.Where(m => m.con_key.Contains("ftp_") || m.con_key == "wp-content").ToList();
                            string server_path = "dang-tin/" + add.ID.ToString().Replace(".0", "") + "/";
                            var kq = upload.Upload(cauhinh, local_path, server_path);
                            if (kq.rs_code == 1)
                            {
                                ArrayList list = new ArrayList();
                                string[] sFile = Directory.GetFiles(local_path, "*.*", SearchOption.AllDirectories);
                                if (sFile.Length > 0)
                                {
                                    string wp_content = cauhinh.FirstOrDefault(m => m.con_key == "wp-content").con_value + server_path;
                                    for (int i = 0; i < sFile.Length; i++)
                                    {
                                        string fileName = Path.GetFileName(sFile[i]);
                                        FileInfo fi = new FileInfo(local_path + @"\" + fileName);
                                        if ((fileName == item.HinhDaiDien)||(string.IsNullOrEmpty(item.HinhDaiDien)&&i==0))
                                        {
                                          
                                            wp_posts add_thum = new wp_posts();
                                            add_thum.post_author = nguoidung.NguoiDung;
                                            add_thum.post_date = DateTime.Now;
                                            add_thum.post_date_gmt = DateTime.Now;
                                            add_thum.post_modified = DateTime.Now;
                                            add_thum.post_modified_gmt = DateTime.Now;
                                            add_thum.post_content = (fi.Length / 1024).ToString() + " KB";
                                            add_thum.post_title = fileName;
                                            add_thum.post_status = "publish";
                                            add_thum.comment_status = "closed";
                                            add_thum.ping_status = "closed";
                                            add_thum.post_name = add.post_name;
                                            add_thum.post_type = "attachment";
                                            add_thum.post_excerpt = "";
                                            add_thum.post_password = "";
                                            add_thum.to_ping = "";
                                            add_thum.pinged = "";
                                            add_thum.post_content_filtered = "";
                                            add_thum.guid = wp_content + fileName;
                                            add_thum.post_mime_type = MimeMapping.GetMimeMapping(fileName);
                                            add_thum.post_parent = add.ID;
                                            db.wp_posts.Add(add_thum);
                                            await db.SaveChangesAsync();
                                            db.wp_postmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_thumbnail_id", meta_value = add_thum.ID.ToString().Replace(".0", "") });
                                            db.wp_postmeta.Add(new wp_postmeta { post_id = add_thum.ID, meta_key = "_wp_attached_file", meta_value = server_path + fileName });
                                            dangtin.hinh_dai_dien = wp_content + fileName;
                                            dangtin.hinh_dai_dien_key = "_thumbnail_id";
                                            db.wp_postmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "essb_cached_image", meta_value = wp_content + fileName });
                                        }
                                        wp_posts add_att = new wp_posts();
                                        add_att.post_author = nguoidung.NguoiDung;
                                        add_att.post_date = DateTime.Now;
                                        add_att.post_date_gmt = DateTime.Now;
                                        add_att.post_modified = DateTime.Now;
                                        add_att.post_modified_gmt = DateTime.Now;
                                        add_att.post_content = (fi.Length / 1024).ToString() + " KB";
                                        add_att.post_title = fileName;
                                        add_att.post_status = "publish";
                                        add_att.comment_status = "closed";
                                        add_att.ping_status = "closed";
                                        add_att.post_name = add.post_name;
                                        add_att.post_type = "attachment";
                                        add_att.post_excerpt = "";
                                        add_att.post_password = "";
                                        add_att.to_ping = "";
                                        add_att.pinged = "";
                                        add_att.post_content_filtered = "";
                                        add_att.guid = wp_content + fileName;
                                        add_att.post_mime_type = MimeMapping.GetMimeMapping(fileName);
                                        db.wp_posts.Add(add_att);
                                        await db.SaveChangesAsync();
                                        db.wp_postmeta.Add(new wp_postmeta { post_id = add_att.ID, meta_key = "_wp_attached_file", meta_value = server_path + fileName });
                                        list.Add(add_att.ID.ToString());
                                    }
                                    if (list.Count > 0)
                                    {
                                        db.wp_postmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_gallery", meta_value = serializerPHP.Serialize(list) });
                                        await db.SaveChangesAsync();
                                    }
                                }
                            }
                            dangtin.ngay_khoi_tao = DateTime.Now;
                            db.dl_dangtin.Add(dangtin);

                            dl_historys hst = new dl_historys();
                            hst.Key = dangtin.id.ToString();
                            hst.NguoiDung = nguoidung.NguoiDung;
                            hst.Ngay = DateTime.Now;
                            hst.Content = Logchange.Insert(dangtin, "dl_dangtin");
                            hst.LinkView = Url.Action("Edit", "DangTin") + "?id=" + hst.Key;
                            hst.Type = "Thêm đăng tin";
                            hst.TableName = "dl_dangtin";
                            Logchange.SaveLogChange(db, hst);
                            await db.SaveChangesAsync();
                            tran.Complete();
                        }
                    }
                    try
                    {
                        Directory.Delete(local_path, true);
                    }
                    catch { }
                    r.rs_code = (int)add.ID;
                    r.rs_text = "Thêm mới thành công";
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
                r.rs_code = 0;
                r.rs_text = sb.ToString();
            }
            return Json(r);
        }
        [RoleAuthorize(Roles = "0=0,30=1")]
        public async Task<ActionResult> Edit(decimal id)
        {
            try
            {
                Directory.Delete(Server.MapPath("~/Content/upload/dangtin/imgs/" + id),true);
               
            }
            catch {

            }
            try
            {
                Directory.Delete(Server.MapPath("~/Content/upload/dangtin/json/" + id), true);
            }
            catch { }
            var model = new DangTin();
            var posts = await db.wp_posts.FirstOrDefaultAsync(m => m.ID == id);
            if (!User.IsInRole("71=1"))
            {
                var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                if (posts.post_author != nguoidung.NguoiDung)
                {
                    return Content("Thông tin đăng tin " + id.ToString() + " bạn không có quyền thao tác");
                }
            }
            model.ID = posts.ID;
            model.TieuDe = posts.post_title;
            model.NoiDung = posts.post_content;
            var postmeta = await db.wp_postmeta.Where(it => it.post_id == id).ToListAsync();
            var term = (from a in db.wp_term_relationships
                        join b in db.wp_term_taxonomy on a.term_taxonomy_id equals b.term_taxonomy_id
                        where a.object_id == id
                        select new { b.term_id, b.taxonomy }).ToList();
            foreach (var item in term)
            {
                decimal term_id = item.term_id;
                if (item.taxonomy == "du-an")
                    model.DuAn = term_id;
                if (item.taxonomy == "chu-dau-tu")
                    model.ChuDauTu = term_id;
                if (item.taxonomy == "huong")
                    model.HuongCua = (int)term_id;
                if (item.taxonomy == "trang-thai")
                    model.TinhTrangCH = term_id;
                if (item.taxonomy == "loai")
                    model.LoaiCH = term_id;
                if (item.taxonomy == "views")
                    model.View = term_id;
                if (item.taxonomy == "vi-tri")
                    model.Vi_Tri = term_id;
                if (item.taxonomy == "loai-ban-giao")
                    model.LoaiBanGiao = term_id;
             
            }

            model.LoaiKinhDoanh = string.Join(",", term.Where(m => m.taxonomy == "loai-kinh-doanh").Select(m => m.term_id.ToString()).ToList());
            var meta = await db.wp_postmeta.Where(m => m.post_id == id).ToListAsync();
            SerializerPHP serializerPHP = new SerializerPHP();
            foreach (var item in meta)
            {
                string value = item.meta_value;
                if (!string.IsNullOrEmpty(value))
                {
                    if (item.meta_key == "estate_attr_bedrooms")
                        model.SoPN = value;
                    //string SoWC = meta.FirstOrDefault(it => it.meta_key == "estate_attr_bathrooms").meta_value;
                    if (item.meta_key == "estate_attr_bathrooms")
                        model.SoWC = value;
                    if (item.meta_key == "estate_attr_property-size")
                        model.DienTich = int.Parse(value);
                    if (item.meta_key == "estate_attr_price")
                        model.giaban_ty = (value);
                    if (item.meta_key == "estate_attr_price_5")
                        model.giaban_trieu = (value);
                    if (item.meta_key == "estate_attr_price_7")
                        model.giaban_usd = (value);
                    if (item.meta_key == "estate_attr_price_offer_132")
                        model.giathue_ty = (value);
                    if (item.meta_key == "estate_attr_price_5_offer_132")
                        model.giathue_trieu = (value);
                    if (item.meta_key == "estate_attr_price_7_offer_132")
                        model.giathue_usd = (value);
                    if (item.meta_key == "estate_video")
                        model.VideoLink = value;
                    if (item.meta_key == "estate_location")
                    {
                        try
                        {
                            Hashtable loc = (Hashtable)serializerPHP.Deserialize(value);
                            model.DiaChi = new clsaddress() { address = loc["address"].ToString(), lat = decimal.Parse(loc["lat"].ToString()), lng = decimal.Parse(loc["lng"].ToString()), zoom = int.Parse(loc["zoom"].ToString()) };
                        }
                        catch
                        {
                        }
                    }
                    if (item.meta_key == "estate_additional_features")
                    {
                        int dem = int.Parse(value);
                        if (dem > 0)
                        {
                            List<clsTinhNang> tn = new List<clsTinhNang>();
                            for (int i = 0; i < dem; i++)
                            {
                                try
                                {
                                    tn.Add(new clsTinhNang()
                                    {
                                        id = meta.FirstOrDefault(m => m.meta_key == "estate_additional_features_" + i + "_estate_additional_feature_name").meta_value,
                                        value = meta.FirstOrDefault(m => m.meta_key == "estate_additional_features_" + i + "_estate_additional_feature_value").meta_value
                                    });
                                }
                                catch { }
                            }
                            model.TinhNang = tn;
                        }
                    }
                    if (item.meta_key == "_thumbnail_id")
                    {
                        if (!string.IsNullOrEmpty(value))
                        {
                            decimal thumid = decimal.Parse(value);
                            var itemHinh = db.wp_posts.FirstOrDefault(m => m.ID == thumid);
                            if (itemHinh != null)
                            {
                                model.HinhDaiDien = itemHinh.post_title;
                            }
                        }
                    }
                    if (item.meta_key == "estate_gallery")
                    {
                        if (!string.IsNullOrEmpty(value))
                        {
                            try
                            {
                                ArrayList arr = (ArrayList)serializerPHP.Deserialize(value);
                                string idSlide = string.Join(",", arr.ToArray());
                                string p = Server.MapPath("~/Content/upload/dangtin/json/" + id);
                                if (!System.IO.Directory.Exists(p))
                                {
                                    System.IO.Directory.CreateDirectory(p);
                                }
                             
                                var listHinh = db.Database.SqlQuery<wp_posts>("select  * from wp_posts where id in (" + idSlide + ")").ToList();
                                if(listHinh!=null&&listHinh.Count>0)
                                {
                                    System.IO.StreamWriter streamWriter = new System.IO.StreamWriter(p + "\\" + id + ".json", false);
                                    streamWriter.WriteLine(JsonConvert.SerializeObject(listHinh, Formatting.Indented));
                                    streamWriter.Flush();
                                    if (streamWriter != null)
                                    {
                                        streamWriter.Dispose();
                                        streamWriter.Close();
                                    }
                                }
                            }
                            catch(Exception ex)
                            {
                            }
                        }
                    }
                }
            }
            if (model.DiaChi == null)
            {
                model.DiaChi = new clsaddress() { zoom = 10 };
            }
            var configs = await db.dl_configs.Where(m => m.con_key == "dangtin_hinhtoida" || m.con_key == "dangtin_hinhtoithieu").ToListAsync();
            ViewBag.dangtin_hinhtoida = configs.FirstOrDefault(m => m.con_key == "dangtin_hinhtoida").con_value; ViewBag.dangtin_hinhtoithieu = configs.FirstOrDefault(m => m.con_key == "dangtin_hinhtoithieu").con_value;
            return View(model);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [ValidateInput(false)]
        public string GetNoiDung(decimal id)
        {
            return db.wp_posts.FirstOrDefault(m => m.ID == id).post_content;
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        [ValidateInput(false)]
        public async Task<JsonResult> UpdateSubmit(DangTin item)
        {
            ResponseStatus r = new ResponseStatus();
            string local_path = "";
            try
            {
                using (var tran = new TransactionScope())
                {
                    var dangtin = new dl_dangtin();
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    wp_posts add = db.wp_posts.FirstOrDefault(m => m.ID == item.ID);

                   
                    dangtin.id = (decimal)item.ID;
                    add.post_modified = DateTime.Now;
                    add.post_modified_gmt = DateTime.Now;
                    add.post_content = item.NoiDung;
                    add.post_title = item.TieuDe;
                    add.post_name = clsFunction.GenerateSlug(item.TieuDe);
                    // db.wp_posts.Add(add);
                    SerializerPHP serializerPHP = new SerializerPHP();
                    List<wp_postmeta> addmeta = new List<wp_postmeta>();
                    List<wp_postmeta> updatemeta = new List<wp_postmeta>();
                    var term = (from a in db.wp_term_relationships
                                join b in db.wp_term_taxonomy on a.term_taxonomy_id equals b.term_taxonomy_id
                                where a.object_id == item.ID
                                select new { b.term_id, b.taxonomy }).ToList();
                    var meta = await db.wp_postmeta.Where(m => m.post_id == item.ID).ToListAsync();
                    List<string> delete_meta = new List<string>(), delete_relationship = new List<string>();
                    //addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "post_editor", meta_value = nguoidung.ToString() });
                    if (!string.IsNullOrEmpty(item.SoPN))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_attr_bedrooms");
                        if (data != null)
                        {
                            data.meta_value = item.SoPN;
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_bedrooms", meta_value = item.SoPN });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_bedrooms", meta_value = "myhome_estate_attr_bedrooms" });
                        }
                        dangtin.phong_ngu = item.SoPN;
                        dangtin.phong_ngu_key = "estate_attr_bedrooms";
                    }
                    else
                    {
                        delete_meta.Add("'estate_attr_bedrooms'"); delete_meta.Add("'_estate_attr_bedrooms'");
                    }
                    if (!string.IsNullOrEmpty(item.SoWC))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_attr_bathrooms");
                        if (data != null)
                        {
                            data.meta_value = item.SoWC;
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_bathrooms", meta_value = item.SoWC });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_bathrooms", meta_value = "myhome_estate_attr_bathrooms" });
                        }
                        dangtin.wc = item.SoWC;
                        dangtin.wc_key = "estate_attr_bathrooms";
                    }
                    else
                    {
                        delete_meta.Add("'estate_attr_bathrooms'"); delete_meta.Add("'_estate_attr_bathrooms'");
                    }
                    if (item.DienTich != null && item.DienTich > 0)
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_attr_property-size");
                        if (data != null)
                        {
                            data.meta_value = item.DienTich.ToString();
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_property-size", meta_value = item.DienTich.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_property-size", meta_value = "myhome_estate_attr_property-size" });
                        }
                        dangtin.dien_tich = item.DienTich.ToString();
                        dangtin.dien_tich_key = "estate_attr_property-size";
                    }
                    else
                    {
                        delete_meta.Add("'estate_attr_property-size'"); delete_meta.Add("'_estate_attr_property-size'");
                    }
                    if (item.giaban_ty != null && CheckNumber(item.giaban_ty))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_attr_price");
                        if (data != null)
                        {
                            data.meta_value = item.giaban_ty.ToString();
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price", meta_value = item.giaban_ty.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price", meta_value = "myhome_estate_attr_price" });
                        }

                        dangtin.gia_ban_ty = item.giaban_ty.ToString();
                        dangtin.gia_ban_ty_key = "estate_attr_price";
                    }
                    else
                    {
                        delete_meta.Add("'estate_attr_price'"); delete_meta.Add("'_estate_attr_price'");
                    }
                    if (item.giaban_trieu != null && CheckNumber(item.giaban_trieu))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_attr_price_5");
                        if (data != null)
                        {
                            data.meta_value = item.giaban_trieu.ToString();
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_5", meta_value = item.giaban_trieu.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_5", meta_value = "myhome_estate_attr_price_5" });
                        }
                        dangtin.gia_ban_trieu = item.giaban_trieu.ToString();
                        dangtin.gia_ban_trieu_key = "estate_attr_price_5";
                    }
                    else
                    {
                        delete_meta.Add("'estate_attr_price_5'"); delete_meta.Add("'_estate_attr_price_5'");
                    }
                    if (item.giaban_usd != null && CheckNumber(item.giaban_usd))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_attr_price_7");
                        if (data != null)
                        {
                            data.meta_value = item.giaban_usd.ToString();
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_7", meta_value = item.giaban_usd.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_7", meta_value = "myhome_estate_attr_price_7" });
                        }
                        dangtin.gia_ban_usd = item.giaban_usd.ToString();
                        dangtin.gia_ban_usd_key = "estate_attr_price_7";
                    }
                    else
                    {
                        delete_meta.Add("'estate_attr_price_7'"); delete_meta.Add("'_estate_attr_price_7'");
                    }
                    if (item.giathue_ty != null && CheckNumber(item.giathue_ty))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_attr_price_offer_132");
                        if (data != null)
                        {
                            data.meta_value = item.giathue_ty.ToString();
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_offer_132", meta_value = item.giathue_ty.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_offer_132", meta_value = "myhome_estate_attr_price_offer_132" });
                        }
                        dangtin.gia_thue_ty = item.giathue_ty.ToString();
                        dangtin.gia_thue_ty_key = "estate_attr_price_offer_132";
                    }
                    else
                    {
                        delete_meta.Add("'estate_attr_price_offer_132'"); delete_meta.Add("'_estate_attr_price_offer_132'");
                    }
                    if (item.giathue_trieu != null && CheckNumber(item.giathue_trieu))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_attr_price_5_offer_132");
                        if (data != null)
                        {
                            data.meta_value = item.giathue_trieu.ToString();
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_5_offer_132", meta_value = item.giathue_trieu.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_5_offer_132", meta_value = "myhome_estate_attr_price_5_offer_132" });
                        }
                        dangtin.gia_thue_trieu = item.giathue_trieu.ToString();
                        dangtin.gia_thue_trieu_key = "estate_attr_price_5_offer_132";
                    }
                    else
                    {
                        delete_meta.Add("'estate_attr_price_5_offer_132'"); delete_meta.Add("'_estate_attr_price_5_offer_132'");
                    }
                    if (item.giathue_usd != null && CheckNumber(item.giathue_usd))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_attr_price_7_offer_132");
                        if (data != null)
                        {
                            data.meta_value = item.giathue_usd.ToString();
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_attr_price_7_offer_132", meta_value = item.giathue_usd.ToString() });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_attr_price_7_offer_132", meta_value = "myhome_estate_attr_price_7_offer_132" });
                        }
                        dangtin.gia_thue_usd = item.giathue_usd.ToString();
                        dangtin.gia_thue_usd_key = "estate_attr_price_7_offer_132";
                    }
                    else
                    {
                        delete_meta.Add("'estate_attr_price_7_offer_132'"); delete_meta.Add("'_estate_attr_price_7_offer_132'");
                    }
                    if (!string.IsNullOrEmpty(item.DiaChi.address))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_location");
                        Hashtable hash = new Hashtable();
                        hash.Add("address", item.DiaChi.address);
                        hash.Add("lat", item.DiaChi.lat.ToString());
                        hash.Add("lng", item.DiaChi.lng.ToString());
                        hash.Add("zoom", item.DiaChi.zoom.ToString());
                        if (data != null)
                        {
                            data.meta_value = serializerPHP.Serialize(hash);
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_location", meta_value = serializerPHP.Serialize(hash) });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_location", meta_value = "myhome_estate_location" });
                        }
                        dangtin.dia_chi = item.DiaChi.address;
                        dangtin.dia_chi_key = "estate_location";
                    }
                    else
                    {
                        delete_meta.Add("'estate_location'"); delete_meta.Add("'_estate_location'");
                    }
                    if (!string.IsNullOrEmpty(item.VideoLink))
                    {
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_video");
                        if (data != null)
                        {
                            data.meta_value = item.VideoLink.ToString();
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_video", meta_value = item.VideoLink });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_video", meta_value = "myhome_estate_video" });
                        }
                    }
                    else
                    {
                        delete_meta.Add("'estate_video'"); delete_meta.Add("'_estate_video'");
                    }
                    delete_meta.Add("'estate_additional_features'"); delete_meta.Add("'_estate_additional_features'");
                    var fe_model = meta.Where(m => m.meta_key.Contains("estate_additional_features_") || m.meta_key.Contains("_estate_additional_features_"));
                    foreach (var fe in fe_model)
                    {
                        delete_meta.Add("'" + fe.meta_key + "'");
                    }
                    if (item.TinhNang != null)
                    {
                        var tinhnang = item.TinhNang;
                        int dem = tinhnang.Count;
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_additional_features", meta_value = dem.ToString() });
                        addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_additional_features", meta_value = "myhome_estate_additional_features" });
                        dem = 0;
                        foreach (var it in tinhnang)
                        {
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_additional_features_" + dem + "_estate_additional_feature_name", meta_value = it.id });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_additional_features_" + dem + "_estate_additional_feature_name", meta_value = "myhome_estate_additional_feature_name" });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_additional_features_" + dem + "_estate_additional_feature_value", meta_value = it.value });
                            addmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_estate_additional_features_" + dem + "_estate_additional_feature_value", meta_value = "myhome_estate_additional_feature_value" });
                            dem++;
                        }
                    }
                    if (string.IsNullOrEmpty(item.HinhDaiDien))
                    {
                        delete_meta.Add("'_thumbnail_id'"); delete_meta.Add("'_wp_attached_file'");
                    }
                    // add wp_term_relationships
                    List<wp_term_relationships> liswp_terms = new List<wp_term_relationships>();
                    if (item.DuAn != null && item.DuAn > 0)
                    {
                        liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.DuAn.Value, term_order = 0 }); dangtin.du_an = item.DuAn;
                        dangtin.du_an_key = "du-an";
                    }
                    if (item.LoaiBanGiao != null && item.LoaiBanGiao > 0)
                    {
                        liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.LoaiBanGiao.Value, term_order = 0 });
                        dangtin.loai_ban_giao = (long)item.LoaiBanGiao;
                        dangtin.loai_ban_giao_key = "loai-ban-giao";
                    }
                    if (item.ChuDauTu != null && item.ChuDauTu > 0)
                    {
                        liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.ChuDauTu.Value, term_order = 0 }); dangtin.chu_dau_tu = item.ChuDauTu;
                        dangtin.chu_dau_tu_key = "chu-dau-tu";
                    }
                    if (item.HuongCua != null && item.HuongCua > 0)
                    {
                        liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.HuongCua.Value, term_order = 0 }); dangtin.huong = item.HuongCua;
                        dangtin.huong_key = "huong";
                    }
                    if (item.Vi_Tri != null && item.Vi_Tri > 0)
                    {
                        liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.Vi_Tri.Value, term_order = 0 }); dangtin.vi_tri = (long)item.Vi_Tri;
                        dangtin.vi_tri_key = "vi-tri";
                    }
                    if (item.View != null && item.View > 0)
                    {
                        liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.View.Value, term_order = 0 }); dangtin.views = item.View;
                        dangtin.views_key = "views";
                    }
                    if (!string.IsNullOrEmpty(item.LoaiKinhDoanh))
                    {
                        string[] arr = item.LoaiKinhDoanh.Split(',');
                        foreach (string s in arr)
                        {
                            liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = decimal.Parse(s), term_order = 0 });
                        }
                        dangtin.loai_kinh_doanh = item.LoaiKinhDoanh;
                        dangtin.loai_kinh_doanh_key = "loai-kinh-doanh";
                    }
                    if (item.TinhTrangCH != null && item.TinhTrangCH > 0)
                    {
                        liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.TinhTrangCH.Value, term_order = 0 }); dangtin.trang_thai = item.TinhTrangCH;
                        dangtin.trang_thai_key = "trang-thai";
                    }
                    if (item.LoaiCH != null && item.LoaiCH > 0)
                    {
                        liswp_terms.Add(new wp_term_relationships { object_id = add.ID, term_taxonomy_id = item.LoaiCH.Value, term_order = 0 }); dangtin.loai = item.LoaiCH;
                        dangtin.loai_key = "loai";
                    }
                    await db.SaveChangesAsync();
                    if (delete_meta.Count > 0)
                    {
                        db.Database.ExecuteSqlCommand("delete from wp_postmeta where meta_key in (" + string.Join(",", delete_meta.ToArray()) + ") and post_id=" + item.ID);
                    }
                    db.Database.ExecuteSqlCommand("delete from wp_term_relationships where object_id=" + item.ID);
                    db.wp_postmeta.AddRange(addmeta);
                    db.wp_term_relationships.AddRange(liswp_terms);
                    await db.SaveChangesAsync();
                    FTPUpload upload = new FTPUpload();
                    local_path = Server.MapPath("~/Content/upload/dangtin/imgs/" + item.imgs_key);
                    var cauhinh = db.dl_configs.Where(m => m.con_key.Contains("ftp_") || m.con_key == "wp-content").ToList();
                    string server_path = "dang-tin/" + add.ID.ToString().Replace(".0", "") + "/";
                    var kq = upload.Upload(cauhinh, local_path, server_path); ArrayList list = new ArrayList();
                    if (kq.rs_code == 1)
                    {

                      
                        string[] sFile = Directory.GetFiles(local_path, "*.*", SearchOption.AllDirectories);
                        if (sFile.Length > 0)
                        {
                            string wp_content = cauhinh.FirstOrDefault(m => m.con_key == "wp-content").con_value + server_path;
                            for (int i = 0; i < sFile.Length; i++)
                            {
                                string fileName = Path.GetFileName(sFile[i]);
                                FileInfo fi = new FileInfo(local_path + @"\" + fileName);
                                if (fileName == item.HinhDaiDien)
                                {
                                    db.wp_postmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "essb_cached_image", meta_value = wp_content + fileName });
                                    wp_posts add_thum = new wp_posts();
                                    add_thum.post_author = nguoidung.NguoiDung;
                                    add_thum.post_date = DateTime.Now;
                                    add_thum.post_date_gmt = DateTime.Now;
                                    add_thum.post_modified = DateTime.Now;
                                    add_thum.post_modified_gmt = DateTime.Now;
                                    add_thum.post_content = (fi.Length / 1024).ToString() + " KB";
                                    add_thum.post_title = fileName;
                                    add_thum.post_status = "publish";
                                    add_thum.comment_status = "closed";
                                    add_thum.ping_status = "closed";
                                    add_thum.post_name = add.post_name;
                                    add_thum.post_type = "attachment";
                                    add_thum.post_excerpt = "";
                                    add_thum.post_password = "";
                                    add_thum.to_ping = "";
                                    add_thum.pinged = "";
                                    add_thum.post_content_filtered = "";
                                    add_thum.guid = wp_content + fileName;
                                    add_thum.post_mime_type = MimeMapping.GetMimeMapping(fileName);
                                    add_thum.post_parent = add.ID;
                                    db.wp_posts.Add(add_thum);
                                    await db.SaveChangesAsync();
                                    var data = db.wp_postmeta.FirstOrDefault(m => m.post_id == add.ID && m.meta_key == "_thumbnail_id");
                                    if (data != null)
                                    {
                                        data.meta_value = add.ID.ToString();
                                        db.wp_postmeta.Add(data);
                                        db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                                    }
                                    else
                                    {
                                        db.wp_postmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_thumbnail_id", meta_value = add_thum.ID.ToString().Replace(".0", "") });
                                    }
                                    dangtin.hinh_dai_dien = wp_content + fileName;
                                    dangtin.hinh_dai_dien_key = "_thumbnail_id";
                                    db.wp_postmeta.Add(new wp_postmeta { post_id = add_thum.ID, meta_key = "_wp_attached_file", meta_value = server_path + fileName });
                                }
                                wp_posts add_att = new wp_posts();
                                add_att.post_author = nguoidung.NguoiDung;
                                add_att.post_date = DateTime.Now;
                                add_att.post_date_gmt = DateTime.Now;
                                add_att.post_modified = DateTime.Now;
                                add_att.post_modified_gmt = DateTime.Now;
                                add_att.post_content = (fi.Length / 1024).ToString() + " KB";
                                add_att.post_title = fileName;
                                add_att.post_status = "publish";
                                add_att.comment_status = "closed";
                                add_att.ping_status = "closed";
                                add_att.post_name = add.post_name;
                                add_att.post_type = "attachment";
                                add_att.post_excerpt = "";
                                add_att.post_password = "";
                                add_att.to_ping = "";
                                add_att.pinged = "";
                                add_att.post_content_filtered = "";
                                add_att.guid = wp_content + fileName;
                                add_att.post_mime_type = MimeMapping.GetMimeMapping(fileName);
                                db.wp_posts.Add(add_att);
                                await db.SaveChangesAsync();
                                db.wp_postmeta.Add(new wp_postmeta { post_id = add_att.ID, meta_key = "_wp_attached_file", meta_value = server_path + fileName });
                                list.Add(add_att.ID.ToString().Replace(".0", ""));
                            }
                            //if (list.Count > 0)
                            //{
                            //    db.wp_postmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_gallery", meta_value = serializerPHP.Serialize(list) });
                            //    await db.SaveChangesAsync();
                            //}
                        }

                    }
                    string p2 = Server.MapPath("~/Content/upload/dangtin/json/" + item.ID);
                    if (!System.IO.Directory.Exists(p2))
                    {
                        System.IO.Directory.CreateDirectory(p2);
                    }
                    string fi_old = p2 + @"\" + item.ID + ".json";
                    if (System.IO.File.Exists(fi_old))
                    {
                        var model = JsonConvert.DeserializeObject<List<wp_posts>>(System.IO.File.ReadAllText(fi_old));
                        foreach (var i in model)
                        {
                            if (i.post_title == item.HinhDaiDien)
                            {
                                var data = db.wp_postmeta.FirstOrDefault(m => m.post_id == add.ID && m.meta_key == "_thumbnail_id");
                                if (data != null)
                                {
                                    data.meta_value = i.ID.ToString().Replace(".0", "");
                                    db.wp_postmeta.Add(data);
                                    db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                                }
                                else
                                {
                                    db.wp_postmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "_thumbnail_id", meta_value = i.ID.ToString().Replace(".0", "") });
                                }
                                dangtin.hinh_dai_dien = i.guid;
                                dangtin.hinh_dai_dien_key = "_thumbnail_id";
                                var data2 = db.wp_postmeta.FirstOrDefault(m => m.post_id == add.ID && m.meta_key == "essb_cached_image");


                                if (data2 != null)
                                {
                                    data2.meta_value = i.guid;
                                    db.wp_postmeta.Add(data2);
                                    db.Entry(data2).State = System.Data.Entity.EntityState.Modified;
                                }
                                else
                                {

                                    db.wp_postmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "essb_cached_image", meta_value = i.guid });
                                    await db.SaveChangesAsync();
                                }

                            }
                            list.Add(i.ID.ToString().Replace(".0", ""));
                        }
                    }
                    if (list.Count > 0)
                    {
                       
                        var data = meta.FirstOrDefault(m => m.meta_key == "estate_gallery");
                        if (data != null)
                        {
                            data.meta_value = serializerPHP.Serialize(list);
                            db.wp_postmeta.Add(data);
                            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            db.wp_postmeta.Add(new wp_postmeta { post_id = add.ID, meta_key = "estate_gallery", meta_value = serializerPHP.Serialize(list) });
                        }
                        await db.SaveChangesAsync();
                    }
                    var dangtintem = db.dl_dangtin.FirstOrDefault(it => it.id == item.ID);
                    dl_historys hst = new dl_historys();
                    hst.Type = "Chỉnh sửa đăng tin ";
                    hst.TableName = "dl_dangtin";
                    hst.Ngay = DateTime.Now;
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.Key = item.ID.ToString();
                    hst.LinkView = Url.Action("Edit", "DangTin") + "?id=" + hst.Key;
                    hst.Content = Logchange.Edit(dangtin, dangtintem, "dl_dangtin");
                    Logchange.SaveLogChange(db,hst);

                    //await db.Database.ExecuteSqlCommandAsync("delete from  dl_dangtin where id=" + item.ID);
                    dangtin.NguoiDung = dangtintem.NguoiDung;
                    db.dl_dangtin.Remove(dangtintem);
                    dangtin.ngay_khoi_tao = DateTime.Now;
                    db.dl_dangtin.Add(dangtin);
                    await db.SaveChangesAsync();
                    tran.Complete();
                    try
                    {
                       
                        Directory.Delete(local_path, true);
                        Directory.Delete(p2, true);
                    }
                    catch { }
                    r.rs_code = 1;
                    r.rs_text = "Cập nhật thành công";
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
                r.rs_code = 0;
                r.rs_text = sb.ToString();
            }
            return Json(r);
        }
        #endregion
        public JsonResult UploadImages(string id)
        {
            int StatusCode = 0;
            try
            {
                string p = Server.MapPath("~/Content/upload/dangtin/imgs/" + id);
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
                string p = Server.MapPath("~/Content/upload/dangtin/imgs/" + id);
                clsFunction fn = new clsFunction();
                return Json(fn.GetFile(p, "/Content/upload/dangtin/imgs/" + id + "/"), JsonRequestBehavior.AllowGet);
            }
            else
            {
                string p = Server.MapPath("~/Content/upload/dangtin/imgs/" + id);
                clsFunction fn = new clsFunction();
                List<FileModel> f = fn.GetFile(p, "/Content/upload/dangtin/imgs/" + id + "/");
                string p2 = Server.MapPath("~/Content/upload/dangtin/json/" + id);
                if (!System.IO.Directory.Exists(p2))
                {
                    System.IO.Directory.CreateDirectory(p2);
                }
                string fi = p2 + @"\" + post + ".json";
                if (System.IO.File.Exists(fi))
                {
                    var model = JsonConvert.DeserializeObject<List<wp_posts>>(System.IO.File.ReadAllText(fi));
                    foreach (var item in model)
                    {
                        if (item.post_status == "publish")
                            f.Add(new FileModel()
                            {
                                id = item.ID,
                                fileName = item.post_title,
                                size = item.post_content.Length < 10 ? item.post_content : "",
                                url = item.guid
                            });
                    }
                }
                return Json(f, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult XoaFileLocal(string id, string file)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                string p = Server.MapPath("~/Content/upload/dangtin/imgs/" + id);
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
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult XoaFile(decimal id, string file, decimal post)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                string p2 = Server.MapPath("~/Content/upload/dangtin/json/" + id);
                if (!System.IO.Directory.Exists(p2))
                {
                    System.IO.Directory.CreateDirectory(p2);
                }
                string fi = p2 + @"\" + id + ".json";
                if (System.IO.File.Exists(fi))
                {
                    var model = JsonConvert.DeserializeObject<List<wp_posts>>(System.IO.File.ReadAllText(fi));
                    var file_xoa = model.FirstOrDefault(m => m.ID == post);
                    FTPUpload upload = new FTPUpload();
                   
                    var cauhinh = db.dl_configs.Where(m => m.con_key.Contains("ftp_") || m.con_key == "wp-content").ToList();
                    string server_path = "dang-tin/" + id.ToString().Replace(".0", "") + "/"+ file;
                    var kq = upload.Delete(cauhinh, server_path);
                    model.Remove(file_xoa);
                    db.Database.ExecuteSqlCommand("delete from wp_posts where id=" + file_xoa.ID + ";delete from wp_postmeta where meta_key='essb_cached_image' and post_id=" + id + " and meta_value='" + file_xoa.guid + "';delete from wp_postmeta where meta_key='_thumbnail_id' and post_id=" + id + " and meta_value='" + post + "' ");
                    var data = db.wp_postmeta.FirstOrDefault(m =>m.post_id==id&& m.meta_key == "estate_gallery");
                    if (data != null)
                    {
                        ArrayList list = new ArrayList();
                        foreach(var item in model)
                        {
                            list.Add(item.ID.ToString());
                        }
                        SerializerPHP serializerPHP = new SerializerPHP();
                        data.meta_value = serializerPHP.Serialize(list);
                        db.wp_postmeta.Add(data);
                        db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                    }
                    System.IO.StreamWriter streamWriter = new System.IO.StreamWriter(fi, false);
                    streamWriter.WriteLine(JsonConvert.SerializeObject(model, Formatting.Indented));
                    streamWriter.Flush();
                    if (streamWriter != null)
                    {
                        streamWriter.Dispose();
                        streamWriter.Close();
                    }
                }
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
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,31=1")]
        public JsonResult AnTinDang(string id)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                db.Database.ExecuteSqlCommandAsync("update  wp_posts set post_status='trash',post_modified=now(),post_modified_gmt=now() where id in("+id+")");
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
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,32=1")]
        public JsonResult KhoiPhucTinDang(string id)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                db.Database.ExecuteSqlCommandAsync("update  wp_posts set post_status='publish',post_name=replace(post_name,'__trashed',''),post_modified=now(),post_modified_gmt=now() where id in(" + id + ")");
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
        [ValidateAntiForgeryToken]
        [RoleAuthorize(Roles = "0=0,33=1")]
        public JsonResult XoaTinDang(string id)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                decimal idtem = -1;
                try
                {
                    idtem = decimal.Parse(id);
                }
                catch { }
                var del = db.dl_dangtin.FirstOrDefault(it => it.id == idtem);
                if (del != null)
                {
                    var nguoidung = Users.GetNguoiDung(User.Identity.Name);
                    dl_historys hst = new dl_historys();
                    hst.Key = id;
                    hst.Type = "Xóa đăng tin";
                    hst.TableName = "dl_dangtin";
                    hst.Content = Logchange.Insert(del, "dl_dangtin");
                    hst.NguoiDung = nguoidung.NguoiDung;
                    hst.Ngay = DateTime.Now;
                    hst.LinkView = "#";
                    Logchange.SaveLogChange(db,hst);
                    db.SaveChanges();

                }
               
                db.Database.ExecuteSqlCommandAsync(string.Format("delete  from wp_posts where  id in ({0});delete  from wp_postmeta where post_id in ({0});delete  from  wp_term_relationships where object_id in({0});",id));
                r.rs_code = 1;
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = ex.Message;
            }
            return Json(r);
        }

        public bool CheckNumber(string s)
        {
            decimal dl = 0;
            bool bl = false;
            bl =  decimal.TryParse(s, out dl);
            return bl;
        }
    }
}