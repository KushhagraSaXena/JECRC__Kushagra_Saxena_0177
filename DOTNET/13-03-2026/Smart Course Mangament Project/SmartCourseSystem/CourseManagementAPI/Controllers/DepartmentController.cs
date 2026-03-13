using Microsoft.AspNetCore.Mvc;
using CourseManagementAPI.Data;
using CourseManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseManagementAPI.Controllers;
 
[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{
    private readonly AppDbContext _context;

    public DepartmentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddDepartment(Department department)
    {
        _context.Departments.Add(department);
        await _context.SaveChangesAsync();

        return Ok(department);
    }

    [HttpGet]
    public async Task<IActionResult> GetDepartments()
    {
        return Ok(await _context.Departments.ToListAsync());
    }
}