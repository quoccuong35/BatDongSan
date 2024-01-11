using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace RealEstate
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
           name: "Unauthorized",
           url: "unauthorized/{action}/{id}",
           defaults: new { controller = "Error", action = "Unauthorized", id = UrlParameter.Optional }
       );
            routes.MapRoute(
             name: "Logout",
             url: "logout/{action}/{id}",
             defaults: new { controller = "Account", action = "Logout", id = UrlParameter.Optional }
         );
            routes.MapRoute(
             name: "Login",
             url: "login/{action}/{id}",
             defaults: new { controller = "Account", action = "Login", id = UrlParameter.Optional }
         );
            #region thông tin
            routes.MapRoute(name: "DuAn", url: "thong-tin/du-an", defaults: new { controller = "ThongTin", action = "DuAn", id = UrlParameter.Optional });
            routes.MapRoute(name: "LoaiDuAn", url: "thong-tin/loai-du-an", defaults: new { controller = "ThongTin", action = "LoaiDuAn", id = UrlParameter.Optional });
            routes.MapRoute(name: "ChuDauTu", url: "thong-tin/chu-dau-tu", defaults: new { controller = "ThongTin", action = "ChuDauTu", id = UrlParameter.Optional });
            routes.MapRoute(name: "ChuNha", url: "thong-tin/chu-nha", defaults: new { controller = "ThongTin", action = "ChuNha", id = UrlParameter.Optional });
            routes.MapRoute(name: "NhanVien", url: "thong-tin/nhan-vien", defaults: new { controller = "NhanVien", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute(name: "KhachHang", url: "thong-tin/khach-hang", defaults: new { controller = "ThongTin", action = "KhachHang", id = UrlParameter.Optional });
            routes.MapRoute(name: "KhachHangChiTiet", url: "thong-tin/khach-hang-chi-tiet", defaults: new { controller = "ThongTin", action = "KhachhangChiTiet", id = UrlParameter.Optional });
            routes.MapRoute(name: "TinhTrangCanHo", url: "thong-tin/tinh-trang-can-ho", defaults: new { controller = "ThongTin", action = "TinhTrangCanHo", id = UrlParameter.Optional });
            routes.MapRoute(name: "DanhMucDangTin", url: "thong-tin/dm-dang-tin", defaults: new { controller = "ThongTin", action = "DanhMucDangTin", id = UrlParameter.Optional });
            #endregion
            routes.MapRoute(name: "DanhSachDangTin", url: "dang-tin/danh-sach", defaults: new { controller = "DangTin", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute(name: "TaoMoi", url: "dang-tin/tao-moi", defaults: new { controller = "DangTin", action = "Create", id = UrlParameter.Optional });
            routes.MapRoute(name: "SuaTin", url: "dang-tin/chinh-sua", defaults: new { controller = "DangTin", action = "Edit", id = UrlParameter.Optional });
            routes.MapRoute(name: "ChiTietTinRao", url: "dang-tin/chi-tiet", defaults: new { controller = "ChiTietTinRao", action = "Create", id = UrlParameter.Optional });
            #region Căn hộ
            routes.MapRoute(name: "DanhSachCanHo", url: "can-ho/danh-sach-can-ho", defaults: new { controller = "CanHo", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute(name: "ChiTietCanHo", url: "can-ho/chi-tiet-can-ho", defaults: new { controller = "CanHo", action = "ChiTietCanHo", id = UrlParameter.Optional });
            routes.MapRoute(name: "CreateCanHo", url: "can-ho/them-moi-can-ho", defaults: new { controller = "CanHo", action = "Create", id = UrlParameter.Optional });
            routes.MapRoute(name: "EditGhiChu", url: "can-ho/chinh-sua-ghi-chu", defaults: new { controller = "CanHo", action = "EditGhiChu", id = UrlParameter.Optional });
            routes.MapRoute(name: "EditCanHo", url: "can-ho/chinh-sua-can-ho", defaults: new { controller = "CanHo", action = "Edit", id = UrlParameter.Optional });
            routes.MapRoute(name: "ImportExcel", url: "can-ho/Importexcel", defaults: new { controller = "CanHo", action = "ImportExcel", id = UrlParameter.Optional });
            #endregion
            #region Khách hàng gửi yêu cầu
            routes.MapRoute(name: "DanhSachGuiYeuCau", url: "yeu-cau/danh-sach", defaults: new { controller = "GuiYeuCau", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute(name: "TaoMoiYeuCau", url: "yeu-cau/tao-moi", defaults: new { controller = "GuiYeuCau", action = "TaoMoi", id = UrlParameter.Optional });
            routes.MapRoute(name: "ChinhSuaYeuCau", url: "yeu-cau/chinh-sua", defaults: new { controller = "GuiYeuCau", action = "ChinhSua", id = UrlParameter.Optional });
            routes.MapRoute(name: "ChiTietYeuCau", url: "yeu-cau/chi-tiet", defaults: new { controller = "GuiYeuCau", action = "ChiTiet", id = UrlParameter.Optional });
            routes.MapRoute(name: "ChiDinhCanHo", url: "yeu-cau/chi-dinh-can-ho", defaults: new { controller = "GuiYeuCau", action = "ChiDinhCanHo", id = UrlParameter.Optional });
            routes.MapRoute(name: "ChiTietThongBao", url: "yeu-cau/thong-bao", defaults: new { controller = "GuiYeuCau", action = "ChiTietThongBao", id = UrlParameter.Optional });
            #endregion
            #region Cai dat
            routes.MapRoute(name: "nhomnguoidung", url: "cai-dat/nhom-nguoi-dung", defaults: new { controller = "NhomNguoiDung", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute(name: "cauhinh", url: "cai-dat/cau-hinh", defaults: new { controller = "ThongTin", action = "CauHinh", id = UrlParameter.Optional });
            routes.MapRoute(name: "LichSu", url: "lich-su-thao-tac/danh-sach", defaults: new { controller = "History", action = "Index", id = UrlParameter.Optional });
            #endregion
            routes.MapRoute(name: "LichXemNha", url: "lich-xem-nha", defaults: new { controller = "LichXemNha", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
