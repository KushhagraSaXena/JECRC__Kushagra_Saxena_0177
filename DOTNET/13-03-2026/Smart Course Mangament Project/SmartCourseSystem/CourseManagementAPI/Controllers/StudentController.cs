using Microsoft.AspNetCore.Mvc;
using CourseManagementAPI.Data;
using CourseManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using CourseManagementAPI.DTOs;

namespace CourseManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly AppDbContext _context;

    public StudentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddStudent([FromBody] StudentDTO dto)
    {
        var student = new Student
        {
            Name = dto.Name,
            Email = dto.Email,
            Phone = dto.Phone,
            Role = dto.Role
        };

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return Ok(student);
    }


        [HttpGet]
    public async Task<IActionResult> GetStudents()
    {
        var students = await _context.Students
            .Select(s => new StudentDTO
            {
                StudentId = s.StudentId,
                Name = s.Name,
                Email = s.Email,
                Phone = s.Phone,
                Role = s.Role
            })
            .ToListAsync();

        return Ok(students);
    }

}
