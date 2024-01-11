using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;

namespace RealEstate.Libs
{
    public static class EMail
    {
        public static void SenMail(string Subject, string url, string To, string CC, string Body)
        {
            MailMessage msg = new MailMessage();
            SmtpClient smt = new SmtpClient();
            try
            {
                
                msg.From = new MailAddress("danhland2020@gmail.com");
                msg.To.Add(To);
                if (CC.Trim().Length > 0)
                {
                    msg.CC.Add(CC);
                }
                msg.Subject = Subject;
                msg.IsBodyHtml = true;
                msg.Body = Body;

               
                smt.Host = "smtp.gmail.com";
                smt.UseDefaultCredentials = false;
                System.Net.NetworkCredential ntwd = new NetworkCredential();
                ntwd.UserName = "danhland2020@gmail.com"; //Your Email ID  
                ntwd.Password = "Danhland@2020"; // Your Password  
                smt.Credentials = ntwd;
                smt.Port = 587;
                smt.EnableSsl = true;
              
                smt.Send(msg);
                smt.Dispose();
                msg.Dispose();


            }
            catch (Exception ex)
            {
                string s = ex.Message;
            }
            finally
            {
                msg.Dispose();
                smt.Dispose();
            }
        }
    }
}