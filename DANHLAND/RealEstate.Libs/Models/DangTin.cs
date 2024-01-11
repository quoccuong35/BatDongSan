using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealEstate.Entity;

namespace RealEstate.Libs.Models
{
    public class DangTin
    {
        public decimal? ID { get; set; }
        public string TieuDe { get; set; }
        public decimal? DuAn { get; set; }
        public decimal? ChuDauTu { get; set; }
        public int? DienTich { get; set; }
        public string SoPN { get; set; }
        public string SoWC { get; set; }
        public decimal? View { get; set; }
        public string LoaiKinhDoanh { get; set; }
        public decimal? TinhTrangCH { get; set; }
        public decimal? LoaiCH { get; set; }
        public decimal? LoaiBanGiao { get; set; }
        public string VideoLink { get; set; }
        public string giaban_ty { get; set; }
        public string giaban_trieu { get; set; }
        public string giaban_usd { get; set; }
        public string giathue_ty { get; set; }
        public string giathue_trieu { get; set; }
        public string giathue_usd { get; set; }
        public string NoiDung { get; set; }
        public string HinhDaiDien { get; set; }
        public string ViTri { get; set; }
        public clsaddress DiaChi { get; set; }
        public int? HuongCua { get; set; }
        public string imgs_key{get; set;}
        public decimal? Vi_Tri { get; set; }
        public List<clsTinhNang> TinhNang { get; set; }
        public List<clsImg> HinhAnh { get; set; }
    }
    public class clsTinhNang
    {
        public string id { get; set; }
        public string value { get; set; }
    }
    public class clsImg
    {
        public string name { get; set; }
        public bool avatar { get; set; }
        public string note { get; set; }
    }
    public class clsaddress
    {
        public string address { get; set; }
        public decimal lat { get; set; }
        public decimal lng { get; set; }
        public int zoom { get; set; }
    }
    public class ChiTietDangTin
    {
        public Decimal Id { get; set; }
        public string TieuDe { get; set; }
        public string DuAn { get; set; }
        public string LoaiCanHo { get; set; }
        public string LoaiBanGiao { get; set; }
        public string PN { get; set; }
        public string WC { get; set; }
        public string DT { get; set; }
        public string Views { get; set; }
        public string HuongCua { get; set; }
        public string HuongBC { get; set; }
        public string GiaBan { get; set; }
        public string GiaThue { get; set; }
        public string TinhTrang { get; set; }
        public string MoTa { get; set; }
        public string NgayTao { get; set; }
        public string NgaySua { get; set; }
        public List<URLImage> listImage { get; set; }
    }
    public class URLImage
    {
        public Decimal Id { get; set; }
        public string Url { get; set; }
    }
}