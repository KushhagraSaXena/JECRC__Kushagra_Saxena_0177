using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Todo>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, Todo updated)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
                return NotFound();

            todo.Title = updated.Title;
            todo.IsCompleted = updated.IsCompleted;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
                return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}