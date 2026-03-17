import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pizza } from './pizza/pizza.component';

@Component({
  selector: 'app-root',
  imports: [Pizza],
  template: `<app-pizza></app-pizza>`,
  styleUrls: ['./app.component.css']
})
export class App {
  public readonly title = 'pizza-app';
}
