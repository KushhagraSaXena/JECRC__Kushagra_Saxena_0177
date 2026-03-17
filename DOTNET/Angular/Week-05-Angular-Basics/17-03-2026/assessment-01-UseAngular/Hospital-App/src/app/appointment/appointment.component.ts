import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {

  @Output() appointmentChange = new EventEmitter<any>();

  appointment = {
    name: '',
    doctor: '',
    date: '',
    type: 'Online',
    symptoms: ''
  };

  fee = 300;

  today = new Date().toISOString().split('T')[0];

  updateFee() {
    this.fee = this.appointment.type === 'Online' ? 300 : 500;
    this.emitData();
  }

  emitData() {
    this.appointmentChange.emit({
      ...this.appointment,
      fee: this.fee
    });
  }
}