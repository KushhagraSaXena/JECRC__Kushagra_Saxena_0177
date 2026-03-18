import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from './status-color.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  students = [
    { name: 'Aman', marks: 85 },
    { name: 'Riya', marks: 42 },
    { name: 'Karan', marks: 67 },
    { name: 'Neha', marks: 30 }
  ];
}