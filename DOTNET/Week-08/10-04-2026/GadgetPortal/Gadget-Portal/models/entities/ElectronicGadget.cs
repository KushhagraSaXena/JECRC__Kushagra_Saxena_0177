using System.ComponentModel.DataAnnotations;

namespace ElectronicStoreAPI.Models.Entities
{
    public class ElectronicGadget
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(50)]
        public string? Name { get; set; }

        [MaxLength(50)]
        public string? Brand { get; set; }

        [MaxLength(50)]
        public string? Category { get; set; }

        [Required]
        [Range(1, 1000000)]
        public decimal Price { get; set; }

        [Required]
        public bool IsAvailable { get; set; }

        [Required]
        [MaxLength(200)]
        public string? Description { get; set; }
    }
}