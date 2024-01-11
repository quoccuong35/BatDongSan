using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealEstate.Entity;

namespace RealEstate.Libs.Models
{
    public class ChiTietCanHo
    {
        public List<GhiChu> GhiChu { get; set; }
        public List<dl_canho_images> Images { get; set; }
        public List<dl_canho_lichsugia> LichSuGia { get; set; }
        public List<ChuNha> LichSuChuNha { get; set; }
        public v_canho CanHo { get; set; }
        public string HinhDaiDien { get; set; }
    }
    public class GhiChu :dl_canho_ghichu {
        public string TenLoai { get; set; }
        public string ThoiGian { get; set; }
    }
    public class ChuNha : dl_canho_chunha {
        public string TenChuNha { get; set; }
        public string NgayTao { get; set; }
    }
}