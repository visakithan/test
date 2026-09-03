using System.ComponentModel.DataAnnotations;

namespace OnlineShoppingSystem.Models;

public class Product
{
	public int Id { get; set; }
	[Required, MaxLength(200)] public string Name { get; set; } = string.Empty;
	public decimal Price { get; set; }
	public int Stock { get; set; }
}
