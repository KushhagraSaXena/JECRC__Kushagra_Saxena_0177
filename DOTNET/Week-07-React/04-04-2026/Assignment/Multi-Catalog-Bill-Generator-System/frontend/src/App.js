import React, { useState, useEffect } from 'react';
import './App.css';
import CatalogManager from './components/CatalogManager';
import BillGenerator from './components/BillGenerator';
import BillHistory from './components/BillHistory';

const API_BASE_URL = 'http://localhost:5000/api';
// http://localhost:5000/api

function App() {
  const [currentPage, setCurrentPage] = useState('bill-generator');
  const [catalogs, setCatalogs] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchCatalogs();
    fetchBills();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/catalogs`);
      if (response.ok) {
        const data = await response.json();
        setCatalogs(data);
      }
    } catch (error) {
      console.error('Error fetching catalogs:', error);
      // Use local storage as fallback
      const savedCatalogs = localStorage.getItem('catalogs');
      if (savedCatalogs) {
        setCatalogs(JSON.parse(savedCatalogs));
      }
    }
  };

  const fetchBills = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bills`);
      if (response.ok) {
        const data = await response.json();
        setBills(data);
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
      // Use local storage as fallback
      const savedBills = localStorage.getItem('bills');
      if (savedBills) {
        setBills(JSON.parse(savedBills));
      }
    }
  };

  const handleBillCreated = (newBill) => {
    setBills([...bills, newBill]);
    fetchBills();
  };

  const handleCatalogUpdated = () => {
    fetchCatalogs();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Multi-Catalog Bill Generator System</h1>
        <nav className="app-nav">
          <button 
            className={`nav-btn ${currentPage === 'bill-generator' ? 'active' : ''}`}
            onClick={() => setCurrentPage('bill-generator')}
          >
            Generate Bill
          </button>
          <button 
            className={`nav-btn ${currentPage === 'bill-history' ? 'active' : ''}`}
            onClick={() => setCurrentPage('bill-history')}
          >
            Bill History
          </button>
          <button 
            className={`nav-btn ${currentPage === 'catalog-manager' ? 'active' : ''}`}
            onClick={() => setCurrentPage('catalog-manager')}
          >
            Catalog Manager
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentPage === 'bill-generator' && (
          <BillGenerator 
            catalogs={catalogs} 
            onBillCreated={handleBillCreated}
          />
        )}
        {currentPage === 'bill-history' && (
          <BillHistory bills={bills} />
        )}
        {currentPage === 'catalog-manager' && (
          <CatalogManager 
            catalogs={catalogs} 
            onCatalogUpdated={handleCatalogUpdated}
          />
        )}
      </main>
    </div>
  );
}

export default App;
