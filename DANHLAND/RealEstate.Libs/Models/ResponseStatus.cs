using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RealEstate.Libs.Models
{
    public class ResponseStatus
    {
        public int rs_code { get; set; }
        public string rs_text { get; set; }
        public object rs_data { get; set; }
    }
}