using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CmsWebApi.DataAccessLayer
{
    public class Plan
    {
        [Required]
        [Key]
        [Display(Name = "Plan Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        [ForeignKey("MemberId")]
        public virtual Registration Registration { get; set; }
    }
}
