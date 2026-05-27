using Microsoft.AspNetCore.Identity;

namespace FoodOrdering.Web.Data;

public static class DbInitializer
{
    public static async Task SeedRolesAndAdminAsync(IServiceProvider service)
    {
        var roleManager =
            service.GetRequiredService<RoleManager<IdentityRole>>();

        var userManager =
            service.GetRequiredService<UserManager<IdentityUser>>();

        string[] roles =
        {
            "Admin",
            "Customer"
        };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(
                    new IdentityRole(role));
            }
        }

        var adminEmail = "admin@food.com";

        var adminUser =
            await userManager.FindByEmailAsync(adminEmail);

        if (adminUser == null)
        {
            var user = new IdentityUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(
                user,
                "Admin@123");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(
                    user,
                    "Admin");
            }
        }
    }
}