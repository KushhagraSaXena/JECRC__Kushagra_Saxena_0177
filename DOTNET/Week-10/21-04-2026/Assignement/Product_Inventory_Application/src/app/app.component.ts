import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from './services/product.service';

/**
 * Root component - ProductInventoryApplication
 * Manages the complete product inventory UI with filtering and sorting features
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Product Inventory Application';
  
  // State management
  allProducts: Product[] = [];           // Original product list from service
  filteredProducts: Product[] = [];      // Products after filtering/sorting
  categories: string[] = [];             // Available product categories
  
  // Filter controls
  selectedCategory: string = '';         // Currently selected category for filtering
  showInStockOnly: boolean = false;      // Checkbox: show only in-stock products
  sortByPrice: boolean = false;          // Track if price sorted in ascending order

  constructor(private productService: ProductService) {}

  /**
   * Component initialization
   * Load products and categories from service when component loads
   */
  ngOnInit(): void {
    // Fetch all available products
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.applyFiltersAndSort();
    });

    // Fetch unique product categories for the dropdown filter
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  /**
   * Apply category filter - show only selected category products
   * If no category is selected, clears the filter
   */
  applyFilter(): void {
    this.applyFiltersAndSort();
  }

  /**
   * Sort products by price in ascending order
   * Clicking price header again will reset to original order
   */
  sortByPriceAscending(): void {
    this.sortByPrice = !this.sortByPrice;
    this.applyFiltersAndSort();
  }

  /**
   * Core filtering and sorting logic
   * Combines category filter, in-stock filter, and price sorting
   */
  applyFiltersAndSort(): void {
    let filtered = [...this.allProducts];

    // Step 1: Apply category filter (only if a category is selected)
    if (this.selectedCategory) {
      filtered = filtered.filter(product => 
        product.category === this.selectedCategory
      );
    }

    // Step 2: Apply in-stock filter (only show products with stock > 0 if checkbox is checked)
    if (this.showInStockOnly) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Step 3: Apply price sorting (ascending order)
    if (this.sortByPrice) {
      filtered.sort((a, b) => a.price - b.price);
    }

    // Update displayed products
    this.filteredProducts = filtered;
  }

  /**
   * Determine stock status text and color
   * Returns friendly display text for product stock availability
   */
  getStockStatus(stock: number): string {
    return stock > 0 ? `In Stock (${stock})` : 'Out of Stock';
  }

  /**
   * Determine CSS class for stock status styling
   * Used to color code the status display
   */
  getStockClass(stock: number): string {
    return stock > 0 ? 'in-stock' : 'out-of-stock';
  }

  /**
   * Reset all filters and sorting
   * Returns to the original product list view
   */
  resetFilters(): void {
    this.selectedCategory = '';
    this.showInStockOnly = false;
    this.sortByPrice = false;
    this.applyFiltersAndSort();
  }
}
