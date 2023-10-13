using AutoMapper;
using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CmsWebApi.Repository_DI
{
    public class PlanRepository: IPlan
    {
        private readonly CMDbContext dbContext = null;
       private readonly IMapper mapper;

        public PlanRepository(CMDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;

        }

        public async Task<int> AddPlan(PlanModel pl)
        {
            var record = mapper.Map<Plan>(pl);
            if(record!=null)
            {
                dbContext.Plans.Add(record);
                await dbContext.SaveChangesAsync();
                return record.PlanId;
            }
            else
            {
                return 0;
            }
        }

        public async Task<int> DeletePlan(int pid)
        {
            var data = await dbContext.Plans.Where(x => x.PlanId == pid).FirstOrDefaultAsync();
            if (data != null)
            {
                dbContext.Plans.Remove(data);
                await dbContext.SaveChangesAsync();
                return data.PlanId;
            }
            else
            {
                return 0;
            }
        }

        public async Task<PlanModel> GetById(string id)
        {
            var data= await dbContext.Plans.Where(x=>x.MemberId==id).FirstOrDefaultAsync();
            if(data!=null)
            {
                return mapper.Map<PlanModel>(data);
            }
            else
            {
                return null;
            }
        }

        public async Task<List<PlanModel>> GetDetails()
        {
            var data = await dbContext.Plans.ToListAsync();
            if (data != null)
            {
                return mapper.Map<List<PlanModel>>(data);
            }
            else
            {
                return null;
            }
            
        }

        public async Task<double> UpdatePlan(string pid, PlanModel pl)
        {
            var data = await dbContext.Plans.Where(x => x.MemberId == pid).FirstOrDefaultAsync();
            if (data != null)
            {
                data.PlanName = pl.PlanName;
                data.PlanStart = pl.PlanStart;
                data.PlanEnd = pl.PlanEnd;
                data.InsuredAmt= pl.InsuredAmt;
                await dbContext.SaveChangesAsync();
                double premium = data.InsuredAmt * 0.002;
                return premium;
            }
            else
            {
                return 0.0;
            }
            
        }
    }
}
