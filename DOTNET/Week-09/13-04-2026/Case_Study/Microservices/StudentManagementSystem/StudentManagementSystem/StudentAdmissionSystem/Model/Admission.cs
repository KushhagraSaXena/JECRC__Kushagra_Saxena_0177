using System.ComponentModel.DataAnnotations;

namespace StudentAdmissionSystem.Model
{
    public class Admission
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Student name is required")]
        [StringLength(100)]
        public string? StudentName { get; set; }

        [Required(ErrorMessage = "Course is required")]
        [StringLength(100)]
        public string? Course { get; set; }

        public DateTime AdmissionDate { get; set; } = DateTime.UtcNow;
        
        [StringLength(50)]
        public string Status { get; set; } = "Pending";
    }
}
