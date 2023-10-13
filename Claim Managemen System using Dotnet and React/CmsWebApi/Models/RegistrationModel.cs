using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;

namespace CmsWebApi.Models
{
    public class RegistrationModel
    {
        [Display(Name = "Member Id")]
        public string MemberId { get; set; }
        [Required]
        [Display(Name = "Member Name")]
        public string MemberName { get; set; }
        [Required]
        [Display(Name = "UserName")]
        public string UserName { get; set; }
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        [MinLength(5)]
        [MaxLength(14)]
        public string Password { get; set; }
        [Display(Name = "Confirm Password")]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
        [Required]
        [Display(Name = "Address")]
        public string Address { get; set; }
        [Required]
        [Display(Name = "State")]
        public string State { get; set; }
        [Required]
        [Display(Name = "Country")]
        public string Country { get; set; }
        [Required]
        [Display(Name = "Email Id")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        [Display(Name = "Contact No")]
        public long ContactNo { get; set; }
        [Required]
        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        public DateTime Dob { get; set; }
    }
}
