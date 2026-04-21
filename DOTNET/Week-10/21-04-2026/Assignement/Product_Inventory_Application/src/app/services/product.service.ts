import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Product interface definition
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

/**
 * ProductService - Manages product data and retrieval
 * This service simulates an API call to fetch product inventory
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // Sample product data - simulating API response
  private products: Product[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 850.50, stock: 10 },
    { id: 2, name: 'Mouse', category: 'Electronics', price: 25.99, stock: 50 },
    { id: 3, name: 'Keyboard', category: 'Electronics', price: 75.00, stock: 30 },
    { id: 4, name: 'Monitor', category: 'Electronics', price: 250.00, stock: 0 },
    { id: 5, name: 'Desk Chair', category: 'Furniture', price: 120.00, stock: 15 },
    { id: 6, name: 'Office Desk', category: 'Furniture', price: 300.00, stock: 5 },
    { id: 7, name: 'Notebook', category: 'Stationery', price: 5.99, stock: 200 },
    { id: 8, name: 'Pen Set', category: 'Stationery', price: 12.50, stock: 100 },
    { id: 9, name: 'Laptop Stand', category: 'Accessories', price: 45.00, stock: 0 },
    { id: 10, name: 'USB Cable', category: 'Accessories', price: 9.99, stock: 500 }
  ];

  constructor() { }

  /**
   * Retrieves all products
   * Simulates an async API call using Observable
   */
  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  /**
   * Get unique product categories
   */
  getCategories(): Observable<string[]> {
    const categories = Array.from(new Set(this.products.map(p => p.category)));
    return of(categories.sort());
  }
}
