using System.ComponentModel.DataAnnotations;

namespace ElectronicStoreAPI.DTOs
{
    public class UpdateElectronicGadgetDto
    {
        [MaxLength(100)]
        public string? Name { get; set; }

        public string? Brand { get; set; }

        public string? Category { get; set; }

        public decimal? Price { get; set; }

        public bool? IsAvailable { get; set; }

        public string? Description { get; set; }
    }
}