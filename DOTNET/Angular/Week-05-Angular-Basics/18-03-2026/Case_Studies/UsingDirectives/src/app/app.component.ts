import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'UsingDirectives';

  showProducts = true;

  products = [
    {
      name: 'Laptop',
      price: 60000,
      quantity: 1,
      imageUrl: 'laptop.jpg',
      status: 'available'
    },
    {
      name: 'Smartphone',
      price: 15000,
      quantity: 1,
      imageUrl: 'smartphone.jpg',
      status: 'out'
    },
    {
      name: 'Tablet',
      price: 25000,
      quantity: 1,
      imageUrl: 'tablet.jpg',
      status: 'limited' 
    }
  ];
  getStatusColor(status: string): string {
    switch (status) {
      case 'available':
        return 'green';
      case 'limited':
        return 'orange';
      case 'out':
        return 'red';
      default:
        return 'black';
    }
  }
}