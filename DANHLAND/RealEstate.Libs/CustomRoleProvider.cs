using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using RealEstate.Entity;

namespace RealEstate.Libs
{
    public class CustomRoleProvider : RoleProvider
    {
        public CustomRoleProvider() { }

        public override string[] GetRolesForUser(string Usertname)
        {
            try
            {
                RealEstateEntities db = new RealEstateEntities();
                var list_quyen = db.Database.SqlQuery<string>(string.Format("SELECT DISTINCT Quyen FROM dl_phan_quyen WHERE IdDoiTuong in (SELECT id_nhom_nguoi_dung FROM dl_nguoidung_phanquyen_nhomnguoidung INNER JOIN v_users ON dl_nguoidung_phanquyen_nhomnguoidung.nguoi_dung = v_users.NguoiDung WHERE TaiKhoan = '{0}')", Usertname)).ToList();
                string q = string.Join("|", list_quyen);
                return q.Split('|');
            }
            catch
            {
                return new string[] { "" };
            }
        }
        public override bool IsUserInRole(string username, string roleName)
        {
            throw new NotImplementedException();
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}