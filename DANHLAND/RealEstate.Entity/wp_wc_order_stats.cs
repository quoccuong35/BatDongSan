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
    
    public partial class wp_wc_order_stats
    {
        public decimal order_id { get; set; }
        public decimal parent_id { get; set; }
        public System.DateTime date_created { get; set; }
        public System.DateTime date_created_gmt { get; set; }
        public int num_items_sold { get; set; }
        public double total_sales { get; set; }
        public double tax_total { get; set; }
        public double shipping_total { get; set; }
        public double net_total { get; set; }
        public Nullable<bool> returning_customer { get; set; }
        public string status { get; set; }
        public decimal customer_id { get; set; }
    }
}
