import React, { useState, useEffect } from 'react';
import './BillHistory.css';

const API_BASE_URL = 'http://localhost:5000/api';

function BillHistory({ bills }) {
  const [filteredBills, setFilteredBills] = useState(bills);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    let filtered = bills;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(bill =>
        bill.invoiceNumber.includes(searchTerm) ||
        bill.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.billDate) - new Date(a.billDate);
      } else if (sortBy === 'total') {
        return b.total - a.total;
      }
      return 0;
    });

    setFilteredBills(filtered);
  }, [bills, searchTerm, sortBy]);

  const handleDeleteBill = async (invoiceNumber) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      try {
        await fetch(`${API_BASE_URL}/bills/${invoiceNumber}`, {
          method: 'DELETE'
        });
        localStorage.removeItem(invoiceNumber);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting bill:', error);
        localStorage.removeItem(invoiceNumber);
        window.location.reload();
      }
    }
  };

  const handleExportPDF = (bill) => {
    // PDF export functionality
    alert('PDF export feature - integrate jsPDF library');
  };

  const getDailySummary = () => {
    const today = new Date();
    const todayStr = today.toDateString();
    const todaysBills = bills.filter(bill => new Date(bill.billDate).toDateString() === todayStr);
    const totalSales = todaysBills.reduce((sum, bill) => sum + bill.total, 0);
    const totalBills = todaysBills.length;

    return {
      totalBills,
      totalSales
    };
  };

  const summary = getDailySummary();

  return (
    <div className="bill-history">
      <div className="history-header">
        <h1>📊 Bill History</h1>
        
        <div className="daily-summary">
          <div className="summary-card">
            <h3>Today's Summary</h3>
            <p>Total Bills: <strong>{summary.totalBills}</strong></p>
            <p>Total Sales: <strong>₹{summary.totalSales.toFixed(2)}</strong></p>
          </div>
        </div>
      </div>

      <div className="history-controls">
        <input
          type="text"
          placeholder="Search by Invoice # or Notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="date">Sort by Date (Newest)</option>
          <option value="total">Sort by Total Amount</option>
        </select>
      </div>

      <div className="history-content">
        {filteredBills.length === 0 ? (
          <div className="no-bills">
            <p>No bills found</p>
          </div>
        ) : (
          <div className="bills-grid">
            {filteredBills.map((bill) => (
              <div 
                key={bill.invoiceNumber} 
                className="bill-card"
                onClick={() => setSelectedBill(bill)}
              >
                <div className="bill-card-header">
                  <h3>Invoice #{bill.invoiceNumber}</h3>
                  <span className="bill-date">
                    {new Date(bill.billDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="bill-card-info">
                  <p><strong>Total:</strong> ₹{bill.total.toFixed(2)}</p>
                  <p><strong>Items:</strong> {bill.items.length}</p>
                  {bill.notes && <p><strong>Notes:</strong> {bill.notes.substring(0, 30)}...</p>}
                </div>
                <div className="bill-card-actions">
                  <button 
                    className="btn btn-view"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBill(bill);
                    }}
                  >
                    View
                  </button>
                  <button 
                    className="btn btn-export"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExportPDF(bill);
                    }}
                  >
                    Export
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBill(bill.invoiceNumber);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBill && (
        <div className="bill-modal-overlay" onClick={() => setSelectedBill(null)}>
          <div className="bill-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Invoice #{selectedBill.invoiceNumber}</h2>
              <button className="btn-close" onClick={() => setSelectedBill(null)}>✕</button>
            </div>
            <div className="modal-content">
              <div className="modal-info">
                <p><strong>Date:</strong> {new Date(selectedBill.billDate).toLocaleString()}</p>
                <p><strong>Notes:</strong> {selectedBill.notes || 'N/A'}</p>
              </div>

              <h3>Items</h3>
              <div className="modal-items">
                {selectedBill.items.map((item, idx) => (
                  <div key={idx} className="modal-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="modal-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₹{selectedBill.subtotal.toFixed(2)}</span>
                </div>
                {selectedBill.discount > 0 && (
                  <div className="total-row">
                    <span>Discount:</span>
                    <span>-₹{selectedBill.discount.toFixed(2)}</span>
                  </div>
                )}
                {selectedBill.tax > 0 && (
                  <div className="total-row">
                    <span>Tax:</span>
                    <span>₹{selectedBill.tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>₹{selectedBill.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn btn-primary" onClick={() => window.print()}>
                  🖨️ Print
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setSelectedBill(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillHistory;
