using LeaveManagementAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LeaveManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // Get all employees
        [HttpGet("employees")]
        public IActionResult GetEmployees()
        {
            return Ok(_context.Users.ToList());
        }

        // Delete employee
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
                return NotFound();

            _context.Users.Remove(user);

            _context.SaveChanges();

            return Ok("User Deleted");
        }
    }
}