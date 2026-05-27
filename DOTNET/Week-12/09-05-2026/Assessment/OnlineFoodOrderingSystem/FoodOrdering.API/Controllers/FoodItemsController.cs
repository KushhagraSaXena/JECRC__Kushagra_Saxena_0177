using FoodOrdering.API.DTOs;
using FoodOrdering.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodItemsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FoodItemsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetFoodItems()
    {
        var foods = await _context.FoodItems
            .Include(f => f.Category)
            .Select(f => new FoodItemDto
            {
                Id = f.Id,
                Name = f.Name,
                Description = f.Description,
                Price = f.Price,
                ImageUrl = f.ImageUrl,
                CategoryId = f.CategoryId,
                CategoryName = f.Category!.Name
            })
            .ToListAsync();

        return Ok(foods);
    }

    [HttpPost]
    public async Task<IActionResult> CreateFoodItem(FoodItemDto dto)
    {
        var food = new FoodOrdering.Domain.Entities.FoodItem
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            ImageUrl = dto.ImageUrl,
            CategoryId = dto.CategoryId
        };

        _context.FoodItems.Add(food);

        await _context.SaveChangesAsync();

        dto.Id = food.Id;

        return Ok(dto);
    }
}