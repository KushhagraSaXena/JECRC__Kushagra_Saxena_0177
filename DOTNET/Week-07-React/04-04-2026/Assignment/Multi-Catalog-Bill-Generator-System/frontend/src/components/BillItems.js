import React from 'react';
import './BillItems.css';

function BillItems({ items, onRemoveItem, onUpdateQuantity, onUpdatePrice }) {
  return (
    <div className="bill-items">
      <h2>Bill Items</h2>
      {items.length === 0 ? (
        <div className="no-items">
          <p>No items added yet. Add items from the catalog.</p>
        </div>
      ) : (
        <div className="items-table">
          <div className="table-header">
            <div className="col-item">Item</div>
            <div className="col-price">Price</div>
            <div className="col-qty">Qty</div>
            <div className="col-total">Total</div>
            <div className="col-action">Action</div>
          </div>
          {items.map((item) => (
            <div key={item.id} className="table-row">
              <div className="col-item">{item.name}</div>
              <div className="col-price">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => onUpdatePrice(item.id, parseFloat(e.target.value))}
                  className="price-input"
                />
              </div>
              <div className="col-qty">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                  className="qty-input"
                />
              </div>
              <div className="col-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
              <div className="col-action">
                <button
                  className="btn-remove"
                  onClick={() => onRemoveItem(item.id)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BillItems;
