using System.ComponentModel.DataAnnotations;

namespace StudentAttendenceSystem.Model
{
    public class Attendence
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Student ID is required")]
        public int StudentId { get; set; }

        [Required(ErrorMessage = "Attendance date is required")]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "Attendance status is required")]
        public bool IsPresent { get; set; }

        [StringLength(500)]
        public string? Remarks { get; set; }

        public DateTime RecordedAt { get; set; } = DateTime.UtcNow;
    }
}
