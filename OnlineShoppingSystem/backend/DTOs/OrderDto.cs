namespace OnlineShoppingSystem.DTOs;

public sealed class CreateOrderRequest
{
	public string CustomerEmail { get; set; } = string.Empty;
	public List<CreateOrderItemRequest> Items { get; set; } = new();
}

public sealed class CreateOrderItemRequest
{
	public int ProductId { get; set; }
	public int Quantity { get; set; }
}

public sealed class OrderResponse
{
	public int Id { get; set; }
	public string CustomerEmail { get; set; } = string.Empty;
	public DateTime CreatedAt { get; set; }
	public decimal Total { get; set; }
	public List<OrderItemResponse> Items { get; set; } = new();
}

public sealed class OrderItemResponse
{
	public int ProductId { get; set; }
	public string ProductName { get; set; } = string.Empty;
	public int Quantity { get; set; }
	public decimal UnitPrice { get; set; }
	public decimal LineTotal { get; set; }
}
