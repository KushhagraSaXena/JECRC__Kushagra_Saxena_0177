import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems :  any[] = []; 

  addTocart(product : Product){
    const item = this.cartItems.find(i => i.productID === product.productID)
    if(item){
      item.quantity++;
    }
    else{
      this.cartItems.push({ ...product, quantity: 1});
    }
    
    // Log to console
    console.log('Product added to cart:', product);
    console.log('Cart Items:', this.cartItems);
  }

  removeFromCart(index : number){
    this.cartItems.splice(index,1);
  }

  getCartItems(){
    return this.cartItems;
  }

  getTotal(){
    return this.cartItems.reduce((total,item) => 
    total + item.price * item.quantity,0);
  }
}
