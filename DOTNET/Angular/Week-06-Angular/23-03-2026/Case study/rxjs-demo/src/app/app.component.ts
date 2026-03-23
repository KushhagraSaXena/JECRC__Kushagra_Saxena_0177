import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RxjsDemoComponent } from './rxjs-demo-component/rxjs-demo-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RxjsDemoComponent],
  styleUrls: ['./app.component.css'],
  template: `<app-rxjs-demo-component></app-rxjs-demo-component>`
})
export class AppComponent {
  title = 'rxjs-demo';
}
