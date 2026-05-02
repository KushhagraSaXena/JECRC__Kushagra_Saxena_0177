using Microsoft.AspNetCore.Mvc;
using ProductManagement.DTOs;
using ProductManagement.Repositories.Interfaces;

namespace ProductManagement.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            _repo = repo;
        }

        // GET: Products/Index
        public async Task<IActionResult> Index()
        {
            var products = await _repo.GetAllAsync();
            return View(products);
        }

        // GET: Products/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var product = await _repo.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return View(product);
        }

        // GET: Products/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Products/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProductResponseDto dto)
        {
            try
            {
                // Ensure TagIds is not null
                if (dto.TagIds == null)
                    dto.TagIds = new List<int>();

                if (ModelState.IsValid)
                {
                    var id = await _repo.CreateAsync(dto);
                    if (id > 0)
                    {
                        return RedirectToAction(nameof(Details), new { id = id });
                    }
                    else
                    {
                        ModelState.AddModelError("", "Failed to create product");
                    }
                }
                else
                {
                    // Log validation errors for debugging
                    var errors = ModelState.Values.SelectMany(v => v.Errors);
                    foreach (var error in errors)
                    {
                        System.Diagnostics.Debug.WriteLine($"Validation Error: {error.ErrorMessage}");
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", $"Error: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"Create Exception: {ex}");
            }
            return View(dto);
        }

        // GET: Products/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            var product = await _repo.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return View(product);
        }

        // POST: Products/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ActionName("Edit")]
        public async Task<IActionResult> EditPost(int id, ProductResponseDto dto)
        {
            try
            {
                if (id != dto.Id)
                {
                    return NotFound();
                }

                // Ensure TagIds is not null
                if (dto.TagIds == null)
                    dto.TagIds = new List<int>();

                if (ModelState.IsValid)
                {
                    var result = await _repo.UpdateAsync(id, dto);
                    if (result)
                    {
                        return RedirectToAction(nameof(Index));
                    }
                    else
                    {
                        ModelState.AddModelError("", "Failed to update product");
                    }
                }
                else
                {
                    // Log validation errors for debugging
                    var errors = ModelState.Values.SelectMany(v => v.Errors);
                    foreach (var error in errors)
                    {
                        System.Diagnostics.Debug.WriteLine($"Validation Error: {error.ErrorMessage}");
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", $"Error: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"Edit Exception: {ex}");
            }
            return View(dto);
        }

        // GET: Products/Delete/5
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _repo.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return View(product);
        }

        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var result = await _repo.DeleteAsync(id);
            if (result)
            {
                return RedirectToAction(nameof(Index));
            }
            return NotFound();
        }
    }
}
