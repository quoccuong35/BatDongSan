using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealEstate.Entity;

namespace RealEstate.Libs.Models
{
    public class clsChuNha
    {
        public dl_dm_chunha ChuNha { get; set; }
        public List<dl_dm_chunha_chitiet> ChuNhaThongTin { get; set; }
    }
}