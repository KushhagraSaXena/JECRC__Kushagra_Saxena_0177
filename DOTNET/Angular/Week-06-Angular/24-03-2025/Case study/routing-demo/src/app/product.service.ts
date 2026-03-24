import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  getProducts(): Product[] {
    return [
      new Product(1, 'Laptop', 999.99),
      new Product(2, 'Samsung Mobile', 499.99),
      new Product(3, 'Sony HeadPhones', 200.00)
    ];
  }

  getProductByID(id: number): Product | undefined {
    return this.getProducts().find(product => product.productID === id);
  }
}
