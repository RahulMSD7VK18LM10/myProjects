using AutoMapper;
using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CmsWebApi.Repository_DI
{
    public class ClaimRepository : IClaim
    {
        private readonly CMDbContext dbContext = null;
        private readonly IMapper mapper;
        public ClaimRepository(CMDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            
        }
        public async Task<int> AddClaim(ClaimModel cl)
        {
            var data = mapper.Map<ClaimSub>(cl);
            if(data != null)
            {
                dbContext.Claims.Add(data);
                await dbContext.SaveChangesAsync();
                return data.ClaimId;
            }
            else
            {
                return 0;
            }
        }

        public async Task<List<ClaimModel>> GetDetails()
        {
            var record = await dbContext.Claims.ToListAsync();
            if(record != null)
            {
                return mapper.Map<List<ClaimModel>>(record);
            }
            else
            {
                return null;
            }
        }

        public async Task<List<ClaimModel>> GetClaims(string id)
        {
            var data = await dbContext.Claims.Where(x => x.MemberId == id).ToListAsync();
            if(data != null)
            {
                return mapper.Map<List<ClaimModel>>(data);
            }
            else
            {
                return null;
            }
        }
    }
}
