using System.ComponentModel.DataAnnotations;

namespace OnlineShoppingSystem.Models;

public class OrderItem
{
	public int Id { get; set; }
	public int OrderId { get; set; }
	public Order Order { get; set; } = null!;
	public int ProductId { get; set; }

	[Required, MaxLength(200)]
	public string ProductName { get; set; } = string.Empty;

	public int Quantity { get; set; }
	public decimal UnitPrice { get; set; }
	public decimal LineTotal => UnitPrice * Quantity;
}
