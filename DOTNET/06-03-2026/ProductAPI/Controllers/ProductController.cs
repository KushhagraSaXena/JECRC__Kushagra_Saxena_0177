using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
namespace ProductAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductController : ControllerBase
  {
    private readonly ApplicationDbContext _context;
    public ProductController(ApplicationDbContext context)
    {
      _context = context;
    }
    //GET: api/Product
    [HttpGet]
    //Synchronous approach
    public IActionResult GetProducts()
    {
      var Products = _context.Products.ToList();
      return Ok(Products);
    }
    //asynchronous approach
    // public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    // {
    //   return await _context.Products.ToListAsync();
    // }
  }
}