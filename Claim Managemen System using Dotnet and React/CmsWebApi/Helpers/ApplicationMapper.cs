using AutoMapper;
using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;

namespace CmsWebApi.Helpers
{
    public class ApplicationMapper:Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Registration, RegistrationModel>().ReverseMap();
            CreateMap<Plan, PlanModel>().ReverseMap();
            CreateMap<ClaimSub, ClaimModel>().ReverseMap();
        }
    }
}
