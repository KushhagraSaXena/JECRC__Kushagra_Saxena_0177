import React, { useState, useEffect } from 'react';
import './BillGenerator.css';
import BillItems from './BillItems';
import BillSummary from './BillSummary';
import { generateUniqueInvoiceNumber } from '../utils/helpers';

const API_BASE_URL = 'http://localhost:5000/api';

function BillGenerator({ catalogs, onBillCreated }) {
  const [selectedCatalog, setSelectedCatalog] = useState('');
  const [billItems, setBillItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('percentage');
  const [taxRate, setTaxRate] = useState(5);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setInvoiceNumber(generateUniqueInvoiceNumber());
  }, []);

  const handleAddItem = (item) => {
    setBillItems([...billItems, { ...item, id: Date.now() }]);
  };

  const handleRemoveItem = (itemId) => {
    setBillItems(billItems.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    setBillItems(billItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const handleUpdatePrice = (itemId, price) => {
    setBillItems(billItems.map(item =>
      item.id === itemId ? { ...item, price } : item
    ));
  };

  const calculateSubtotal = () => {
    return billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (discountType === 'percentage') {
      return (subtotal * discount) / 100;
    }
    return discount;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const afterDiscount = subtotal - calculateDiscount();
    return (afterDiscount * taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const handleSaveBill = async () => {
    if (billItems.length === 0) {
      alert('Please add items to the bill');
      return;
    }

    const billData = {
      invoiceNumber,
      billDate: new Date().toISOString(),
      items: billItems,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      discountType,
      taxRate,
      tax: calculateTax(),
      total: calculateTotal(),
      notes
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(billData)
      });

      if (response.ok) {
        alert('Bill saved successfully!');
        localStorage.setItem(invoiceNumber, JSON.stringify(billData));
        onBillCreated(billData);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving bill:', error);
      // Fallback to local storage
      localStorage.setItem(invoiceNumber, JSON.stringify(billData));
      alert('Bill saved to local storage!');
      onBillCreated(billData);
      resetForm();
    }
  };

  const handlePrintBill = () => {
    window.print();
  };

  const resetForm = () => {
    setBillItems([]);
    setDiscount(0);
    setDiscountType('percentage');
    setInvoiceNumber(generateUniqueInvoiceNumber());
    setNotes('');
    setSelectedCatalog('');
  };

  return (
    <div className="bill-generator">
      <div className="bill-generator-container">
        <div className="bill-generator-left">
          <section className="bill-section">
            <h2>Bill Information</h2>
            <div className="form-group">
              <label>Invoice Number</label>
              <input type="text" value={invoiceNumber} disabled className="invoice-input" />
            </div>
            <div className="form-group">
              <label>Date & Time</label>
              <input type="text" value={new Date().toLocaleString()} disabled className="date-input" />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes here..."
                rows="3"
              />
            </div>
          </section>

          <section className="bill-section">
            <h2>Add Items</h2>
            <div className="form-group">
              <label>Select Catalog</label>
              <select 
                value={selectedCatalog}
                onChange={(e) => setSelectedCatalog(e.target.value)}
              >
                <option value="">-- Choose Catalog --</option>
                <option value="entrance">Entrance Fee</option>
                <option value="donation">Donation</option>
                <option value="product">Product Sales</option>
                <option value="custom">Custom Item</option>
              </select>
            </div>

            {selectedCatalog && (
              <div className="catalog-items">
                {selectedCatalog === 'custom' ? (
                  <CustomItemForm onAddItem={handleAddItem} />
                ) : (
                  <CatalogItemList 
                    catalogType={selectedCatalog}
                    onAddItem={handleAddItem}
                  />
                )}
              </div>
            )}
          </section>

          <section className="bill-section">
            <h2>Discount & Tax</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Discount Type</label>
                <select 
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  {discountType === 'percentage' ? 'Discount (%)' : 'Discount (Amount)'}
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  min="0"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Tax Rate (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                min="0"
              />
            </div>
          </section>
        </div>

        <div className="bill-generator-right">
          <BillItems
            items={billItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onUpdatePrice={handleUpdatePrice}
          />

          <BillSummary
            subtotal={calculateSubtotal()}
            discount={calculateDiscount()}
            tax={calculateTax()}
            total={calculateTotal()}
            invoiceNumber={invoiceNumber}
            billDate={new Date().toLocaleString()}
            items={billItems}
          />

          <div className="bill-actions">
            <button className="btn btn-save" onClick={handleSaveBill}>
              💾 Save Bill
            </button>
            <button className="btn btn-print" onClick={handlePrintBill}>
              🖨️ Print
            </button>
            <button className="btn btn-reset" onClick={resetForm}>
              🔄 Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogItemList({ catalogType, onAddItem }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCatalogItems();
  }, [catalogType]);

  const fetchCatalogItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/catalogs/${catalogType}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Error fetching catalog items:', error);
      setItems(getDefaultItems(catalogType));
    }
  };

  const getDefaultItems = (type) => {
    const defaults = {
      entrance: [
        { name: 'Adult Ticket', price: 500, category: 'entrance' },
        { name: 'Child Ticket', price: 250, category: 'entrance' },
        { name: 'Senior Ticket', price: 300, category: 'entrance' },
        { name: 'VIP Ticket', price: 1000, category: 'entrance' }
      ],
      donation: [
        { name: 'Small Donation', price: 100, category: 'donation' },
        { name: 'Medium Donation', price: 500, category: 'donation' },
        { name: 'Large Donation', price: 1000, category: 'donation' }
      ],
      product: [
        { name: 'Merchandise 1', price: 200, category: 'product' },
        { name: 'Food Item 1', price: 150, category: 'product' },
        { name: 'Service 1', price: 300, category: 'product' }
      ]
    };
    return defaults[type] || [];
  };

  return (
    <div className="catalog-list">
      {items.map((item, index) => (
        <div key={index} className="catalog-item">
          <div className="item-info">
            <span className="item-name">{item.name}</span>
            <span className="item-price">₹{item.price}</span>
          </div>
          <button 
            className="btn btn-add-item"
            onClick={() => onAddItem({ 
              name: item.name, 
              price: item.price, 
              quantity: 1,
              category: item.category 
            })}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
}

function CustomItemForm({ onAddItem }) {
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customQuantity, setCustomQuantity] = useState(1);

  const handleAddCustomItem = () => {
    if (!customName || !customPrice) {
      alert('Please enter item name and price');
      return;
    }

    onAddItem({
      name: customName,
      price: parseFloat(customPrice),
      quantity: customQuantity,
      category: 'custom'
    });

    setCustomName('');
    setCustomPrice('');
    setCustomQuantity(1);
  };

  return (
    <div className="custom-item-form">
      <div className="form-group">
        <label>Item Name</label>
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Enter item name"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          value={customPrice}
          onChange={(e) => setCustomPrice(e.target.value)}
          placeholder="Enter price"
          min="0"
        />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          value={customQuantity}
          onChange={(e) => setCustomQuantity(parseInt(e.target.value) || 1)}
          min="1"
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddCustomItem}>
        ➕ Add Custom Item
      </button>
    </div>
  );
}

export default BillGenerator;
