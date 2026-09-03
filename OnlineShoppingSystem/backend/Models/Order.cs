using System.ComponentModel.DataAnnotations;

namespace OnlineShoppingSystem.Models;

public class Order
{
	public int Id { get; set; }

	[Required, MaxLength(200)]
	public string CustomerEmail { get; set; } = string.Empty;

	[Required]
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

	public decimal Total { get; set; }

	public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
