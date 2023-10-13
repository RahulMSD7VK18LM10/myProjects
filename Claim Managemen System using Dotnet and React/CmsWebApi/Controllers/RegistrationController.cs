using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;
using CmsWebApi.Repository_DI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using NLog;
using System;
using AutoMapper.Execution;

namespace CmsWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IRegistration reg = null;
        public RegistrationController(IRegistration reg)
        {
            this.reg = reg;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllDetails()
        {
            var data = await reg.GetDetails();
            if(data!=null)
            {
                return Ok(data);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(RegistrationModel regg)
        {
            string memberId = await reg.AddMember(regg);
            if (memberId != null)
            {
                return Ok(memberId);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            string memberId = await reg.DeleteMember(id);
            if (memberId != null)
            {
                return Ok(memberId);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update(string id, RegistrationModel regg)
        {
            string memberId = await reg.UpdateMember(id, regg);
            if (memberId != null)
            {
                return Ok(memberId);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByDepartmentId(string id)
        {
            var data = await reg.GetById(id);
            if (data != null)
            {
                return Ok(data);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost("{userName},{pass}")]
        public async Task<IActionResult> Login(string userName,string pass)
        {
                var data = await reg.Login(userName, pass);
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return Ok(null);
                }
        }
        [HttpGet("Forgotpassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var response = await reg.ForgotPassword(email);
            if (response != null)
            {
                return Ok(response);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPatch]
        public async Task<IActionResult> ChangePassword(string uname, string password, string nPassword)
        {
            var response = await reg.ChangePassword(uname, password, nPassword);
            if (response != null)
            {
                return Ok(response);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
