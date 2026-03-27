import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  title = '';

  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private taskService: TaskService){}

  addTask(){

    if(!this.title.trim()) return;

    const newTask: Task = {
      title: this.title,
      completed: false
    };

    this.taskService.addTask(newTask).subscribe(res=>{
      this.taskAdded.emit(res);
      this.title = '';
    });

  }

}