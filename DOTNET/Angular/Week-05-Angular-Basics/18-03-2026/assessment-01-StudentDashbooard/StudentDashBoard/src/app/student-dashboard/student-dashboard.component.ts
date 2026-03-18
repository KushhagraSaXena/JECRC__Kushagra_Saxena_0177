import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {

  students = [
    { name: 'Aman', marks: 92 },
    { name: 'Riya', marks:76 },
    { name: 'Karan', marks: 45 },
    { name: 'Neha', marks:88 },
    { name: 'Rahul', marks: 33 }
  ];

  //Grading logic
  getGrade(marks: number): string {
    if (marks >= 90) return 'A';
    else if (marks >= 75) return 'B';
    else if (marks >= 50) return 'C';
    else return 'F';
  }

  //Toppers condition
  isTopper(marks: number): boolean {
    return marks >= 90;
  }
}