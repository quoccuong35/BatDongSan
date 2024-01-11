using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealEstate.Entity;

namespace RealEstate.Libs.Models
{
    public class CanHo:dl_canho
    {
        public List<GhiChu> listGhiChu { get; set; }
        public List<dl_canho_images> listImages { get; set; }
        public string imgs_key { get; set; }
        public string HinhDaiDien { get; set; }
    }
}