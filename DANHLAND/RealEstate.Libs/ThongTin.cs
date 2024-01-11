using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using RealEstate.Entity;
namespace RealEstate.Libs
{
    public class ThongTin
    {
        public static object GetDanhMuc(string id)
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return (from term in db.wp_terms
                        join taxonomy in db.wp_term_taxonomy on term.term_id equals taxonomy.term_id
                        where taxonomy.taxonomy == id && term.name != "0"
                        select new { taxonomy.term_id, taxonomy.term_taxonomy_id, term.name }).ToList();
            }
        }
        public static string GetDanhMucString(string id)
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                var model = (from term in db.wp_terms
                             join taxonomy in db.wp_term_taxonomy on term.term_id equals taxonomy.term_id
                             where taxonomy.taxonomy == id && term.name != "0"
                             select new { taxonomy.term_id, taxonomy.term_taxonomy_id, term.name }).ToList();
                return JsonConvert.SerializeObject(model);
            }
        }
        public static string LoaiDanhMuc()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                var model = db.dl_dm_loai.ToList();
                return JsonConvert.SerializeObject(model);
            }
        }
        public static string GetSoPhongNgu()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.v_phong_ngu.ToList());
            }
        }
        public static string GetSoPhongWC()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.v_wc.ToList());
            }
        }
        public static string GetLoaiDuAn()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_loaiduan.Select(m=>new { m.ID,m.TenLoaiDuAn}).ToList());
            }
        }
        public static string GetTinhThanh()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_dm_tinh_thanh_pho.ToList());
            }
        }
        public static string GetTinhTrangDuAn()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_dm_tinhtrang_duan.ToList());
            }
        }
        public static string GetChuDauTu()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_chudautu.Select(m=>new { m.IdChuDauTu,m.TenChuDauTu}).ToList());
            }
        }
        public static string GetLoaiNhuCau()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_dm_loai_nhu_cau.ToList());
            }
        }
        public static string GetDuAn()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_duan.Where(m => m.an_duan != true).Select(m => new { m.duan, m.ten_duan }).ToList());
            }
        }
        public static string GetNguoiDung()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.v_users.Select(m => new { m.NguoiDung, m.TaiKhoan, m.TenHienThi, Ten = m.TaiKhoan + "_" + m.TenHienThi, m.TenNhomNguoiDung }).ToList());
            }
        }
        public static string GetTinhTrangNguoiDung()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_nguoidung_tinhtrang.Select(m => new { m.id_nguoidung_tinhtrang, m.ten_nguoidung_tinhtrang }).ToList());
            }
        }
        public static string GetLevelNhomNguoiDung()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_nhom_nguoi_dung_level.Select(m => new { m.id_level, m.ten_level }).ToList());
            }
        }
        public static string GetNhomNguoiDung()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_nhom_nguoi_dung.Select(m => new { m.id_nhom_nguoi_dung, m.ten_nhom_nguoi_dung }).ToList());
            }
        }
        public static string GetTrangThaiYeuCau()
        {
            using (RealEstateEntities db = new RealEstateEntities())
            {
                return JsonConvert.SerializeObject(db.dl_dm_trangthai_yeucau.ToList());
            }
        }
    }
}