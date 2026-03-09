using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.Models;
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

    //GET: api/products/5
    [HttpGet("{id}")]
    public IActionResult GetProduct(int id)
    {
      var product = _context.Products.Find(id);

      if(product == null)
        return NotFound();
      
      return Ok(product);
    }

    //POST: api/Product  //add product to backend 
    [HttpPost]
    public IActionResult AddProduct(Product product)
    {
      _context.Products.Add(product);
      _context.SaveChanges();

      return Ok(product);
    }

    //PUT: api/Products/5  //update product by id
    // [HttpPut("{id}")]
    // public IActionResult UpdateProduct(int id, Product updatedProduct)
    // {
    //   var product = _context.Products.Find(id);

    //   if(product == null)
    //     return NotFound();

    //   product.Name = updatedProduct.Name;
    //   product.Price = updatedProduct.Price;
    //   product.Quantity = updatedProduct.Quantity;

    //   _context.SaveChanges();

    //   return Ok(product);
    // }

    [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product updatedProduct)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Quantity = updatedProduct.Quantity;
            _context.SaveChanges();
            return Ok(product);
        }


    //DELETE: api/Product/5   /delete the product from backend 
    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
      var product = _context.Products.Find(id);

      if(product == null)
      {
        return NotFound();
      }

      _context.Products.Remove(product);
      _context.SaveChanges();
      
      return NoContent();
    }

    //SEARCH: api/Product/product_name  /SEARCH BY NAME the product from backend 
    [HttpGet("search/{name}")]
    public IActionResult SearchProduct(string name)
    {
        var products = _context.Products
            .Where(p => p.Name.Contains(name))
            .ToList();

        return Ok(products);
    }

  }
}