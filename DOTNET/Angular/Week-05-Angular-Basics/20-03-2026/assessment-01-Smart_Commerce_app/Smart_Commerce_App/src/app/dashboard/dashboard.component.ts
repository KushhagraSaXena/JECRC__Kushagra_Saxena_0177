import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @Input() cartItems: any[] = [];

  getTotalItems() {
    return this.cartItems.length;
  }

  getTotalQuantity() {
    return this.cartItems.reduce((sum, item) => sum + item.qty, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) =>
      sum + item.price * item.qty, 0);
  }
}