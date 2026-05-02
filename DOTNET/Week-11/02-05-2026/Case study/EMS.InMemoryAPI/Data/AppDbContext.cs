using Microsoft.EntityFrameworkCore;
using EMS.InMemoryAPI.Model;

namespace EMS.InMemoryAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // DbSet for Employee table
        public DbSet<Employee> Employees { get; set; }
    }
}
