using Microsoft.AspNetCore.Mvc;
using CourseManagementAPI.Data;
using CourseManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IActionResult> EnrollStudent(Enrollment enrollment)
    {
        enrollment.EnrollmentDate = DateTime.Now;

        _context.Enrollments.Add(enrollment);
        await _context.SaveChangesAsync();

        return Ok(enrollment);
    }

    [HttpGet]
    public async Task<IActionResult> GetEnrollments()
    {
        return Ok(await _context.Enrollments
            .Include(e => e.Student)
            .Include(e => e.Course)
            .ToListAsync());
    }
}