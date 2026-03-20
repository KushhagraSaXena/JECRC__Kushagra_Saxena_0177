import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderChildComponent } from '../order-child/order-child.component';

@Component({
  selector: 'app-order-parent',
  standalone: true,
  imports: [CommonModule, OrderChildComponent],
  templateUrl: './order-parent.component.html',
  styleUrls: ['./order-parent.component.css']
})
export class OrderParentComponent {

  order = {
    id: 101,
    ProductName: 'Laptop',
    status: 'Pending',
    Price: 50000,
  };

  updateOrder() {
  this.order = {
    ...this.order,
    status: this.order.status === 'Pending' ? 'Delivered' : 'Pending'
  };
  }
  destroyChild = true;

  toggleChild() {
    this.destroyChild = !this.destroyChild;
  }
}
