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
    
    public partial class wp_wc_product_meta_lookup
    {
        public long product_id { get; set; }
        public string sku { get; set; }
        public Nullable<bool> @virtual { get; set; }
        public Nullable<bool> downloadable { get; set; }
        public Nullable<decimal> min_price { get; set; }
        public Nullable<decimal> max_price { get; set; }
        public Nullable<bool> onsale { get; set; }
        public Nullable<double> stock_quantity { get; set; }
        public string stock_status { get; set; }
        public Nullable<long> rating_count { get; set; }
        public Nullable<decimal> average_rating { get; set; }
        public Nullable<long> total_sales { get; set; }
        public string tax_status { get; set; }
        public string tax_class { get; set; }
    }
}