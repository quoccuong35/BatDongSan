using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using RealEstate.Entity;

namespace RealEstate.Libs.Models
{
    public static class ThongBao
    {
        public static List<dl_thongbao_nguoidung> getThongBao(decimal nguoidung) {
            
            using (RealEstateEntities db = new RealEstateEntities()) {
                int ngayxem = 0;
                string[] where = { "ThoiGianThongBao", "Danhland" };
                var dlComfig = db.dl_configs.Where(it => where.Contains(it.con_key)).ToList();
                try
                {
                    ngayxem = int.Parse(dlComfig.FirstOrDefault(it=>it.con_key == "ThoiGianThongBao").con_value);
                }
                catch
                {

                }
                string urlWeb = dlComfig.FirstOrDefault(it => it.con_key == "Danhland").con_value;
                if (urlWeb == null || urlWeb == "")
                {
                    urlWeb = "#";
                }
                DateTime dtThongbao = DateTime.Now.AddDays(-ngayxem);
                List<dl_thongbao_nguoidung> thongBao = db.dl_thongbao_nguoidung.Where(it => it.nguoidung == nguoidung && it.Ngay >= dtThongbao).OrderByDescending(it=>it.Ngay).ToList();
                thongBao.All(it => { it.Link = urlWeb == "#" ? "#" : urlWeb + it.Link+ "&key="+ HashPassword.Encrypt(it.id.ToString()); return true; });
                return thongBao;
            }

        }
    }
}