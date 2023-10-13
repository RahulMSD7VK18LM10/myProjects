using CmsWebApi.DataAccessLayer;
using CmsWebApi.Models;
using CmsWebApi.Repository_DI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CmsWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly IPlan pla = null;
        public PlansController(IPlan pla)
        {
            this.pla = pla;
        }
        [HttpPost]
        public async Task<IActionResult> Create(PlanModel pl)
        {
            int planId = await pla.AddPlan(pl);
            if(planId != 0)
            { 
                return Ok(planId); 
            }
            else
            {
                return NotFound();
            }
            
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllDetails()
        {
            var data = await pla.GetDetails();
            if(data!=null)
            {
                return Ok(data);
            }
            else
            {
                return NotFound();
            }
            
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            int planId = await pla.DeletePlan(id);
            if (planId != 0)
            {
                return Ok(planId);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update(string id, PlanModel pl)
        {
            double premium = await pla.UpdatePlan(id, pl);
            if(premium != 0.0)
            {
                return Ok(premium);
            }
            else
            {
                return NotFound();
            }
            
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlanById(string id)
        {
            var data = await pla.GetById(id);
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
