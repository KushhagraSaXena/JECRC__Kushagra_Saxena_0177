using FoodOrdering.API.DTOs;
using FoodOrdering.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Categories
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name
            })
            .ToListAsync();

        return Ok(categories);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(CategoryDto dto)
    {
        var category = new FoodOrdering.Domain.Entities.Category
        {
            Name = dto.Name
        };

        _context.Categories.Add(category);

        await _context.SaveChangesAsync();

        dto.Id = category.Id;

        return Ok(dto);
    }
}