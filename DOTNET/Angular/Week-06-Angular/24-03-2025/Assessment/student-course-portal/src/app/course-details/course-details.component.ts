import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})

export class CourseDetailsComponent {

  course:any;

  constructor(
    private route:ActivatedRoute,
    private courseService:CourseService
  ){}

  ngOnInit(){
    let id=+this.route.snapshot.params['id'];
    this.course=this.courseService.getCourseById(id);
  }

}