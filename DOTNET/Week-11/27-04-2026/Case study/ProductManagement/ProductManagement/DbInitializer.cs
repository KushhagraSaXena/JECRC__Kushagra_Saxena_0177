using ProductManagement.Data;
using ProductManagement.Models;

namespace ProductManagement
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            // Check if data already exists
            if (context.CategoryDetails.Any() || context.Products.Any())
            {
                return;
            }

            // Add Categories
            var categories = new Category[]
            {
                new Category { Name = "Electronics" },
                new Category { Name = "Clothing" },
                new Category { Name = "Books" }
            };
            context.CategoryDetails.AddRange(categories);
            context.SaveChanges();

            // Add Tags
            var tags = new Tag[]
            {
                new Tag { Name = "New" },
                new Tag { Name = "Sale" },
                new Tag { Name = "Popular" },
                new Tag { Name = "Featured" }
            };
            context.Tags.AddRange(tags);
            context.SaveChanges();

            // Add Products
            var products = new Product[]
            {
                new Product
                {
                    Name = "Laptop",
                    Price = 999.99m,
                    CategoryId = categories[0].Id,
                    ProductDetail = new ProductDetail
                    {
                        Description = "High-performance laptop with Intel i7 processor",
                        createdAt = DateTime.UtcNow
                    }
                },
                new Product
                {
                    Name = "T-Shirt",
                    Price = 29.99m,
                    CategoryId = categories[1].Id,
                    ProductDetail = new ProductDetail
                    {
                        Description = "Comfortable cotton t-shirt available in multiple colors",
                        createdAt = DateTime.UtcNow
                    }
                },
                new Product
                {
                    Name = "C# Programming Book",
                    Price = 49.99m,
                    CategoryId = categories[2].Id,
                    ProductDetail = new ProductDetail
                    {
                        Description = "Learn C# programming from beginner to advanced level",
                        createdAt = DateTime.UtcNow
                    }
                }
            };
            context.Products.AddRange(products);
            context.SaveChanges();

            // Add Product Tags
            var productTags = new ProductTag[]
            {
                new ProductTag { ProductId = products[0].Id, TagId = tags[0].Id }, // Laptop - New
                new ProductTag { ProductId = products[0].Id, TagId = tags[2].Id }, // Laptop - Popular
                new ProductTag { ProductId = products[1].Id, TagId = tags[1].Id }, // T-Shirt - Sale
                new ProductTag { ProductId = products[2].Id, TagId = tags[3].Id }  // Book - Featured
            };
            context.ProductTags.AddRange(productTags);
            context.SaveChanges();
        }
    }
}
