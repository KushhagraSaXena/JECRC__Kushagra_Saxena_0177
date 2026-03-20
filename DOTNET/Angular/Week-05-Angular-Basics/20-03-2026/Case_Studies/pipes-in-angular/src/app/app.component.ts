import { Component, signal } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, KeyValuePipe } from '@angular/common';
import { CustomCurrencyPipe } from './custom-currency.pipe';
import {of} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, CommonModule, DatePipe, KeyValuePipe, CustomCurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pipes-in-angular';
  today = signal(new Date());

  data$ = of([
    {
      id: 1,
      ProductName: 'Laptop',
      Price: 50000,
      status: 'Delivered',
    },
    {
      id: 2,
      ProductName: 'Mobile',
      Price: 20000,
      status: 'Pending',
    }
  ]);

  product = {
    id: 1,
    ProductName: 'Laptop',
    Price: 50000,
  };
}
