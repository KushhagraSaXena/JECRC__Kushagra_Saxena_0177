import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {DashboardComponent} from './dashboard/dashboard.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    DashboardComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {

  cartItems: any[] = [];

  addToCart(product: any) {
    const item = this.cartItems.find(p => p.id === product.id);

    if (item) item.qty++;
    else this.cartItems.push({ ...product, qty: 1 });
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }
}