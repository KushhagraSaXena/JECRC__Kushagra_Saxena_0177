using System.ComponentModel.DataAnnotations;

namespace ProductManagement.DTOs
{
    public class ProductResponseDto
    {
        [Required]
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string CategoryName { get; internal set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public List<int> TagIds { get; set; }
        public int Id { get; set; }
    }
}
