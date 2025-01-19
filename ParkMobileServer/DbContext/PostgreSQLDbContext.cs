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
        }
        public DbSet<ItemEntity> ItemEntities { get; set; } = null!;
		public DbSet<DescriptionEntity> DescriptionEntity { get; set; } = null!;
		public DbSet<ArticleEntity> ArticleEntity { get; set; } = null!;
        public DbSet<ItemCategory> ItemCategories { get; set; } = null!;
        public DbSet<ItemBrand> ItemBrands { get; set; } = null!;
		public DbSet<User> Users { get; set; } = null!;
        public DbSet<Slider> Sliders { get; set; } = null!;
    }
}
