using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;

namespace CmsWebApi.Models
{
    public class PlanModel
    {
        [Required]
        [Display(Name = "Plan Id")]
        public int PlanId { get; set; }
        [Required]
        [Display(Name = "Plan Name")]
        public string PlanName { get; set; }
        [Required]
        [Display(Name = "Insured Amount")]
        public double InsuredAmt { get; set; }
        [Required]
        [Display(Name = "Start Date")]
        [DataType(DataType.Date)]
        public DateTime PlanStart { get; set; }
        [Required]
        [Display(Name = "End Date")]
        [DataType(DataType.Date)]
        public DateTime PlanEnd { get; set; }
        public string MemberId { get; set; }
    }
}
