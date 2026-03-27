import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CartService]
})
export class CartComponent {
  constructor(private cartService: CartService){}

  getCartItems(){
    return this.cartService.getCartItems();
  }

  addToCart(product: any){
    this.cartService.addToCart(product.name);
  }
}
