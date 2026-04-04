import React, { useState, useEffect } from 'react';
import './CatalogManager.css';

const API_BASE_URL = 'http://localhost:5000/api';

function CatalogManager({ catalogs, onCatalogUpdated }) {
  const [catalogType, setCatalogType] = useState('entrance');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: 0, category: 'entrance' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCatalogItems();
  }, [catalogType]);

  const fetchCatalogItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/catalogs/${catalogType}`);
      if (response.ok) {
        setItems(await response.json());
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems(getDefaultItems(catalogType));
    }
  };

  const getDefaultItems = (type) => {
    const defaults = {
      entrance: [
        { id: 1, name: 'Adult Ticket', price: 500, category: 'entrance' },
        { id: 2, name: 'Child Ticket', price: 250, category: 'entrance' },
        { id: 3, name: 'Senior Ticket', price: 300, category: 'entrance' },
        { id: 4, name: 'VIP Ticket', price: 1000, category: 'entrance' }
      ],
      donation: [
        { id: 5, name: 'Small Donation', price: 100, category: 'donation' },
        { id: 6, name: 'Medium Donation', price: 500, category: 'donation' },
        { id: 7, name: 'Large Donation', price: 1000, category: 'donation' }
      ],
      product: [
        { id: 8, name: 'Merchandise T-Shirt', price: 250, category: 'product' },
        { id: 9, name: 'Snack Pack', price: 150, category: 'product' },
        { id: 10, name: 'Beverage', price: 100, category: 'product' }
      ]
    };
    return defaults[type] || [];
  };

  const handleAddItem = async () => {
    if (!newItem.name || newItem.price <= 0) {
      alert('Please enter valid item name and price');
      return;
    }

    const itemData = { ...newItem, category: catalogType };

    try {
      const response = await fetch(`${API_BASE_URL}/catalogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });

      if (response.ok) {
        fetchCatalogItems();
        setNewItem({ name: '', price: 0, category: catalogType });
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setItems([...items, { ...itemData, id: Date.now() }]);
      setNewItem({ name: '', price: 0, category: catalogType });
    }
  };

  const handleUpdateItem = async (id) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    try {
      const response = await fetch(`${API_BASE_URL}/catalogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        setEditingId(null);
        fetchCatalogItems();
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setEditingId(null);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await fetch(`${API_BASE_URL}/catalogs/${id}`, {
          method: 'DELETE'
        });
        fetchCatalogItems();
      } catch (error) {
        console.error('Error deleting item:', error);
        setItems(items.filter(item => item.id !== id));
      }
    }
  };

  return (
    <div className="catalog-manager">
      <h1>📦 Catalog Manager</h1>

      <div className="catalog-type-selector">
        <h2>Select Catalog Type</h2>
        <div className="type-buttons">
          {['entrance', 'donation', 'product'].map(type => (
            <button
              key={type}
              className={`type-btn ${catalogType === type ? 'active' : ''}`}
              onClick={() => setCatalogType(type)}
            >
              {type === 'entrance' && '🎫'}
              {type === 'donation' && '❤️'}
              {type === 'product' && '🛍️'}
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-content">
        <div className="add-item-section">
          <h2>Add New Item</h2>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Enter item name"
            />
          </div>
          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              placeholder="Enter price"
              min="0"
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddItem}>
            ➕ Add Item
          </button>
        </div>

        <div className="items-list-section">
          <h2>Current Items in {catalogType.charAt(0).toUpperCase() + catalogType.slice(1)} Catalog</h2>
          {items.length === 0 ? (
            <p className="no-items">No items in this catalog</p>
          ) : (
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className={editingId === item.id ? 'editing' : ''}>
                    <td>
                      {editingId === item.id ? (
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const updated = items.map(i =>
                              i.id === item.id ? { ...i, name: e.target.value } : i
                            );
                            setItems(updated);
                          }}
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td>
                      {editingId === item.id ? (
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            const updated = items.map(i =>
                              i.id === item.id ? { ...i, price: parseFloat(e.target.value) } : i
                            );
                            setItems(updated);
                          }}
                          min="0"
                        />
                      ) : (
                        `₹${item.price.toFixed(2)}`
                      )}
                    </td>
                    <td>
                      {editingId === item.id ? (
                        <>
                          <button
                            className="btn btn-save-small"
                            onClick={() => handleUpdateItem(item.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-cancel-small"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-edit"
                            onClick={() => setEditingId(item.id)}
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogManager;
