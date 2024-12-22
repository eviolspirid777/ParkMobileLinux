using Microsoft.EntityFrameworkCore;
using ParkMobileServer.Entities.Items;
using ParkMobileServer.Entities.Orders;
using ParkMobileServer.Entities.Users;
using ParkMobileServer.Entities;

namespace ParkMobileServer.DbContext
{
    public class PostgreSQLDbContext : Microsoft.EntityFrameworkCore.DbContext
	{
        public PostgreSQLDbContext(DbContextOptions<PostgreSQLDbContext> options) : base(options)
		{
			Database.EnsureCreated();
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
            modelBuilder.Entity<ItemEntity>()
							.HasOne(p => p.Category)
							.WithMany(c => c.Products)
							.HasForeignKey(p => p.CategoryId);
			modelBuilder.Entity<ItemEntity>()
							.HasOne(p => p.ItemBrand)
							.WithMany(b => b.Products)
							.HasForeignKey(p => p.ItemBrandId);
			modelBuilder.Entity<OrderItemEntity>()
							.HasKey(oi => new { oi.OrderId, oi.ProductId });
			modelBuilder.Entity<OrderItemEntity>()
							.HasOne(oi => oi.Order)
							.WithMany(o => o.OrderItems)
							.HasForeignKey(oi => oi.OrderId);
			modelBuilder.Entity<OrderItemEntity>()
							.HasOne(oi => oi.Product)
							.WithMany()
							.HasForeignKey(oi => oi.ProductId);
            modelBuilder.Entity<Slider>()
                .HasMany(s => s.Images)
                .WithOne(i => i.Slider)
                .HasForeignKey(i => i.SliderId);
        }
        public DbSet<ItemEntity> ItemEntities { get; set; } = null!;
        public DbSet<ItemCategory> ItemCategories { get; set; } = null!;
        public DbSet<ItemBrand> ItemBrands { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItemEntity> OrderItems { get; set; } = null!;
		public DbSet<User> Users { get; set; } = null!;
        public DbSet<Slider> Sliders { get; set; } = null!;
        public DbSet<SliderImage> SliderImages { get; set; } = null!;
    }
}
