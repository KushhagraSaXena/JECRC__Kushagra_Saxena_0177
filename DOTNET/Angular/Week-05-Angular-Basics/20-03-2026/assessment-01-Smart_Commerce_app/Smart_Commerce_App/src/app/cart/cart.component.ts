import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  @Input() cartItems: any[] = [];
  @Output() remove = new EventEmitter<number>();

  getTotal() {
    return this.cartItems.reduce((sum, item) =>
      sum + item.price * item.qty, 0);
  }
}