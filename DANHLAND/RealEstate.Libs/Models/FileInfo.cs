using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RealEstate.Libs.Models
{
    public class FileModel
    {
        public decimal id { get; set; }
        public string fileName { get; set; }
        public string url { get; set; }
        public string size { get; set; }
        public bool islocal { get; set; }
    }
}