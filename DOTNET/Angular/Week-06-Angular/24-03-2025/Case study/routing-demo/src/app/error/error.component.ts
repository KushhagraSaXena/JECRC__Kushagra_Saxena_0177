import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  template: `
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <p>This is Error Page</p>
  `,
  styleUrl: './error.component.css'
})
export class ErrorComponent {

}
