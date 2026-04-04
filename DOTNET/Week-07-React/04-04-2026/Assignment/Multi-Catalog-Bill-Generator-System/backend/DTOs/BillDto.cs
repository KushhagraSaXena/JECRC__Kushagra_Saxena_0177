namespace MultiBillGenerator.DTOs
{
    public class BillDto
    {
        public int Id { get; set; }
        public string InvoiceNumber { get; set; } = string.Empty;
        public DateTime BillDate { get; set; }
        public List<BillItemDto> Items { get; set; } = new List<BillItemDto>();
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public string DiscountType { get; set; } = "percentage";
        public decimal TaxRate { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public string Notes { get; set; } = string.Empty;
    }
}
