using Microsoft.AspNetCore.Mvc;
using OnlineShoppingSystem.DTOs;
using OnlineShoppingSystem.Services;

namespace OnlineShoppingSystem.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController(OrderService orderService) : ControllerBase
{
	[HttpPost]
	public async Task<ActionResult<OrderResponse>> Create(CreateOrderRequest request, CancellationToken cancellationToken)
	{
		try
		{
			var order = await orderService.CreateAsync(request, cancellationToken);
			return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
		}
		catch (ArgumentException exception) { return BadRequest(new { message = exception.Message }); }
		catch (KeyNotFoundException exception) { return NotFound(new { message = exception.Message }); }
		catch (InvalidOperationException exception) { return Conflict(new { message = exception.Message }); }
	}

	[HttpGet]
	public async Task<ActionResult<List<OrderResponse>>> GetAll([FromQuery] string? customerEmail, CancellationToken cancellationToken) =>
		Ok(await orderService.GetAllAsync(customerEmail, cancellationToken));

	[HttpGet("{id:int}")]
	public async Task<ActionResult<OrderResponse>> GetById(int id, CancellationToken cancellationToken)
	{
		var order = await orderService.GetByIdAsync(id, cancellationToken);
		return order is null ? NotFound() : Ok(order);
	}
}
