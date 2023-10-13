using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace CmsWebApi.DataAccessLayer
{
    public class Registration
    {
        [Key]
        [Display(Name = "Member Id")]
        public string MemberId { get; set; }

        [Display(Name = "Member Name")]
        public string MemberName { get; set; }
        [Display(Name = "UserName")]
        public string UserName { get; set; }
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        [MinLength(5)]
        [MaxLength(14)]
        public string Password { get; set; }
        [Display(Name = "Address")]
        public string Address { get; set; }
        [Display(Name = "State")]
        public string State { get; set; }
        [Display(Name = "Country")]
        public string Country { get; set; }
        [Display(Name = "Email Id")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        
        [Display(Name = "Contact No")]
        public long ContactNo { get; set; }
        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        public DateTime Dob { get; set; }
    }
}
