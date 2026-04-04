using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiBillGenerator.Data;
using MultiBillGenerator.DTOs;
using MultiBillGenerator.Models;

namespace MultiBillGenerator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BillsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/bills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BillDto>>> GetBills()
        {
            var bills = await _context.Bills
                .Include(b => b.Items)
                .Select(b => new BillDto
                {
                    Id = b.Id,
                    InvoiceNumber = b.InvoiceNumber,
                    BillDate = b.BillDate,
                    Items = b.Items.Select(bi => new BillItemDto
                    {
                        Name = bi.ItemName,
                        Price = bi.Price,
                        Quantity = bi.Quantity,
                        Category = bi.Category
                    }).ToList(),
                    Subtotal = b.Subtotal,
                    Discount = b.Discount,
                    DiscountType = b.DiscountType,
                    TaxRate = b.TaxRate,
                    Tax = b.Tax,
                    Total = b.Total,
                    Notes = b.Notes
                })
                .ToListAsync();

            return Ok(bills);
        }

        // GET: api/bills/{invoiceNumber}
        [HttpGet("{invoiceNumber}")]
        public async Task<ActionResult<BillDto>> GetBill(string invoiceNumber)
        {
            var bill = await _context.Bills
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.InvoiceNumber == invoiceNumber);

            if (bill == null)
            {
                return NotFound();
            }

            var billDto = new BillDto
            {
                Id = bill.Id,
                InvoiceNumber = bill.InvoiceNumber,
                BillDate = bill.BillDate,
                Items = bill.Items.Select(bi => new BillItemDto
                {
                    Name = bi.ItemName,
                    Price = bi.Price,
                    Quantity = bi.Quantity,
                    Category = bi.Category
                }).ToList(),
                Subtotal = bill.Subtotal,
                Discount = bill.Discount,
                DiscountType = bill.DiscountType,
                TaxRate = bill.TaxRate,
                Tax = bill.Tax,
                Total = bill.Total,
                Notes = bill.Notes
            };

            return Ok(billDto);
        }

        // POST: api/bills
        [HttpPost]
        public async Task<ActionResult<BillDto>> CreateBill(CreateBillDto createBillDto)
        {
            var bill = new Bill
            {
                InvoiceNumber = createBillDto.InvoiceNumber,
                BillDate = createBillDto.BillDate,
                Subtotal = createBillDto.Subtotal,
                Discount = createBillDto.Discount,
                DiscountType = createBillDto.DiscountType,
                TaxRate = createBillDto.TaxRate,
                Tax = createBillDto.Tax,
                Total = createBillDto.Total,
                Notes = createBillDto.Notes
            };

            // Add bill items
            foreach (var itemDto in createBillDto.Items)
            {
                var billItem = new BillItem
                {
                    ItemName = itemDto.Name,
                    Price = itemDto.Price,
                    Quantity = itemDto.Quantity,
                    Category = itemDto.Category
                };
                bill.Items.Add(billItem);
            }

            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            var resultDto = new BillDto
            {
                Id = bill.Id,
                InvoiceNumber = bill.InvoiceNumber,
                BillDate = bill.BillDate,
                Items = bill.Items.Select(bi => new BillItemDto
                {
                    Name = bi.ItemName,
                    Price = bi.Price,
                    Quantity = bi.Quantity,
                    Category = bi.Category
                }).ToList(),
                Subtotal = bill.Subtotal,
                Discount = bill.Discount,
                DiscountType = bill.DiscountType,
                TaxRate = bill.TaxRate,
                Tax = bill.Tax,
                Total = bill.Total,
                Notes = bill.Notes
            };

            return CreatedAtAction(nameof(GetBill), 
                new { invoiceNumber = bill.InvoiceNumber }, resultDto);
        }

        // PUT: api/bills/{invoiceNumber}
        [HttpPut("{invoiceNumber}")]
        public async Task<IActionResult> UpdateBill(string invoiceNumber, CreateBillDto updateBillDto)
        {
            var bill = await _context.Bills
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.InvoiceNumber == invoiceNumber);

            if (bill == null)
            {
                return NotFound();
            }

            bill.BillDate = updateBillDto.BillDate;
            bill.Subtotal = updateBillDto.Subtotal;
            bill.Discount = updateBillDto.Discount;
            bill.DiscountType = updateBillDto.DiscountType;
            bill.TaxRate = updateBillDto.TaxRate;
            bill.Tax = updateBillDto.Tax;
            bill.Total = updateBillDto.Total;
            bill.Notes = updateBillDto.Notes;
            bill.UpdatedAt = DateTime.UtcNow;

            // Update items
            _context.BillItems.RemoveRange(bill.Items);
            
            foreach (var itemDto in updateBillDto.Items)
            {
                var billItem = new BillItem
                {
                    ItemName = itemDto.Name,
                    Price = itemDto.Price,
                    Quantity = itemDto.Quantity,
                    Category = itemDto.Category
                };
                bill.Items.Add(billItem);
            }

            _context.Bills.Update(bill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/bills/{invoiceNumber}
        [HttpDelete("{invoiceNumber}")]
        public async Task<IActionResult> DeleteBill(string invoiceNumber)
        {
            var bill = await _context.Bills.FirstOrDefaultAsync(b => b.InvoiceNumber == invoiceNumber);
            if (bill == null)
            {
                return NotFound();
            }

            _context.Bills.Remove(bill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/bills/daily-summary/{date}
        [HttpGet("daily-summary/{date}")]
        public async Task<ActionResult<object>> GetDailySummary(string date)
        {
            if (!DateTime.TryParse(date, out var parsedDate))
            {
                return BadRequest("Invalid date format");
            }

            var startOfDay = parsedDate.Date;
            var endOfDay = startOfDay.AddDays(1);

            var bills = await _context.Bills
                .Where(b => b.BillDate >= startOfDay && b.BillDate < endOfDay)
                .ToListAsync();

            var summary = new
            {
                Date = startOfDay.ToShortDateString(),
                TotalBills = bills.Count,
                TotalSales = bills.Sum(b => b.Total),
                TotalDiscount = bills.Sum(b => b.Discount),
                TotalTax = bills.Sum(b => b.Tax)
            };

            return Ok(summary);
        }
    }
}
