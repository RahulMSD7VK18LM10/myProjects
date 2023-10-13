using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CmsWebApi.DataAccessLayer
{
    public class ClaimSub
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Display(Name ="Claim ID")]
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
        [Display(Name ="Member Id")]
        public string MemberId { get; set; }
        [ForeignKey("MemberId")]
        public Registration registration { get; set; }
    }
}
