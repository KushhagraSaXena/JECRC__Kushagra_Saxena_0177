import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports:[CommonModule],
  standalone: true,
  templateUrl:'./user.component.html',
  styleUrl:'./user.component.css'
})
export class Users{

  title = 'My-App';
  users = [
    "john",
    "David",
    "priya",
    "Anita"
  ];

  user = {name: 'john', age:30};
  getGreeting(){
    return 'Welcome to Angular ' + this.user.name;
  }
}
// export class UserComponent {}