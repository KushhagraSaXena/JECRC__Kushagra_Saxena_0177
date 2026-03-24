import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent {

  courses:any;

  constructor(private courseService:CourseService){}

  ngOnInit(){
    this.courses=this.courseService.getCourses();
  }

  getImage(name:string){
    const key = name.toLowerCase();
    if(key.includes('angular')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg';
    if(key.includes('react')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg';
    if(key.includes('dot')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg';
    return 'https://via.placeholder.com/80?text=Course';
  }
}