using LeaveManagementAPI.Data;
using LeaveManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LeaveManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        // Employee Apply Leave
        [Authorize(Roles = "Employee")]
        [HttpPost("apply")]
        public IActionResult ApplyLeave(LeaveRequest request)
        {
            var userId = User.FindFirst("UserId")?.Value;

            if (userId == null)
                return Unauthorized();

            request.EmployeeId = int.Parse(userId);
            request.Status = "Pending";

            _context.LeaveRequests.Add(request);
            _context.SaveChanges();

            return Ok(request);
        }

        // Employee View Own Leaves
        [Authorize(Roles = "Employee")]
        [HttpGet("my-leaves")]
        public IActionResult MyLeaves()
        {
            var userId = User.FindFirst("UserId")?.Value;

            if (userId == null)
                return Unauthorized();

            int employeeId = int.Parse(userId);

            var leaves = _context.LeaveRequests
                .Where(l => l.EmployeeId == employeeId)
                .ToList();

            return Ok(leaves);
        }

        // Manager View All Leaves
        [Authorize(Roles = "Manager")]
        [HttpGet("all")]
        public IActionResult GetAllLeaves()
        {
            return Ok(_context.LeaveRequests.ToList());
        }

        // Manager Approve Leave
        [Authorize(Roles = "Manager")]
        [HttpPut("approve/{id}")]
        public IActionResult ApproveLeave(int id)
        {
            var leave = _context.LeaveRequests.Find(id);

            if (leave == null)
                return NotFound();

            leave.Status = "Approved";
            _context.SaveChanges();

            return Ok(leave);
        }

        // Manager Reject Leave
        [Authorize(Roles = "Manager")]
        [HttpPut("reject/{id}")]
        public IActionResult RejectLeave(int id)
        {
            var leave = _context.LeaveRequests.Find(id);

            if (leave == null)
                return NotFound();

            leave.Status = "Rejected";
            _context.SaveChanges();

            return Ok(leave);
        }
    }
}