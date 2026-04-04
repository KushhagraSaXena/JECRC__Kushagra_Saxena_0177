import React from 'react';
import './BillSummary.css';

function BillSummary({ subtotal, discount, tax, total, invoiceNumber, billDate, items }) {
  return (
    <div className="bill-summary">
      <div className="summary-header">
        <h2>Invoice Summary</h2>
        <div className="invoice-meta">
          <p><strong>Invoice #:</strong> {invoiceNumber}</p>
          <p><strong>Date:</strong> {billDate}</p>
        </div>
      </div>

      <div className="summary-items">
        <h3>Items Breakdown</h3>
        {items.length === 0 ? (
          <p className="no-items-msg">No items in bill</p>
        ) : (
          <div className="items-breakdown">
            {items.map((item) => (
              <div key={item.id} className="breakdown-item">
                <span className="item-desc">
                  {item.name} × {item.quantity}
                </span>
                <span className="item-amt">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="summary-total">
        <div className="summary-row">
          <span className="label">Subtotal:</span>
          <span className="value">₹{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="summary-row discount">
            <span className="label">Discount:</span>
            <span className="value">-₹{discount.toFixed(2)}</span>
          </div>
        )}
        {tax > 0 && (
          <div className="summary-row">
            <span className="label">Tax:</span>
            <span className="value">₹{tax.toFixed(2)}</span>
          </div>
        )}
        <div className="summary-row grand-total">
          <span className="label">Total:</span>
          <span className="value">₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="summary-footer">
        <p className="thank-you">Thank you for your business!</p>
      </div>
    </div>
  );
}

export default BillSummary;
