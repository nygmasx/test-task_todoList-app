import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from "../../services/task.service";
import {firstValueFrom} from "rxjs";
import {FormsModule} from "@angular/forms";
import {formatDate, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  favoriteTasks: Task[] = [];
  filteredTasks: Task[] = [];
  showAddTask = false;
  searchTerm = '';
  newTaskTitle = '';
  newTaskDeadline = '';

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {
  }

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    try {
      const tasks = await firstValueFrom(this.taskService.getTasks());
      if (Array.isArray(tasks)) {
        this.tasks = this.sortTasks(tasks.reverse());
        this.filteredTasks = [...this.tasks];
        this.favoriteTasks = this.tasks.filter(task => task.favorite);
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
    }
  }

  filterTasks() {
    if (!this.searchTerm.trim()) {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.cdr.detectChanges();
  }

  getTaskClass(task: Task): string {
    if (task.completed) {
      return 'completed';
    }

    if (task.deadline) {
      const now = new Date().getTime();
      const deadline = new Date(task.deadline).getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (deadline < now) {
        return 'overdue';
      } else if (deadline - now < oneDay) {
        return 'due-today';
      }
    }

    return '';
  }

  sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return 0;
    });
  }

  async toggleFavorite(task: Task) {
    try {
      const updatedTask = await firstValueFrom(
        this.taskService.updateTask(task.id, {favorite: !task.favorite})
      );
      if (updatedTask) {
        task.favorite = !task.favorite;
        this.tasks = this.sortTasks([...this.tasks]);
        this.filteredTasks = this.sortTasks([...this.filteredTasks]);
        this.favoriteTasks = this.tasks.filter(task => task.favorite);
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du favori:', error);
    }
  }

  async addTask() {
    try {
      const taskCreated = await firstValueFrom(
        this.taskService.createTask(this.newTaskTitle, this.newTaskDeadline)
      );
      if (taskCreated) {
        this.tasks.unshift(taskCreated);
        this.tasks = this.sortTasks([...this.tasks]);

        this.filterTasks();

        this.favoriteTasks = this.tasks.filter(task => task.favorite);
        this.cdr.detectChanges();
      }
    } catch (error){
      console.error('Erreur lors de la création de la tâche:', error);
    }

    this.showAddTask = false;
    this.newTaskTitle = '';
    this.newTaskDeadline = '';
  }

  async toggleCompleted(task: Task) {
    try {
      const updatedTask = await firstValueFrom(
        this.taskService.updateTask(task.id, {completed: !task.completed})
      );
      if (updatedTask) {
        task.completed = !task.completed;
        this.cdr.detectChanges();
      }
    } catch (error){
      console.error('Erreur lors de la mise à jour du statut de completion:', error);
    }
  }

  async deleteTask(id: string) {
    try {
      await firstValueFrom(this.taskService.deleteTask(id));
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.filteredTasks = this.filteredTasks.filter(task => task.id !== id);
      this.favoriteTasks = this.favoriteTasks.filter(task => task.id !== id);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  }

  formatDeadline(deadline: string | number): string {
    try {
      const date = new Date(deadline);
      const now = new Date();

      const isToday = date.toDateString() === now.toDateString();

      const isPast = date < now;

      const formatted = date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      if (isPast) {
        return `${formatted} (DÉPASSÉ)`;
      } else if (isToday) {
        return `${formatted} (AUJOURD'HUI)`;
      }

      return formatted;
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error);
      return 'Erreur de format de date';
    }

  }
}
