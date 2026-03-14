namespace CourseManagementAPI.DTOs;

public class CourseDTO
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public int DepartmentId { get; set; }
    public int Credits { get; set; }
    public int SeatsAvailable { get; set; }
}
