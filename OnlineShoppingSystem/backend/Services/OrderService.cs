using Microsoft.EntityFrameworkCore;
using OnlineShoppingSystem.Data;
using OnlineShoppingSystem.DTOs;
using OnlineShoppingSystem.Models;

namespace OnlineShoppingSystem.Services;

public class OrderService(AppDbContext db)
{
	public async Task<OrderResponse> CreateAsync(CreateOrderRequest request, CancellationToken cancellationToken)
	{
		if (string.IsNullOrWhiteSpace(request.CustomerEmail) || request.Items.Count == 0)
			throw new ArgumentException("Customer email and at least one item are required.");

		if (request.Items.Any(item => item.Quantity <= 0))
			throw new ArgumentException("Quantities must be greater than zero.");

		var requestedItems = request.Items
			.GroupBy(item => item.ProductId)
			.Select(group => new CreateOrderItemRequest { ProductId = group.Key, Quantity = group.Sum(item => item.Quantity) })
			.ToList();
		var productIds = requestedItems.Select(item => item.ProductId).ToList();
		var products = await db.Products.Where(product => productIds.Contains(product.Id)).ToDictionaryAsync(product => product.Id, cancellationToken);

		if (products.Count != productIds.Count)
			throw new KeyNotFoundException("One or more products could not be found.");

		await using var transaction = await db.Database.BeginTransactionAsync(cancellationToken);
		var order = new Order { CustomerEmail = request.CustomerEmail.Trim() };

		foreach (var requested in requestedItems)
		{
			var product = products[requested.ProductId];
			if (product.Stock < requested.Quantity)
				throw new InvalidOperationException($"Not enough stock for {product.Name}.");

			product.Stock -= requested.Quantity;
			order.Items.Add(new OrderItem
			{
				ProductId = product.Id,
				ProductName = product.Name,
				Quantity = requested.Quantity,
				UnitPrice = product.Price
			});
		}

		order.Total = order.Items.Sum(item => item.UnitPrice * item.Quantity);
		db.Orders.Add(order);
		await db.SaveChangesAsync(cancellationToken);
		await transaction.CommitAsync(cancellationToken);
		return ToResponse(order);
	}

	public async Task<List<OrderResponse>> GetAllAsync(string? customerEmail, CancellationToken cancellationToken)
	{
		var query = db.Orders.AsNoTracking().Include(order => order.Items).AsQueryable();
		if (!string.IsNullOrWhiteSpace(customerEmail))
			query = query.Where(order => order.CustomerEmail == customerEmail.Trim());

		var orders = await query.OrderByDescending(order => order.CreatedAt).ToListAsync(cancellationToken);
		return orders.Select(ToResponse).ToList();
	}

	public async Task<OrderResponse?> GetByIdAsync(int id, CancellationToken cancellationToken)
	{
		var order = await db.Orders.AsNoTracking().Include(item => item.Items).SingleOrDefaultAsync(item => item.Id == id, cancellationToken);
		return order is null ? null : ToResponse(order);
	}

	private static OrderResponse ToResponse(Order order) => new()
	{
		Id = order.Id,
		CustomerEmail = order.CustomerEmail,
		CreatedAt = order.CreatedAt,
		Total = order.Total,
		Items = order.Items.Select(item => new OrderItemResponse
		{
			ProductId = item.ProductId,
			ProductName = item.ProductName,
			Quantity = item.Quantity,
			UnitPrice = item.UnitPrice,
			LineTotal = item.UnitPrice * item.Quantity
		}).ToList()
	};
}
