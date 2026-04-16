using System.ComponentModel.DataAnnotations;
using ElectronicStoreAPI.Attributes;

namespace ElectronicStoreAPI.DTOs
{
    public class PatchElectronicGadgetDto
    {
        [MaxLength(50)]
        [NotEmptyOrWhitespace]
        public string? Name { get; set; }

        [MaxLength(50)]
        [NotEmptyOrWhitespace]
        public string? Brand { get; set; }

        [MaxLength(50)]
        [ValidCategory]
        public string? Category { get; set; }

        [Range(1, 1000000)]
        public decimal? Price { get; set; }

        public bool? IsAvailable { get; set; }

        [MaxLength(200)]
        [NotEmptyOrWhitespace]
        public string? Description { get; set; }
    }
}