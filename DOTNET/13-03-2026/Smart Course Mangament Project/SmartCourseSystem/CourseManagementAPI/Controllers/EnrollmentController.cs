using Microsoft.AspNetCore.Mvc;
using CourseManagementAPI.Data;
using CourseManagementAPI.Models;
using CourseManagementAPI.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CourseManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EnrollmentController : ControllerBase
{
    private readonly AppDbContext _context;

    public EnrollmentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> EnrollStudent([FromBody] EnrollRequestDTO dto)
    {
        var course = await _context.Courses.FindAsync(dto.CourseId);

        if (course == null)
            return NotFound("Course not found");

        if (course.SeatsAvailable <= 0)
            return BadRequest("No seats available");

        var existingEnrollment = await _context.Enrollments
            .FirstOrDefaultAsync(e =>
                e.CourseId == dto.CourseId &&
                e.StudentId == dto.StudentId &&
                e.DropDate == null);

        if (existingEnrollment != null)
            return BadRequest("Student is already enrolled in this course");

        var enrollment = new Enrollment
        {
            CourseId = dto.CourseId,
            StudentId = dto.StudentId,
            EnrollmentDate = DateTime.Now
        };

        course.SeatsAvailable -= 1;

        _context.Enrollments.Add(enrollment);
        await _context.SaveChangesAsync();

        return Ok(enrollment);
    }

    [HttpGet]
    public async Task<IActionResult> GetEnrollments()
    {
        var data = await _context.Enrollments
            .Include(e => e.Student)
            .Include(e => e.Course)
            .ToListAsync();

        return Ok(data);
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActiveEnrollments()
    {
        var data = await _context.Enrollments
            .Where(e => e.DropDate == null)
            .Include(e => e.Student)
            .Include(e => e.Course)
            .ToListAsync();

        return Ok(data);
    }

    [HttpGet("history")]
    public async Task<IActionResult> GetEnrollmentHistory()
    {
        var data = await _context.Enrollments
            .Where(e => e.DropDate != null)
            .Include(e => e.Student)
            .Include(e => e.Course)
            .ToListAsync();

        return Ok(data);
    }

    [HttpDelete("drop")]
    public async Task<IActionResult> DropCourse(int courseId, int studentId)
    {
        var enrollment = await _context.Enrollments
            .FirstOrDefaultAsync(e =>
                e.CourseId == courseId &&
                e.StudentId == studentId &&
                e.DropDate == null);

        if (enrollment == null)
            return NotFound("Enrollment not found");

        var course = await _context.Courses.FindAsync(courseId);

        enrollment.DropDate = DateTime.Now;

        if (course != null)
            course.SeatsAvailable += 1;

        await _context.SaveChangesAsync();

        return Ok("Course dropped successfully");
    }
}
