import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {

  @Output() add = new EventEmitter<any>();

  searchText = '';
  selectedCategory = '';
products = [
  { id: 1, name: 'Laptop', price: 50000, category: 'Electronics', rating: 4 },
  { id: 2, name: 'Shoes', price: 2000, category: 'Fashion', rating: 3 },
  { id: 3, name: 'Smartphone', price: 25000, category: 'Electronics', rating: 5 },
  { id: 4, name: 'Watch', price: 3000, category: 'Accessories', rating: 4 },
  { id: 5, name: 'Headphones', price: 1500, category: 'Electronics', rating: 4 },
  { id: 6, name: 'Backpack', price: 1200, category: 'Fashion', rating: 3 }
];

  addToCart(product: any) {
    this.add.emit(product);
  }
}