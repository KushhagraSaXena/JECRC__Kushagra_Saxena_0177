using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace JwtRoleAuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManagerController : ControllerBase
    {
        // Only Manager role can access
        [HttpGet("dashboard")]
        [Authorize(Roles = "Manager")]
        public IActionResult GetManagerDashboard()
        {
            return Ok(new
            {
                message = "Welcome to the Manager Dashboard! Only users with the 'Manager' role can see this."
            });
        }

        // Admin and Manager both can access
        [HttpGet("reports")]
        [Authorize(Roles = "Admin,Manager")]
        public IActionResult GetManagerReports()
        {
            return Ok(new
            {
                message = "Here are the manager reports. This endpoint is accessible to both Admin and Manager roles."
            });
        }
    }
}