using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CmsWebApi.Repository_DI
{
    public interface IClaim
    {
        Task<int> AddClaim(ClaimModel cl);
        Task<List<ClaimModel>> GetDetails();
        Task<List<ClaimModel>> GetClaims(string id);
    }
}
