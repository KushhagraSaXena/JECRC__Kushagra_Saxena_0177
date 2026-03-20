import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderParentComponent } from './order-parent/order-parent.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrderParentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HookDemo';
}
