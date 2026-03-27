import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  allTasks: any;

  constructor(private taskService: TaskService){}

  ngOnInit(){
    this.loadTasks();
  }

  loading = true;
  loadTasks(){
    this.taskService.getTasks().subscribe(data=>{
      this.tasks = data.slice(0,25);
      this.loading = false;
      console.log(this.tasks);
    });
  }
  loadMore(){
this.tasks = this.allTasks.slice(0,20);
}
  

  onTaskAdded(task: Task){
    this.tasks.unshift(task);
  }

  deleteTask(id?: number){

    if(!id) return;

    this.taskService.deleteTask(id).subscribe(()=>{
      this.tasks = this.tasks.filter(t => t.id !== id);
    });

  }

  toggleTask(task: Task){

    if(!task.id) return;

    this.taskService.updateTaskStatus(
      task.id,
      !task.completed
    ).subscribe(res =>{
      task.completed = res.completed;
    });

  }

}