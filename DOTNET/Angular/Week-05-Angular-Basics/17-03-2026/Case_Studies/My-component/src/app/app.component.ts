import { Component } from '@angular/core';
import { Users } from './user/user.component';
import { Home } from './home/home.component';
import { PropertyComponent } from './property/property.component';
import { Product } from './product/product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Users, Home, PropertyComponent,Product],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}