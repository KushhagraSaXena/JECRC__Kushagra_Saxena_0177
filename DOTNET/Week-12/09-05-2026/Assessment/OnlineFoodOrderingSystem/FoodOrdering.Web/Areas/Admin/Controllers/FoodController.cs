using FoodOrdering.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Web.Controllers;

public class FoodController : Controller
{
    private readonly ApplicationDbContext _context;

    public FoodController(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string search)
    {
        var foods = _context.FoodItems
            .Include(f => f.Category)
            .AsQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            foods = foods.Where(f =>
                f.Name.Contains(search));
        }

        return View(await foods.ToListAsync());
    }
}