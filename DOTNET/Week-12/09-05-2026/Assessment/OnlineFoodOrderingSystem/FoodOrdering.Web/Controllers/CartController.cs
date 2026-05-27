using FoodOrdering.Domain.Models;
using FoodOrdering.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using FoodOrdering.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Web.Controllers;

public class CartController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;
    public CartController( ApplicationDbContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public IActionResult Index()
    {
        var cart = GetCart();

        return View(cart);
    }

    public IActionResult AddToCart(int id)
    {
        var food =
            _context.FoodItems.FirstOrDefault(f => f.Id == id);

        if (food == null)
        {
            return NotFound();
        }

        var cart = GetCart();

        var existingItem =
            cart.FirstOrDefault(c => c.FoodItemId == id);

        if (existingItem != null)
        {
            existingItem.Quantity++;
        }
        else
        {
            cart.Add(new CartItem
            {
                FoodItemId = food.Id,
                Name = food.Name,
                Price = food.Price,
                Quantity = 1,
                ImageUrl = food.ImageUrl
            });
        }

        SaveCart(cart);

        return RedirectToAction("Index", "Food");
    }

    public IActionResult Remove(int id)
    {
        var cart = GetCart();

        var item =
            cart.FirstOrDefault(c => c.FoodItemId == id);

        if (item != null)
        {
            cart.Remove(item);
        }

        SaveCart(cart);

        return RedirectToAction(nameof(Index));
    }

    private List<CartItem> GetCart()
    {
        var sessionCart =
            HttpContext.Session.GetString("Cart");

        if (string.IsNullOrEmpty(sessionCart))
        {
            return new List<CartItem>();
        }

        return JsonConvert.DeserializeObject<List<CartItem>>(
            sessionCart)!;
    }

    private void SaveCart(List<CartItem> cart)
    {
        HttpContext.Session.SetString(
            "Cart",
            JsonConvert.SerializeObject(cart));
    }

    public async Task<IActionResult> Checkout()
    {
        var cart = GetCart();

        if (!cart.Any())
        {
            return RedirectToAction(nameof(Index));
        }

        var user =
            await _userManager.GetUserAsync(User);

        if (user == null)
        {
            return RedirectToPage(
                "/Account/Login",
                new { area = "Identity" });
        }

        var order = new Order
        {
            UserId = user.Id,
            OrderDate = DateTime.Now,
            Status = "Pending",
            TotalAmount = cart.Sum(c =>
                c.Price * c.Quantity)
        };

        _context.Orders.Add(order);

        await _context.SaveChangesAsync();

        foreach (var item in cart)
        {
            _context.OrderItems.Add(new OrderItem
            {
                OrderId = order.Id,
                FoodItemId = item.FoodItemId,
                Quantity = item.Quantity,
                Price = item.Price
            });
        }

        await _context.SaveChangesAsync();

        HttpContext.Session.Remove("Cart");

        return RedirectToAction("Success", new { id = order.Id });
    }

    public async Task<IActionResult> Success(int id)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.FoodItem)
            .FirstOrDefaultAsync(o => o.Id == id);

        return View(order);
    }

    public IActionResult OrderSuccess()
    {
        return View();
    }
}