import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet,CommonModule],
 template: `
 <h1> Angular Routing Demo</h1>
 
 <nav>
   <ul>
     <li><a routerLink="/home">Home</a></li>
     <li><a routerLink="/products">Products</a></li>
     <li><a routerLink="/contact">Contact</a></li>
   </ul>
 </nav>

 <hr>

 <router-outlet></router-outlet>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly title = signal('routing-demo');
}
