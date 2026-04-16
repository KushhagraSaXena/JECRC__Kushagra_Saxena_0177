using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private static List<Student> students = new();
        private static int nextId = 1;

        /// <summary>
        /// Get all students
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(List<Student>), 200)]
        public IActionResult GetAll([FromQuery] string? status = null, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var query = students.AsEnumerable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(s => s.Status.Equals(status, StringComparison.OrdinalIgnoreCase));

            var pagedStudents = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            if (pagedStudents.Count == 0)
                return Ok(new { message = "No students found", data = pagedStudents, total = 0 });

            return Ok(new { total = query.Count(), page = pageNumber, pageSize, data = pagedStudents });
        }

        /// <summary>
        /// Get student by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Student), 200)]
        [ProducesResponseType(404)]
        public IActionResult GetById(int id)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null)
                return NotFound(new { error = $"Student with ID {id} not found" });

            return Ok(student);
        }

        /// <summary>
        /// Create new student
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(Student), 201)]
        [ProducesResponseType(400)]
        public IActionResult Create([FromBody] Student student)
        {
            if (student == null)
                return BadRequest(new { error = "Student data cannot be null" });

            if (string.IsNullOrWhiteSpace(student.Name))
                return BadRequest(new { error = "Student name is required" });

            if (string.IsNullOrWhiteSpace(student.Email))
                return BadRequest(new { error = "Email is required" });

            if (string.IsNullOrWhiteSpace(student.Phone))
                return BadRequest(new { error = "Phone number is required" });

            // Check if email already exists
            if (students.Any(s => s.Email.Equals(student.Email, StringComparison.OrdinalIgnoreCase)))
                return BadRequest(new { error = "Email already exists" });

            student.Id = nextId++;
            student.CreatedAt = DateTime.UtcNow;
            student.UpdatedAt = DateTime.UtcNow;
            students.Add(student);

            return CreatedAtAction(nameof(GetById), new { id = student.Id }, student);
        }

        /// <summary>
        /// Update student
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Student), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public IActionResult Update(int id, [FromBody] Student updateData)
        {
            if (updateData == null)
                return BadRequest(new { error = "Student data cannot be null" });

            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null)
                return NotFound(new { error = $"Student with ID {id} not found" });

            // Check if new email already exists (if email is being changed)
            if (!string.IsNullOrWhiteSpace(updateData.Email) && updateData.Email != student.Email)
            {
                if (students.Any(s => s.Email.Equals(updateData.Email, StringComparison.OrdinalIgnoreCase)))
                    return BadRequest(new { error = "Email already exists" });
                student.Email = updateData.Email;
            }

            if (!string.IsNullOrWhiteSpace(updateData.Name))
                student.Name = updateData.Name;

            if (!string.IsNullOrWhiteSpace(updateData.Phone))
                student.Phone = updateData.Phone;

            if (!string.IsNullOrWhiteSpace(updateData.Address))
                student.Address = updateData.Address;

            if (!string.IsNullOrWhiteSpace(updateData.Course))
                student.Course = updateData.Course;

            if (updateData.Semester > 0)
                student.Semester = updateData.Semester;

            if (updateData.GPA >= 0 && updateData.GPA <= 4)
                student.GPA = updateData.GPA;

            if (!string.IsNullOrWhiteSpace(updateData.Status))
                student.Status = updateData.Status;

            student.UpdatedAt = DateTime.UtcNow;

            return Ok(new { message = "Student updated successfully", data = student });
        }

        /// <summary>
        /// Partially update student
        /// </summary>
        [HttpPatch("{id}")]
        [ProducesResponseType(typeof(Student), 200)]
        [ProducesResponseType(404)]
        public IActionResult PartialUpdate(int id, [FromBody] Dictionary<string, object> patchData)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null)
                return NotFound(new { error = $"Student with ID {id} not found" });

            foreach (var kvp in patchData)
            {
                switch (kvp.Key.ToLower())
                {
                    case "name": student.Name = kvp.Value?.ToString(); break;
                    case "email": student.Email = kvp.Value?.ToString(); break;
                    case "phone": student.Phone = kvp.Value?.ToString(); break;
                    case "address": student.Address = kvp.Value?.ToString(); break;
                    case "course": student.Course = kvp.Value?.ToString(); break;
                    case "semester": if (int.TryParse(kvp.Value?.ToString(), out int sem)) student.Semester = sem; break;
                    case "gpa": if (double.TryParse(kvp.Value?.ToString(), out double gpa)) student.GPA = gpa; break;
                    case "status": student.Status = kvp.Value?.ToString(); break;
                }
            }

            student.UpdatedAt = DateTime.UtcNow;
            return Ok(new { message = "Student partially updated", data = student });
        }

        /// <summary>
        /// Delete student
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult Delete(int id)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null)
                return NotFound(new { error = $"Student with ID {id} not found" });

            students.Remove(student);
            return Ok(new { message = $"Student {id} deleted successfully" });
        }

        /// <summary>
        /// Get students by course
        /// </summary>
        [HttpGet("course/{course}")]
        [ProducesResponseType(typeof(List<Student>), 200)]
        public IActionResult GetByCourse(string course)
        {
            var courseStudents = students.Where(s => s.Course.Equals(course, StringComparison.OrdinalIgnoreCase)).ToList();
            if (courseStudents.Count == 0)
                return Ok(new { message = $"No students found in course {course}", data = courseStudents });

            return Ok(courseStudents);
        }

        /// <summary>
        /// Get top performers (highest GPA)
        /// </summary>
        [HttpGet("top/{count}")]
        [ProducesResponseType(typeof(List<Student>), 200)]
        public IActionResult GetTopPerformers(int count = 5)
        {
            var topStudents = students.OrderByDescending(s => s.GPA).Take(count).ToList();
            return Ok(topStudents);
        }

        /// <summary>
        /// Search students by name or email
        /// </summary>
        [HttpGet("search")]
        [ProducesResponseType(typeof(List<Student>), 200)]
        public IActionResult Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest(new { error = "Search query is required" });

            var results = students
                .Where(s => s.Name.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                           s.Email.Contains(query, StringComparison.OrdinalIgnoreCase))
                .ToList();

            if (results.Count == 0)
                return Ok(new { message = "No students found matching the query", data = results });

            return Ok(results);
        }
    }
}
