import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template:`
      <h1>Welcome to Home Page !</h1>
      <p>This is Home Component</p>`
    })
export class HomeComponent {

}
