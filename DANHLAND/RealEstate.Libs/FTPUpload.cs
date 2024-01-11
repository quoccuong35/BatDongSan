using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WinSCP;
using RealEstate.Entity;
using RealEstate.Libs.Models;
namespace RealEstate.Libs
{
    public class FTPUpload
    {
        public ResponseStatus Upload(List<dl_configs> cauhinh, string local,string server)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {

                string ftp_url = cauhinh.FirstOrDefault(m => m.con_key == "ftp_url").con_value,
                    ftp_user = cauhinh.FirstOrDefault(m => m.con_key == "ftp_user").con_value,
                    ftp_pass = HashPassword.Decrypt(cauhinh.FirstOrDefault(m => m.con_key == "ftp_pass").con_value.ToString()),
                    remotePath = cauhinh.FirstOrDefault(m => m.con_key == "ftp_path").con_value + server;
                SessionOptions sessionOptions = new SessionOptions
                {
                    Protocol = Protocol.Ftp,
                    HostName = ftp_url,
                    UserName = ftp_user,
                    Password = ftp_pass,
                    PortNumber = 5003
                };
                using (Session session = new Session())
                {
                    // Connect
                    session.Open(sessionOptions);

                    // Upload files
                    TransferOptions transferOptions = new TransferOptions();
                    transferOptions.TransferMode = TransferMode.Binary;
                    transferOptions.OverwriteMode = OverwriteMode.Overwrite;
                    TransferOperationResult transferResult;
                    try
                    {
                        session.CreateDirectory(remotePath);
                    }
                    catch (Exception ex) {
                        r.rs_code = 0;
                        r.rs_text = ex.Message;
                    }
                    transferResult =
                        session.PutFiles(local+@"\*", remotePath, false, transferOptions);

                    // Throw on any error
                    transferResult.Check();

                    // Print results
                    foreach (TransferEventArgs transfer in transferResult.Transfers)
                    {
                        Console.WriteLine("Upload of {0} succeeded", transfer.FileName);
                    }
                }
                r.rs_code = 1;
                r.rs_data = remotePath;
            }
            catch(Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = ex.Message;
            }
            return r;
        }
        public ResponseStatus Delete(List<dl_configs> cauhinh,  string server)
        {
            ResponseStatus r = new ResponseStatus();
            try
            {
                string ftp_url = cauhinh.FirstOrDefault(m => m.con_key == "ftp_url").con_value,
                    ftp_user = cauhinh.FirstOrDefault(m => m.con_key == "ftp_user").con_value,
                    ftp_pass = HashPassword.Decrypt(cauhinh.FirstOrDefault(m => m.con_key == "ftp_pass").con_value.ToString()), remotePath = cauhinh.FirstOrDefault(m => m.con_key == "ftp_path").con_value + server;
                SessionOptions sessionOptions = new SessionOptions
                {
                    Protocol = Protocol.Ftp,
                    HostName = ftp_url,
                    UserName = ftp_user,
                    Password = ftp_pass
                };
                using (Session session = new Session())
                {
                    // Connect
                    session.Open(sessionOptions);

                      session.RemoveFile(remotePath);

                }
                r.rs_code = 1;
                r.rs_data = remotePath;
            }
            catch (Exception ex)
            {
                r.rs_code = 0;
                r.rs_text = ex.Message;
            }
            return r;
        }
    }
}