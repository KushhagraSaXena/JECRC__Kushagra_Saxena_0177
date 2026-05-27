using FoodOrdering.Domain.Entities;
using FoodOrdering.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize(Roles = "Admin")]
public class FoodItemsController : Controller
{
    private readonly ApplicationDbContext _context;

    private readonly IWebHostEnvironment _environment;

    public FoodItemsController(
        ApplicationDbContext context,
        IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    public async Task<IActionResult> Index()
    {
        var foods = await _context.FoodItems
            .Include(f => f.Category)
            .ToListAsync();

        return View(foods);
    }

    public async Task<IActionResult> Create()
    {
        ViewBag.Categories = new SelectList(
            await _context.Categories.ToListAsync(),
            "Id",
            "Name");

        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        FoodItem foodItem,
        IFormFile imageFile)
    {
        if (imageFile != null)
        {
            string uploadsFolder =
                Path.Combine(
                    _environment.WebRootPath,
                    "images/food");

            Directory.CreateDirectory(uploadsFolder);

            string fileName =
                Guid.NewGuid().ToString()
                + Path.GetExtension(imageFile.FileName);

            string filePath =
                Path.Combine(uploadsFolder, fileName);

            using var stream =
                new FileStream(filePath, FileMode.Create);

            await imageFile.CopyToAsync(stream);

            foodItem.ImageUrl = "/images/food/" + fileName;
        }

        _context.FoodItems.Add(foodItem);

        await _context.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }
}