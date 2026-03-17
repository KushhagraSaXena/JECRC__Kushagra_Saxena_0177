import { Component } from '@angular/core';
import { AppointmentComponent } from './appointment/appointment.component';
import { SummaryComponent } from './summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppointmentComponent, SummaryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appointmentData: any = {};
} 