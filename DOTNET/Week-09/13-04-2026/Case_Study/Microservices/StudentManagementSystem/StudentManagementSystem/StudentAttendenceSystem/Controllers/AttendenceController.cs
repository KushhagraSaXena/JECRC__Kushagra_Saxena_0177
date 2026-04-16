using Microsoft.AspNetCore.Mvc;
using StudentAttendenceSystem.Model;

namespace StudentAttendenceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendenceController : ControllerBase
    {
        private static List<Attendence> attendenceRecords = new();
        private static int nextId = 1;

        /// <summary>
        /// Get all attendance records
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(List<Attendence>), 200)]
        public IActionResult GetAll()
        {
            if (attendenceRecords.Count == 0)
                return Ok(new { message = "No attendance records found", data = attendenceRecords });

            return Ok(attendenceRecords);
        }

        /// <summary>
        /// Get attendance by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Attendence), 200)]
        [ProducesResponseType(404)]
        public IActionResult GetById(int id)
        {
            var record = attendenceRecords.FirstOrDefault(a => a.Id == id);
            if (record == null)
                return NotFound(new { error = $"Attendance record with ID {id} not found" });

            return Ok(record);
        }

        /// <summary>
        /// Get attendance by Student ID
        /// </summary>
        [HttpGet("student/{studentId}")]
        [ProducesResponseType(typeof(List<Attendence>), 200)]
        public IActionResult GetByStudentId(int studentId)
        {
            var records = attendenceRecords.Where(a => a.StudentId == studentId).ToList();
            if (records.Count == 0)
                return Ok(new { message = $"No attendance records found for student {studentId}", data = records });

            return Ok(records);
        }

        /// <summary>
        /// Create new attendance record
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(Attendence), 201)]
        [ProducesResponseType(400)]
        public IActionResult Create([FromBody] Attendence attendence)
        {
            if (attendence == null)
                return BadRequest(new { error = "Attendance data cannot be null" });

            if (attendence.StudentId <= 0)
                return BadRequest(new { error = "Valid student ID is required" });

            if (attendence.Date == default)
                return BadRequest(new { error = "Attendance date is required" });

            attendence.Id = nextId++;
            attendenceRecords.Add(attendence);

            return CreatedAtAction(nameof(GetById), new { id = attendence.Id }, attendence);
        }

        /// <summary>
        /// Update attendance record
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Attendence), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public IActionResult Update(int id, [FromBody] Attendence updateData)
        {
            if (updateData == null)
                return BadRequest(new { error = "Attendance data cannot be null" });

            var record = attendenceRecords.FirstOrDefault(a => a.Id == id);
            if (record == null)
                return NotFound(new { error = $"Attendance record with ID {id} not found" });

            if (updateData.StudentId > 0)
                record.StudentId = updateData.StudentId;

            if (updateData.Date != default)
                record.Date = updateData.Date;

            record.IsPresent = updateData.IsPresent;

            return Ok(new { message = "Attendance updated successfully", data = record });
        }

        /// <summary>
        /// Delete attendance record
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult Delete(int id)
        {
            var record = attendenceRecords.FirstOrDefault(a => a.Id == id);
            if (record == null)
                return NotFound(new { error = $"Attendance record with ID {id} not found" });

            attendenceRecords.Remove(record);
            return Ok(new { message = $"Attendance record {id} deleted successfully" });
        }

        /// <summary>
        /// Get attendance statistics for a student
        /// </summary>
        [HttpGet("stats/{studentId}")]
        [ProducesResponseType(typeof(object), 200)]
        public IActionResult GetAttendanceStats(int studentId)
        {
            var records = attendenceRecords.Where(a => a.StudentId == studentId).ToList();
            if (records.Count == 0)
                return NotFound(new { error = $"No attendance records found for student {studentId}" });

            int presentDays = records.Count(a => a.IsPresent);
            int totalDays = records.Count;
            double percentage = totalDays > 0 ? (presentDays * 100.0) / totalDays : 0;

            return Ok(new
            {
                studentId,
                totalDays,
                presentDays,
                absentDays = totalDays - presentDays,
                attendancePercentage = percentage
            });
        }
    }
}
