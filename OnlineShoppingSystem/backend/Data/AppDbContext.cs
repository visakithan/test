using Microsoft.EntityFrameworkCore;
using OnlineShoppingSystem.Models;

namespace OnlineShoppingSystem.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
	public DbSet<Order> Orders => Set<Order>();
	public DbSet<OrderItem> OrderItems => Set<OrderItem>();
	public DbSet<Product> Products => Set<Product>();

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Order>().Property(order => order.Total).HasPrecision(18, 2);
		modelBuilder.Entity<OrderItem>().Property(item => item.UnitPrice).HasPrecision(18, 2);
		modelBuilder.Entity<OrderItem>()
			.HasOne(item => item.Order)
			.WithMany(order => order.Items)
			.HasForeignKey(item => item.OrderId)
			.OnDelete(DeleteBehavior.Cascade);
	}
}
