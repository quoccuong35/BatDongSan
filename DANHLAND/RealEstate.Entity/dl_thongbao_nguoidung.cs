//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RealEstate.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class dl_thongbao_nguoidung
    {
        public long id { get; set; }
        public int thongbao { get; set; }
        public decimal nguoidung { get; set; }
        public string Noidung { get; set; }
        public string Link { get; set; }
        public Nullable<bool> DaXem { get; set; }
        public Nullable<System.DateTime> Ngay { get; set; }
        public Nullable<decimal> NguoiTao { get; set; }
    }
}