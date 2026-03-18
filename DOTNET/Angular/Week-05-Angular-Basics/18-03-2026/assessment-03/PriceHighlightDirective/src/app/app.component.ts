import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceHighlightDirective } from './price-highlight.directive';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor,CommonModule, PriceHighlightDirective], 
  templateUrl: './app.component.html'
})
export class AppComponent {
  items = [
    { name: 'Laptop', price: 70000 },
    { name: 'Mobile', price: 20000 },
    { name: 'TV', price: 55000 }
  ];
}