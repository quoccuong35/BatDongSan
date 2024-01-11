using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealEstate.Entity;

namespace RealEstate.Libs.Models
{
    public class v_yeucau
    {
        public Int64 id { get; set; }
        public string ten_khach_hang { get; set; }
        public string so_dien_thoai { get; set; }
        public string sale { get; set; }
        public string ten_loai_nhu_cau { get; set; }
        public string dien_tich { get; set; }
        public string gia { get; set; }
        public string so_phong_ngu { get; set; }
        public string huong { get; set; }
        public string views { get; set; }
        public string tang { get; set; }
        public string ngay_tao { get; set; }
        public string du_kien_xem_nha { get; set; }
        public int trang_thai { get; set; }
    }
    public class list_yeucau
    {
        public int soyeucau { get; set; }
        public int yeucauchidinh { get; set; }
        public int dadixemcanho { get; set; }
        public int chuachidinh { get; set; }
        public List<v_yeucau> yeucau { get; set; }
    }
    public class v_yeucau_chi_tiet
    {
        public int id { get; set; }
        public string so_dien_thoai { get; set; }
        public string ten_khach_hang { get; set; }
        public string dia_chi { get; set; }
        public string zalo { get; set; }
        public string messenger { get; set; }
        public string nguon_khach { get; set; }
        public DateTime ngay_tao { get; set; }
        public int nguoi_tao { get; set; }
        public Nullable<System.DateTime> ngay_sua { get; set; }
        public Nullable<int> nguoi_sua { get; set; }
        public string so_phong_ngu { get; set; }
        public string email_khach_hang { get; set; }
        public string nghe_nghiep { get; set; }
        public string tang_thap_nhat { get; set; }
        public string tang_cao_nhat { get; set; }
        public string gia_tu { get; set; }
        public string gia_den { get; set; }
        public string ghi_chu { get; set; }
        public string nguoi_phu_trach { get; set; }
        public string views { get; set; }
        public string tien_ich_bo_sung { get; set; }
        public Nullable<System.DateTime> du_kien_xem_nha { get; set; }
        public decimal? dt_quan_tam_tu { get; set; }
        public decimal? dt_quan_tam_den { get; set; }
        public string ten_loai_nhu_cau { get; set; }
        public string huong_ban_cong { get; set; }
        public string huong_cua { get; set; }
        public int trang_thai { get; set; }
        public string ten_trang_thai { get; set; }
        public string du_an { get; set; }
    }

}