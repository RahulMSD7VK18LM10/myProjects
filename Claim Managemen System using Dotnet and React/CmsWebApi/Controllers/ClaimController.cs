using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;
using CmsWebApi.Repository_DI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CmsWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimController : ControllerBase
    {
        private readonly IClaim cl = null;
        public ClaimController(IClaim cl)
        {
            this.cl = cl;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllDetails()
        {
            var data = await cl.GetDetails();
            if(data != null)
            {
                return Ok(data);
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> Create(ClaimModel cll)
        {
            int claimId = await cl.AddClaim(cll);
            if(claimId != 0)
            {
                return Ok(claimId);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClaims(string id)
        {
            var data = await cl.GetClaims(id);
            if (data != null)
            {
                return Ok(data);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
