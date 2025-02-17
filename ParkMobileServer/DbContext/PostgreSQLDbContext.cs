using Microsoft.EntityFrameworkCore;
using ParkMobileServer.Entities.Items;
using ParkMobileServer.Entities.Orders;
using ParkMobileServer.Entities.Users;
using ParkMobileServer.Entities;
using ParkMobileServer.Entities.Filters;

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
							.HasOne(p => p.Brand)
							.WithMany(b => b.Products)
							.HasForeignKey(p => p.BrandId);
			modelBuilder.Entity<ItemEntity>()
							.HasOne(i => i.Description)
							.WithOne(d => d.Item)
							.HasForeignKey<DescriptionEntity>(i => i.ItemId)
							.OnDelete(DeleteBehavior.Restrict);
			modelBuilder.Entity<ItemEntity>()
							.HasOne(i => i.Article)
							.WithOne(a => a.Item)
							.HasForeignKey<ArticleEntity>(a => a.ItemId)
							.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<ItemEntity>()
							.HasMany(i => i.Filters)
							.WithMany(f => f.Items)
							.UsingEntity<Dictionary<string, object>>(
								"ItemFilter",
								j => j.HasOne<FilterEntity>().WithMany().HasForeignKey("FilterId"),
								j => j.HasOne<ItemEntity>().WithMany().HasForeignKey("ItemId"),
								j => j.ToTable("ItemFilters")
							);

			modelBuilder.Entity<Order>()
							.HasMany(o => o.Items)
							.WithOne(i => i.Order)
							.OnDelete(DeleteBehavior.Cascade);
        }
        public DbSet<ItemEntity> ItemEntities { get; set; } = null!;
		public DbSet<Order> Order { get; set; } = null!;
		public DbSet<OrderItem> OrderItem { get; set; } = null!;
		public DbSet<DescriptionEntity> DescriptionEntity { get; set; } = null!;
		public DbSet<ArticleEntity> ArticleEntity { get; set; } = null!;
        public DbSet<ItemCategory> ItemCategories { get; set; } = null!;
        public DbSet<ItemBrand> ItemBrands { get; set; } = null!;
		public DbSet<User> Users { get; set; } = null!;
        public DbSet<Slider> Sliders { get; set; } = null!;
		public DbSet<FilterEntity> Filters { get; set; } = null!;
    }
}
