import {Injectable, signal} from '@angular/core';
import {Task} from './task.model';

@Injectable({
  providedIn: 'root',
})
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
}
