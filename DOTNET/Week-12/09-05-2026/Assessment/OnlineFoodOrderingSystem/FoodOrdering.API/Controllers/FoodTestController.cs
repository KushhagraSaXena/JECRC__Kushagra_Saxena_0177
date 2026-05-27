using Microsoft.AspNetCore.Mvc;

namespace FoodOrdering.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodTestController : ControllerBase
{
    [HttpGet]
    public IActionResult GetFoods()
    {
        var foods = new List<object>
        {
            new
            {
                Id = 1,
                Name = "Pizza",
                Price = 299
            },
            new
            {
                Id = 2,
                Name = "Burger",
                Price = 149
            }
        };

        return Ok(foods);
    }
}