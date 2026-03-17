import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizza',
  imports: [FormsModule],
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class Pizza {
  pizzaName: string = '';
  quantity: number = 1;
  address: string = '';

}
