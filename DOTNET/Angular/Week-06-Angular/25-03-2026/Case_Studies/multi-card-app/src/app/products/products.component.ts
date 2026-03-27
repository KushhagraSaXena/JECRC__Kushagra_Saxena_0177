import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers:[CartService]
})
export class ProductsComponent {

  products = [
    {id: 1, name:"Asus Laptop",price : 999},
    {id: 2, name:"Smartphones",price : 499},
    {id: 3, name:"Headphones",price : 199},
  ];

  constructor(private cartService: CartService){}

  addToCart(product: any){
    this.cartService.addToCart(product.name);
  }

  getCartItems(){
    return this.cartService.getCartItems();
  }


}
