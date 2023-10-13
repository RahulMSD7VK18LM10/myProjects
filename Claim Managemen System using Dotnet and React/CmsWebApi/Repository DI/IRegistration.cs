using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CmsWebApi.Repository_DI
{
    public interface IRegistration
    {
        Task<List<RegistrationModel>> GetDetails();
        Task<string> AddMember(RegistrationModel reg);
        Task<RegistrationModel> GetById(string id);
        Task<string> UpdateMember(string id, RegistrationModel reg);
        Task<string> DeleteMember(string id);
        Task<RegistrationModel> Login(string id,string pass);
        Task<string> ForgotPassword(string email);
        Task<string> ChangePassword(string uname, string password,string nPassword);

    }
}
