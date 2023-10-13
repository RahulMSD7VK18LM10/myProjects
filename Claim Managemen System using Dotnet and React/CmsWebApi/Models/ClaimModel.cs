using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;

namespace CmsWebApi.Models
{
    
    public class ClaimModel
    {
        [Required]
        [Display(Name = "Claim ID")]
        public int ClaimId { get; set; }
        [Required]
        [Display(Name = "Claim Date")]
        [DataType(DataType.Date)]
        public DateTime ClaimDate { get; set; }
        [Required]
        [Display(Name = "Claim Amount")]
        public double ClaimAmount { get; set; }
        [Required]
        [Display(Name = "Hospital Name")]
        public string HospitalName { get; set; }
        [Required]
        [Display(Name = "Bill Issue Date")]
        [DataType(DataType.Date)]
        public DateTime BillIssueDate { get; set; }
        [Required]
        [Display(Name = "Member ID")]
        public string MemberId { get; set; }
    }
}
