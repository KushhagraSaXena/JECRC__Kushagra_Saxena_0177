using System.ComponentModel.DataAnnotations;

namespace EmployeePortal.models.dto
{
  public class CreateEmployeeDto
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string name { get; set; }
        
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string department { get; set; }

        [Required]
        [EmailAddress]
        public string email { get; set; }
        
        [Required]
        public string password { get; set; }
        
        [Required]
        [Phone]
        public string phone { get; set; }
        public decimal salary { get; set; }
        [StringLength(50)]
        public string address { get; set; }
    }
}
