using FoodOrdering.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FoodOrdering.Web.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services
    .AddDefaultIdentity<IdentityUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddSession();
builder.Services.AddSingleton<FoodOrdering.Web.Services.InvoicePdfGenerator>();
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseSession(); 

app.UseAuthentication();
app.UseAuthorization();

//app.MapStaticAssets();
//app.MapControllerRoute(
//    name: "areas",
//    pattern: "{area:exists}/{controller=Dashboard}/{action=Index}/{id?}");
//app.MapControllerRoute(
//    name: "default",
//    //pattern: "{controller=Home}/{action=Index}/{id?}")
//    pattern: "{controller=Food}/{action=Index}/{id?}")

app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Dashboard}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Food}/{action=Index}/{id?}");

app.MapRazorPages();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    await DbInitializer.SeedRolesAndAdminAsync(services);
}

app.Run();