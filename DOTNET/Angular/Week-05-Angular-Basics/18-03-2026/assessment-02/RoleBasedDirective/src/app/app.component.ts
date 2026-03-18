import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './role.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RoleDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentRole: string = 'admin';
  title: any;

  toggleRole() {
    this.currentRole = this.currentRole === 'admin' ? 'user' : 'admin';
  }
}