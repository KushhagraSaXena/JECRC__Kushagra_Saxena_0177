using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseManagementAPI.Data;
using CourseManagementAPI.Models;
using CourseManagementAPI.DTOs;

namespace CourseManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseController : ControllerBase
{
    private readonly AppDbContext _context;

    public CourseController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCourses()
    {
        var courses = await _context.Courses
            .Select(c => new CourseDTO
            {
                CourseId = c.CourseId,
                CourseName = c.CourseName,
                DepartmentId = c.DepartmentId,
                Credits = c.Credits,
                SeatsAvailable = c.SeatsAvailable
            })
            .ToListAsync();

        return Ok(courses);
    }

    [HttpPost]
    public async Task<IActionResult> AddCourse([FromBody] Course course)
    {
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return Ok(course);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, [FromBody] Course course)
    {
        if (id != course.CourseId)
            return BadRequest();

        _context.Entry(course).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok(course);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null)
            return NotFound();

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchCourses(string keyword)
    {
        var courses = await _context.Courses
            .Where(c => c.CourseName.Contains(keyword))
            .Select(c => new CourseDTO
            {
                CourseId = c.CourseId,
                CourseName = c.CourseName,
                DepartmentId = c.DepartmentId,
                Credits = c.Credits,
                SeatsAvailable = c.SeatsAvailable
            })
            .ToListAsync();

        return Ok(courses);
    }
}
