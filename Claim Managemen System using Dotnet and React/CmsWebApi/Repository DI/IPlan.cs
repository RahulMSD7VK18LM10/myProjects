using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CmsWebApi.Repository_DI
{
    public interface IPlan
    {
        Task<int> AddPlan(PlanModel pl);
        Task<List<PlanModel>> GetDetails();
        Task<double> UpdatePlan(string id, PlanModel pl);
        Task<int> DeletePlan(int id);
        Task<PlanModel> GetById(string id);
    }
}
