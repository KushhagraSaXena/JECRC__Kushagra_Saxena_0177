using MultiBillGenerator.Models;
using Microsoft.EntityFrameworkCore;

namespace MultiBillGenerator.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<CatalogItem> CatalogItems { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillItem> BillItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure CatalogItem
            modelBuilder.Entity<CatalogItem>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<CatalogItem>()
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(200);

            modelBuilder.Entity<CatalogItem>()
                .Property(c => c.Category)
                .IsRequired()
                .HasMaxLength(50);

            // Configure Bill
            modelBuilder.Entity<Bill>()
                .HasKey(b => b.Id);

            modelBuilder.Entity<Bill>()
                .Property(b => b.InvoiceNumber)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Bill>()
                .HasMany(b => b.Items)
                .WithOne(bi => bi.Bill)
                .HasForeignKey(bi => bi.BillId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure BillItem
            modelBuilder.Entity<BillItem>()
                .HasKey(bi => bi.Id);

            modelBuilder.Entity<BillItem>()
                .Property(bi => bi.ItemName)
                .IsRequired()
                .HasMaxLength(200);

            // Seed default catalog items
            SeedDefaultData(modelBuilder);
        }

        private void SeedDefaultData(ModelBuilder modelBuilder)
        {
            // Entrance Fee Catalog
            modelBuilder.Entity<CatalogItem>().HasData(
                new CatalogItem { Id = 1, Name = "Adult Ticket", Price = 500, Category = "entrance" },
                new CatalogItem { Id = 2, Name = "Child Ticket", Price = 250, Category = "entrance" },
                new CatalogItem { Id = 3, Name = "Senior Ticket", Price = 300, Category = "entrance" },
                new CatalogItem { Id = 4, Name = "VIP Ticket", Price = 1000, Category = "entrance" }
            );

            // Donation Catalog
            modelBuilder.Entity<CatalogItem>().HasData(
                new CatalogItem { Id = 5, Name = "Small Donation", Price = 100, Category = "donation" },
                new CatalogItem { Id = 6, Name = "Medium Donation", Price = 500, Category = "donation" },
                new CatalogItem { Id = 7, Name = "Large Donation", Price = 1000, Category = "donation" }
            );

            // Product Sales Catalog
            modelBuilder.Entity<CatalogItem>().HasData(
                new CatalogItem { Id = 8, Name = "Merchandise T-Shirt", Price = 250, Category = "product" },
                new CatalogItem { Id = 9, Name = "Snack Pack", Price = 150, Category = "product" },
                new CatalogItem { Id = 10, Name = "Beverage", Price = 100, Category = "product" }
            );
        }
    }
}
