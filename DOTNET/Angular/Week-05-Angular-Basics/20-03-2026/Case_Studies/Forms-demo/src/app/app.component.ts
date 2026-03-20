import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import {EmployeeFormComponent} from './employee-form/employee-form.component'
@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet,CommonModule,FormsDemoComponent,EmployeeFormComponent,FeedbackFormComponent],
  imports: [CommonModule,FeedbackFormComponent,EmployeeFormComponent],
  styleUrls: ['./app.component.css'],
  template:`
  <h1>
    Angular 21 SPA Demo
  </h1>
  <div>
    <h1 style="text-align:center;">Angular 21 Template-driven Demo</h1>
<div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
        <h2>Employee Form</h2>
        <app-employee-form></app-employee-form>
      </div>
      <div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
        <h2>Employee Feedback</h2>
        <app-feedback-form></app-feedback-form>
      </div>
      
    </div>
`
})
export class AppComponent {
  title = 'Forms-demo';
}
