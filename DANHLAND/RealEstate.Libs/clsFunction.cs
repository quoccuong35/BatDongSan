using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using MySql.Data.MySqlClient;
using RealEstate.Libs.Models;
namespace RealEstate.Libs
{
    public class clsFunction
    {
        public static string convertToUnSign3(string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }
        public static string GenerateSlug( string phrase)
        {
            string str =convertToUnSign3(phrase).ToLower().Replace(".","-");
            // invalid chars           
            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            // convert multiple spaces into once space   
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // cut and trim 
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            str = Regex.Replace(str, @"\s", "-"); // hyphens   
            return str;
        }
        public List<FileModel> GetFile(string p,string p2)
        {
          
            if (!Directory.Exists(p))
                Directory.CreateDirectory(p);
            string[] files = System.IO.Directory.GetFiles(p);
            List<FileModel> f = new List<FileModel>();
            foreach (string s in files)
            {
                System.IO.FileInfo fi = null;
                try
                {
                    fi = new System.IO.FileInfo(s);
                    f.Add(new FileModel()
                    {
                        id = 0,
                        fileName = fi.Name,
                        size = (fi.Length / 1024).ToString() + " KB",
                        url = p2 + fi.Name
                    });
                }
                catch (System.IO.FileNotFoundException e)
                {
                    Console.WriteLine(e.Message);
                    continue;
                }

            }
            return f;
        }
        public static Bitmap WatermarkImage(Bitmap image, Bitmap watermark)
        {
            using (Graphics imageGraphics = Graphics.FromImage(image))
            {
                watermark.SetResolution(imageGraphics.DpiX, imageGraphics.DpiY);

                //int x = (image.Width - watermark.Width) / 2 / 2;
                //int y = (image.Height - watermark.Height) / 2 / 2;

                //imageGraphics.DrawImage(watermark, x, image.Height - y, watermark.Width, watermark.Height);
                

                int x = (int)(image.Width * 0.1);
                int y = (int)(image.Height * 0.7);
                int tem = x + watermark.Width;
                while (x < image.Width)
                {
                    if (tem < image.Width)
                    {
                        imageGraphics.DrawImage(watermark, x, y, watermark.Width, watermark.Height);
                    }
                   
                    x = x+ watermark.Width + 30;
                    tem = x + watermark.Width;
                }
                   
            }

            return image;
        }
        public string GetConnectString(string sMainEntities)
        {
            string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings[sMainEntities].ConnectionString;
            if (cnnString.Contains("metadata"))
                cnnString = cnnString.Split('\"')[1];
            return cnnString;
        }
        public DataTable GetData(string sql,string sMainEntities)
        {
            MySqlConnection conn = null;
            MySqlCommand cmd = null;
            DataTable dataTable = new DataTable();

            try
            {
                conn = new MySqlConnection(GetConnectString(sMainEntities));

                cmd = new MySqlCommand(sql, conn);

                conn.Open();

                using (MySqlDataAdapter da = new MySqlDataAdapter(cmd))
                {
                    da.Fill(dataTable);
                }

            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                if (conn != null) conn.Close();
            }
            return dataTable;
        }
    }
}