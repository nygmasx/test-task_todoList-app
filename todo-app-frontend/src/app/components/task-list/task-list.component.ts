import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Task } from '../../models/task';
import {TaskService} from "../../services/task.service";
import {firstValueFrom} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showAddTask = false;
  newTaskTitle = '';
  newTaskDeadline = '';


  constructor(private taskService: TaskService) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    const tasks = await firstValueFrom(this.taskService.getTasks());
    if(Array.isArray(tasks)){
      this.tasks = tasks.reverse();
    }
  }

  async addTask() {
    const taskCreated = await firstValueFrom(this.taskService.createTask(this.newTaskTitle, this.newTaskDeadline));
    if(taskCreated){
      this.tasks.unshift(taskCreated);
    }
    this.showAddTask = false;
    this.newTaskTitle = '';
    this.newTaskDeadline = '';
  }


  async toggleCompleted(task: Task) {

  }

  async deleteTask(id: string) {
    await firstValueFrom(this.taskService.deleteTask(id));
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
