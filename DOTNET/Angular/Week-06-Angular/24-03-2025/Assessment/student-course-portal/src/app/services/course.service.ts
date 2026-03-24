import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class CourseService {

constructor() { }

courses = [

{ id:1, name:"Angular", duration:"3 Months", trainer:"Kushagra" },

{ id:2, name:"React", duration:"2 Months", trainer:"Aman" },

{ id:3, name:"Dot Net", duration:"4 Months", trainer:"Indresh" }

];

getCourses(){

return this.courses;

}

getCourseById(id:number){

return this.courses.find(course=>course.id==id);

}

}