namespace MultiBillGenerator.Models
{
    public class Bill
    {
        public int Id { get; set; }
        public string InvoiceNumber { get; set; } = string.Empty;
        public DateTime BillDate { get; set; }
        public List<BillItem> Items { get; set; } = new List<BillItem>();
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public string DiscountType { get; set; } = "percentage"; // percentage or fixed
        public decimal TaxRate { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public string Notes { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
