using Microsoft.AspNetCore.Mvc;
using StudentAdmissionSystem.Model;

namespace StudentAdmissionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {
        private static List<Admission> admissions = new();
        private static int nextId = 1;

        /// <summary>
        /// Get all admissions
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(List<Admission>), 200)]
        public IActionResult GetAll()
        {
            if (admissions.Count == 0)
                return Ok(new { message = "No admissions found", data = admissions });

            return Ok(admissions);
        }

        /// <summary>
        /// Get admission by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Admission), 200)]
        [ProducesResponseType(404)]
        public IActionResult GetById(int id)
        {
            var admission = admissions.FirstOrDefault(a => a.Id == id);
            if (admission == null)
                return NotFound(new { error = $"Admission with ID {id} not found" });

            return Ok(admission);
        }

        /// <summary>
        /// Create new admission
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(Admission), 201)]
        [ProducesResponseType(400)]
        public IActionResult Create([FromBody] Admission admission)
        {
            if (admission == null)
                return BadRequest(new { error = "Admission data cannot be null" });

            if (string.IsNullOrWhiteSpace(admission.StudentName))
                return BadRequest(new { error = "Student name is required" });

            if (string.IsNullOrWhiteSpace(admission.Course))
                return BadRequest(new { error = "Course is required" });

            admission.Id = nextId++;
            admission.AdmissionDate = DateTime.UtcNow;
            admissions.Add(admission);

            return CreatedAtAction(nameof(GetById), new { id = admission.Id }, admission);
        }

        /// <summary>
        /// Update admission
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Admission), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public IActionResult Update(int id, [FromBody] Admission updateData)
        {
            if (updateData == null)
                return BadRequest(new { error = "Admission data cannot be null" });

            var admission = admissions.FirstOrDefault(a => a.Id == id);
            if (admission == null)
                return NotFound(new { error = $"Admission with ID {id} not found" });

            if (!string.IsNullOrWhiteSpace(updateData.StudentName))
                admission.StudentName = updateData.StudentName;

            if (!string.IsNullOrWhiteSpace(updateData.Course))
                admission.Course = updateData.Course;

            return Ok(new { message = "Admission updated successfully", data = admission });
        }

        /// <summary>
        /// Delete admission
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult Delete(int id)
        {
            var admission = admissions.FirstOrDefault(a => a.Id == id);
            if (admission == null)
                return NotFound(new { error = $"Admission with ID {id} not found" });

            admissions.Remove(admission);
            return Ok(new { message = $"Admission {id} deleted successfully" });
        }
    }
}
