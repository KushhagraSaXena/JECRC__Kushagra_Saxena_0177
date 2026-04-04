using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiBillGenerator.Data;
using MultiBillGenerator.DTOs;
using MultiBillGenerator.Models;

namespace MultiBillGenerator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CatalogsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/catalogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CatalogItemDto>>> GetCatalogs()
        {
            var items = await _context.CatalogItems
                .Select(c => new CatalogItemDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Price = c.Price,
                    Category = c.Category
                })
                .ToListAsync();

            return Ok(items);
        }

        // GET: api/catalogs/{category}
        [HttpGet("{category}")]
        public async Task<ActionResult<IEnumerable<CatalogItemDto>>> GetCatalogsByCategory(string category)
        {
            var items = await _context.CatalogItems
                .Where(c => c.Category == category.ToLower())
                .Select(c => new CatalogItemDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Price = c.Price,
                    Category = c.Category
                })
                .ToListAsync();

            return Ok(items);
        }

        // POST: api/catalogs
        [HttpPost]
        public async Task<ActionResult<CatalogItemDto>> CreateCatalogItem(CatalogItemDto catalogItemDto)
        {
            var catalogItem = new CatalogItem
            {
                Name = catalogItemDto.Name,
                Price = catalogItemDto.Price,
                Category = catalogItemDto.Category.ToLower()
            };

            _context.CatalogItems.Add(catalogItem);
            await _context.SaveChangesAsync();

            catalogItemDto.Id = catalogItem.Id;
            return CreatedAtAction(nameof(GetCatalogsByCategory), 
                new { category = catalogItem.Category }, catalogItemDto);
        }

        // PUT: api/catalogs/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCatalogItem(int id, CatalogItemDto catalogItemDto)
        {
            var catalogItem = await _context.CatalogItems.FindAsync(id);
            if (catalogItem == null)
            {
                return NotFound();
            }

            catalogItem.Name = catalogItemDto.Name;
            catalogItem.Price = catalogItemDto.Price;
            catalogItem.Category = catalogItemDto.Category.ToLower();
            catalogItem.UpdatedAt = DateTime.UtcNow;

            _context.CatalogItems.Update(catalogItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/catalogs/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCatalogItem(int id)
        {
            var catalogItem = await _context.CatalogItems.FindAsync(id);
            if (catalogItem == null)
            {
                return NotFound();
            }

            _context.CatalogItems.Remove(catalogItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
