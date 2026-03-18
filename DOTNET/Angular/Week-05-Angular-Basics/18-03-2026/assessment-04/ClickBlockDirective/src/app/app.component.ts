import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickBlockDirective } from './click-block.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClickBlockDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAllowed = true;

  togglePermission() {
    this.isAllowed = !this.isAllowed;
  }

  handleClick() {
    alert('✅Button Clicked!');
  }
}