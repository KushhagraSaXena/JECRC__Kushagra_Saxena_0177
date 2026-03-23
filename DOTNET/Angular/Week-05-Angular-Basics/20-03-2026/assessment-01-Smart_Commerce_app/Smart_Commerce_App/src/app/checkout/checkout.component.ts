import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,             
  imports: [CommonModule, FormsModule], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  paymentMethod = '';
  addresses: string[] = [''];

  orderPlaced = false;   // ✅ NEW

  addAddress() {
    this.addresses.push('');
  }

  // ✅ ADD THIS FUNCTION
  placeOrder() {
    console.log("Order placed");  // debug

    this.orderPlaced = true;

    alert("Order placed successfully!"); // popup
  }
}