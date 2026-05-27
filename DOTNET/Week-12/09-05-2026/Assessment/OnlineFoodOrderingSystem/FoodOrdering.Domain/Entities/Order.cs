using System.ComponentModel.DataAnnotations;

namespace FoodOrdering.Domain.Entities;

public class Order
{
	public int Id { get; set; }

	public string UserId { get; set; } = string.Empty;

	public DateTime OrderDate { get; set; }

	public decimal TotalAmount { get; set; }

	[MaxLength(50)]
	public string Status { get; set; } = "Pending";

	public ICollection<OrderItem>? OrderItems { get; set; }
}