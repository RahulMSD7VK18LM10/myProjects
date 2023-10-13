using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using NLog;
using System;

namespace CmsWebApi.Repository_DI
{
    public class RegistrationRepository : IRegistration
    {
        static Logger logger = LogManager.GetLogger("myAPP");
        private readonly CMDbContext dbContext = null;
        private readonly IMapper mapper; 
        public RegistrationRepository(CMDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;

        }
        public async Task<string> AddMember(RegistrationModel reg)
        {
                var record = mapper.Map<Registration>(reg);
                if (record != null)
                {
                dbContext.Registrations.Add(record);
                await dbContext.SaveChangesAsync();
                return record.MemberId;
                }
                else
                {
                    return null;
                }
                
        }
        public async Task<List<RegistrationModel>> GetDetails()
        {
            var data = await dbContext.Registrations.ToListAsync();
            if(data != null)
            {
                return mapper.Map<List<RegistrationModel>>(data);
            }
            else
            {
                return null;
            }
        }

        public async Task<string> DeleteMember(string id)
        {
            var data = await dbContext.Registrations.Where(x => x.MemberId == id).FirstOrDefaultAsync();
            if(data != null)
            {
                dbContext.Registrations.Remove(data);
                await dbContext.SaveChangesAsync();
                return data.MemberId;
            }
            else
            {
                return null;
            }
        }

        public async Task<RegistrationModel> GetById(string id)
        {
            var data = await dbContext.Registrations.Where(x => x.MemberId == id).FirstOrDefaultAsync();
            if (data != null)
            {
                return mapper.Map<RegistrationModel>(data);
            }
            else
            {
                return null;
            }
        }

        public async Task<string> UpdateMember(string id, RegistrationModel reg)
        {
            var record = await dbContext.Registrations.Where(x => x.MemberId == id).FirstOrDefaultAsync();
            if (record != null)
            {
                record.MemberName = reg.MemberName;
                record.Address=reg.Address;
                record.UserName=reg.UserName;
                record.Dob=reg.Dob;
                record.Country=reg.Country;
                record.ContactNo=reg.ContactNo;
                record.State=reg.State;
                await dbContext.SaveChangesAsync();
                return record.MemberId;
            }
            else return null;
        }

        public async Task<RegistrationModel> Login(string id,string pass)
        {
            logger.Info("Enter the user credentials");
            var data = await dbContext.Registrations.Where(x => x.UserName == id  && x.Password==pass).FirstOrDefaultAsync();
            try 
            {
                if(data != null)
                {
                    logger.Info("Login Success");
                }
                else
                {
                    logger.Info("Login Failed");
                }
            }
            catch(Exception ex)
            {
                logger.Info("Login Error=" + ex.Message);
            }
            return mapper.Map<RegistrationModel>(data);
        }
        public async Task<string> ForgotPassword(string email)
        {
            var data = await dbContext.Registrations.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (data == null)
            {
                return null;
            }
            else
            {
                return data.Password;
            }
        }

        public async Task<string> ChangePassword(string uname, string password, string nPassword)
        {
            var data = await dbContext.Registrations.Where(x => x.UserName == uname).FirstOrDefaultAsync();
            if(data!= null)
            {
                string pass=data.Password;
                data.Password = nPassword;
                await dbContext.SaveChangesAsync();
                return pass;
            }
            else
            {
                return null;
            }
        }
    }
}
