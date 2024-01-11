using RealEstate.Libs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Web;
using RealEstate.Entity;
namespace RealEstate.Libs
{
    public class ThongTinNguoiDung
    {
        public void SetNguoiDung(NguoiDungModel nguoiDung)
        {
            try
            {
                MemoryCache.Default.Add(nguoiDung.TaiKhoan, nguoiDung, DateTime.Now.AddDays(1));
            }
            catch
            {

            }
        }
        public NguoiDungModel GetNguoiDung(string Username)
        {
            try
            {
                return (NguoiDungModel)MemoryCache.Default.Get(Username);
            }
            catch
            {
                return null;
            }
        }
    }
    public class Users
    {

        public static void SetNguoiDung(NguoiDungModel nguoiDung)
        {
            ThongTinNguoiDung thongtin = new ThongTinNguoiDung();
            thongtin.SetNguoiDung(nguoiDung);
        }
        public static NguoiDungModel GetNguoiDung(string Username)
        {
            ThongTinNguoiDung thongtin = new ThongTinNguoiDung();
            var ng = thongtin.GetNguoiDung(Username);
            if (ng == null)
            {
                RealEstateEntities db = new RealEstateEntities();
                var nguoidung = db.v_users.FirstOrDefault(m => m.TaiKhoan == Username);
                ng = new NguoiDungModel();
                ng.NguoiDung = nguoidung.NguoiDung;
                ng.TaiKhoan = nguoidung.TaiKhoan;
                ng.MatKhau = nguoidung.MatKhau;
                ng.Email = nguoidung.Email;
                ng.TenHienThi = nguoidung.TenHienThi;
                ng.NhomNguoiDung = nguoidung.NhomNguoiDung;
                ng.TenNhomNguoiDung = nguoidung.TenNhomNguoiDung;
                SetNguoiDung(ng);
            }
            return ng;
        }
    }
}