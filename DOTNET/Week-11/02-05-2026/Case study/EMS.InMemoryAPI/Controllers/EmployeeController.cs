using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EMS.InMemoryAPI.Repositories;
using EMS.InMemoryAPI.Model;

namespace EMS.InMemoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var employees = Repositories.EmployeeRepository.GetAll();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var employee = Repositories.EmployeeRepository.GetById(id);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            EmployeeRepository.Add(employee);
            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
        }

        [HttpPost("{id}")]
        public IActionResult Update(int id, Employee employee)
        {
            var updated = EmployeeRepository.Update(id, employee);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = EmployeeRepository.Delete(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
