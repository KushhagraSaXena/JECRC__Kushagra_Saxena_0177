import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  form = {
    name : '',
    email: '',
    address:'',
    payment:''
  };

  submit(){
    alert('Order Placed Successfully!');
    console.log(this.form);
  }
}
