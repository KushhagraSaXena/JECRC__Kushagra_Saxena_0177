using FoodOrdering.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using FoodOrdering.Web.Services;

namespace FoodOrdering.Web.Controllers
{
    [Authorize]
    public class OrdersController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly InvoicePdfGenerator _invoicePdfGenerator;

        public OrdersController(
            ApplicationDbContext context,
            UserManager<IdentityUser> userManager,
            InvoicePdfGenerator invoicePdfGenerator)
        {
            _context = context;
            _userManager = userManager;
            _invoicePdfGenerator = invoicePdfGenerator;
        }

        public async Task<IActionResult> Index()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.FoodItem)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return View(orders);
        }

        public async Task<IActionResult> Invoice(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.FoodItem)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByIdAsync(order.UserId);
            var pdfBytes = _invoicePdfGenerator.Generate(order, user);

            return File(pdfBytes, "application/pdf", $"invoice-{order.Id}.pdf");
        }
    }
}