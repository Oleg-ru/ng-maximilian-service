import {Injectable, signal} from '@angular/core';
import {Task, TaskStatus} from './task.model';

// @Injectable({
//   providedIn: 'root',
// })
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: {title: string, description: string}) {
    this.tasks.update((prev) =>
      [
        ...prev,
        {...taskData, id: crypto.randomUUID(), status: 'OPEN'}
      ])
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update(
      prev => prev.map(
        task => task.id === taskId ? {...task, status: newStatus} : task
      )
    )
  }
}
