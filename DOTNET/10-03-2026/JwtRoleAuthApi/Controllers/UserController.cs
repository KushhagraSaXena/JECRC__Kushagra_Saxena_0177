using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace JwtRoleAuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        // Protected endpoint - only authenticated users can access
        [HttpGet("dashboard")]
        [Authorize(Roles = "user")]
        public IActionResult GetUserDashboard()
        {
            var username = User.Identity?.Name ?? "Unknown";

            return Ok(new
            {
                message = $"Welcome to your profile, {username}! This endpoint is accessible to all authenticated users."
            });
        }
    }
}