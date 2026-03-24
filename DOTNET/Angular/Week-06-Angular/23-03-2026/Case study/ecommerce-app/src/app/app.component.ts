import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductList } from "./product-list/product-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CartComponent, CheckoutComponent, ProductList],
  template:`
  <h1>🛒 E-Commerce App</h1>
  
  <div class="container">
    <app-product-list></app-product-list>
    <app-cart></app-cart>
    <app-checkout></app-checkout>
  </div>
`
})
export class AppComponent {
  title = 'ecommerce-app';
}
