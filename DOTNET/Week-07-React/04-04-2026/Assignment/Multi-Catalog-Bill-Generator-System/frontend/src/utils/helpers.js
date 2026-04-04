export function generateUniqueInvoiceNumber() {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INV-${timestamp.slice(-6)}-${random}`;
}

export function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`;
}

export function formatDate(date) {
  return new Date(date).toLocaleString();
}

export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function calculateDiscount(subtotal, discount, discountType) {
  if (discountType === 'percentage') {
    return (subtotal * discount) / 100;
  }
  return discount;
}

export function calculateTax(subtotal, discount, taxRate) {
  const afterDiscount = subtotal - discount;
  return (afterDiscount * taxRate) / 100;
}

export function calculateTotal(subtotal, discount, tax) {
  return subtotal - discount + tax;
}

export function exportToCSV(bills) {
  let csv = 'Invoice#,Date,Items,Subtotal,Discount,Tax,Total\n';
  
  bills.forEach(bill => {
    csv += `"${bill.invoiceNumber}","${bill.billDate}","${bill.items.length}",${bill.subtotal},${bill.discount},${bill.tax},${bill.total}\n`;
  });

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  element.setAttribute('download', `bills_export_${new Date().toISOString().split('T')[0]}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
