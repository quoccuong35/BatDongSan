using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using RealEstate.Entity;
using System.Data;

namespace RealEstate.Libs
{
    public static class Logchange
    {
        private static PropertyInfo[] getPropertyInfo(string skey)
        {
            PropertyInfo[] properties = null;
            switch (skey)
            {
                case "dl_canho":
                    properties = typeof(dl_canho).GetProperties();
                    break;
                case "dl_yeucau":
                    properties = typeof(dl_yeucau).GetProperties();
                    break;
                case "dl_configs":
                    properties = typeof(dl_configs).GetProperties();
                    break;
                case "dl_canho_ghichu":
                    properties = typeof(dl_canho_ghichu).GetProperties();
                    break;
                case "dl_yeucau_trangthai":
                    properties = typeof(dl_yeucau_trangthai).GetProperties();
                    break;
                case "dl_canho_images":
                    properties = typeof(dl_canho_images).GetProperties();
                    break;
                case "dl_dangtin":
                    properties = typeof(dl_dangtin).GetProperties();
                    break;
                case "dl_loaiduan":
                    properties = typeof(dl_loaiduan).GetProperties();
                    break;
                case "dl_chudautu":
                    properties = typeof(dl_chudautu).GetProperties();
                    break;
                case "dl_dm_chunha":
                    properties = typeof(dl_dm_chunha).GetProperties();
                    break;
                case "dl_duan":
                    properties = typeof(dl_duan).GetProperties();
                    break;
                case "wp_users":
                    properties = typeof(wp_users).GetProperties();
                    break;
                case "dl_dm_tinhtrangcanho":
                    properties = typeof(dl_dm_tinhtrangcanho).GetProperties(); 
                    break;
                case "dl_dm_chunha_chitiet":
                    properties = typeof(dl_dm_chunha_chitiet).GetProperties();
                    break;
                case "wp_terms":
                    properties = typeof(wp_terms).GetProperties();
                    break;
                default:
                    break;
            }
            return properties;
        }
        public static string Insert<T>(this T objNew, string sKey)
        {
            PropertyInfo[] properties = getPropertyInfo(sKey);
            string changes = "";
            string name = string.Empty;

            string svalue1 = "";
            foreach (PropertyInfo pi in properties)
            {
                object value1 = typeof(T).GetProperty(pi.Name).GetValue(objNew, null);
                DisplayNameAttribute attr = (DisplayNameAttribute)pi.GetCustomAttribute(typeof(DisplayNameAttribute));
                if (value1 != null && value1.ToString().Trim() != "")
                {
                    svalue1 = value1.ToString().Trim();
                    name = pi.Name;
                    changes += string.Format("<li>{0}: <b style ='color:darkblue'>{1}</b></li> \n", name, svalue1);
                }
            }
            return changes;
        }
        
        public static string Edit<T>(this T objNew, T objOld,string sKey)
        {
            PropertyInfo[] properties = getPropertyInfo(sKey);
            string changes = "";
            string name = string.Empty;

            string svalue1 = "", svalue2 = "";

            foreach (PropertyInfo pi in properties)
            {
                object value1 = typeof(T).GetProperty(pi.Name).GetValue(objNew, null);
                object value2 = typeof(T).GetProperty(pi.Name).GetValue(objOld, null);
                DisplayNameAttribute attr = (DisplayNameAttribute)pi.GetCustomAttribute(typeof(DisplayNameAttribute));
                if (value1 == null || value1.ToString().Trim() == "")
                {
                    svalue1 = "không có dữ liệu";
                }
                else
                {
                    svalue1 = value1.ToString().Trim();
                }
                if (value2 == null || value2.ToString().Trim() == "")
                {
                    svalue2 = "không có dữ liệu";
                }
                else
                {
                    svalue2 = value2.ToString().Trim();
                }

                if (!svalue1.Equals(svalue2))
                {
                    if (attr == null)
                    {
                        name = pi.Name;
                    }
                    else
                    {
                        name = attr.DisplayName;
                    }
                    changes += string.Format("<li><b>{0}</b> changed from <b style ='color: red'>{1}</b> to <b style ='color:darkblue'>{2},</b></li> \n", name, svalue2, svalue1);
                }
            }
            return changes;
        }
        public static void  SaveLogChange(RealEstateEntities db,dl_historys item) {
            string action = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            string controllerName = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("controller");
            item.Controller = controllerName;
            item.Action = action;
            db.dl_historys.Add(item);
        }
        public static void SaveLogChangeList(RealEstateEntities db, List<dl_historys> item)
        {
            string action = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            string controllerName = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("controller");
            item.All(it =>  { it.Action = action; it.Controller = controllerName; return true; });
            db.dl_historys.AddRange(item);
        }

    }
}
