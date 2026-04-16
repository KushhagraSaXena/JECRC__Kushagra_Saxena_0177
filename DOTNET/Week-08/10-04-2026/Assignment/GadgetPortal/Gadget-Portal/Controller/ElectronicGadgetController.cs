using Microsoft.AspNetCore.Mvc;
using ElectronicStoreAPI.Models;
using ElectronicStoreAPI.Models.Entities;
using ElectronicStoreAPI.DTOs;
using System.ComponentModel.DataAnnotations;

namespace ElectronicStoreAPI.Controller
{
  [Route("api/[controller]")]
  [ApiController]
  public class ElectronicGadgetController : ControllerBase
  {
    private static List<ElectronicGadget> gadgets = new List<ElectronicGadget>()
    {
       new ElectronicGadget
            {
                Id = new Guid("550e8400-e29b-41d4-a716-446655440000"),
                Name = "Smart AI Glasses",
                Brand = "Meta",
                Category = "Smart Eyewear",
                Price = 29999,
                IsAvailable = true,
                Description = "AI Smart Glasses"
            },
            new ElectronicGadget
            {
                Id = new Guid("550e8400-e29b-41d4-a716-446634463340"),
                Name = "Smart Laptop",
                Brand = "Asus",
                Category = "Asus A Tuf gaming laptop",
                Price = 69999,
                IsAvailable = true,
                Description = "Asus military grade laptop"
            },
    
    };

    //Get All
    [HttpGet]
    public IActionResult Get()
      {
            return Ok(gadgets);
      }

    //Get by Id
    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
      {
            var gadget = gadgets.Find(g => g.Id == id);
            if (gadget == null)
            {
                return NotFound(new { message = "Gadget not found" });
            }
            return Ok(gadget);
      }

      //Create gadget
      [HttpPost]
      public IActionResult Create(CreateElectronicGadgetDto createDto)
      {
            var newGadget = new ElectronicGadget
            {
                Id = Guid.NewGuid(),
                Name = createDto.Name,
                Brand = createDto.Brand,
                Category = createDto.Category,
                Price = createDto.Price,
                IsAvailable = createDto.IsAvailable,
                Description = createDto.Description
            };

            gadgets.Add(newGadget);
            return CreatedAtAction(nameof(GetById), new { id = newGadget.Id }, newGadget);
      }

      [HttpPut("{id}")]
        public IActionResult Update(Guid id, CreateElectronicGadgetDto dto)
        {
            var gadget = gadgets.FirstOrDefault(x => x.Id == id);

            if (gadget == null)
                return NotFound(new { message = "Gadget not found" });

            gadget.Name = dto.Name;
            gadget.Brand = dto.Brand;
            gadget.Category = dto.Category;
            gadget.Price = dto.Price;
            gadget.IsAvailable = dto.IsAvailable;
            gadget.Description = dto.Description;

            return NoContent();
        }

        // PATCH
        [HttpPatch("{id}")]
        public IActionResult Patch(Guid id, UpdateElectronicGadgetDto dto)
        {
            var gadget = gadgets.FirstOrDefault(x => x.Id == id);

            if (gadget == null)
                return NotFound(new { message = "Gadget not found" });

            if (dto.Name != null)
                gadget.Name = dto.Name;

            if (dto.Brand != null)
                gadget.Brand = dto.Brand;

            if (dto.Category != null)
                gadget.Category = dto.Category;

            if (dto.Price.HasValue)
                gadget.Price = dto.Price.Value;

            if (dto.IsAvailable.HasValue)
                gadget.IsAvailable = dto.IsAvailable.Value;

            if (dto.Description != null)
                gadget.Description = dto.Description;

            return NoContent();
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var gadget = gadgets.FirstOrDefault(x => x.Id == id);

            if (gadget == null)
                return NotFound(new { message = "Gadget not found" });

            gadgets.Remove(gadget);

            return NoContent();
        }
  }
}