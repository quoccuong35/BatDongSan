using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealEstate.Entity;
namespace RealEstate.Libs.Models
{
    public class ImportCanHo
    {
        public double IDCanHo { get; set; }
        public string DuAn { get; set; }
        public decimal IDDuAn { get; set; }
        public string Thap { get; set; }
        public string Tang { get; set; }
        public string SoCan { get; set; }
        public string TenChuNha { get; set; }
        public string LienHe { get; set; }
        public string TinhTrang { get; set; }
        public int IDTinhTrangCH { get; set; }
        public string LoaiCanHo { get; set; }
        public decimal IDLoaiCanHo { get; set; }
        public string LoaiBanGiao { get; set; }
        public decimal IDLoaiBanGiao { get; set; }
        public string PhongNgu { get; set; }
        public string WC { get; set; }
        public Nullable<double> DienTich { get; set; }
        public string DienTichS { get; set; }
        public string VIEW { get; set; }
        public string HuongCua { get; set; }
        public decimal? IDHuongCua { get; set; }
        public string HuongBanCong { get; set; }
         public decimal? IDHuongBanCong { get; set; }
        public string MatKhauCua { get; set; }
        public string GiaGoc { get; set; }
        public double? TienGiaGoc { get; set; } 
        public string GiaGocDVT { get; set; }
        public string GiaGocUSDS { get; set; }
        public double? GiaGocUSD { get; set; }
        public string GiaChuNhaGui { get; set; }
        public double? TienGiaChuNhaGui { get; set; }
        public string GiaChuNhaGuiDVT { get; set; }
        public string GiaChuNhaGuiUSDS { get; set; }
        public double? GiaChuNhaGuiUSD { get; set; }
        public string GiaChotBan { get; set; }
        public double? TienGiaChotBan { get; set; }
        public string GiaChotBanDVT { get; set; }
        public string GiaChotBanUSDS { get; set; }
        public double? GiaChotBanUSD { get; set; }
        public string GiaBan { get; set; }
        public double? TienGiaBan { get; set; }
        public string GiaBanDVT { get; set; }
        public string GiaBanUSDS { get; set; }
        public double? GiaBanUSD { get; set; }
        public string GiaThue { get; set; }
        public double? TienGiaThue { get; set; }
        public string GiaThueDVT { get; set; }
        public string GiaThueUSDS { get; set; }
        public double? GiaThueUSD { get; set; }
        public string GiaThueBaoPhi { get; set; }
        public double? TienGiaThueBaoPhi { get; set; }
        public string GiaThueBaoPhiDVT { get; set; }
        public string GiaThueBaoPhiUSDS { get; set; }
        public double? GiaThueBaoPhiUSD { get; set; }
        public string GhiChuAdmin { get; set; }
        public string GhiChuQuanLy { get; set; }
        public string GhiChuSales { get; set; }
        public string GhiChuCanHo { get; set; }
        public string QuocTich { get; set; }
        public string Loi { get; set; }
        //public List<canhoimport> import { get; set; }
        //public List<dl_canho> CanHo { get; set; }
        //public List<dl_dm_chunha> ChuNha { get; set; }
        //public List<dl_dm_chunha_chitiet> ChuNhaChiTiet { get; set; }
    }

}