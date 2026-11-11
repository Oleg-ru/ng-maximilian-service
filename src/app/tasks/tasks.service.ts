import {inject, Injectable, signal} from '@angular/core';
import {Task, TaskStatus} from './task.model';
import {LoggingService} from '../../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: {title: string, description: string}) {
    this.tasks.update((prev) =>
      [
        ...prev,
        {...taskData, id: crypto.randomUUID(), status: 'OPEN'}
      ]);
    this.loggingService.log('ADDED TASK. Title: ' + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update(
      prev => prev.map(
        task => task.id === taskId ? {...task, status: newStatus} : task
      )
    );
    this.loggingService.log('CHANGE TASK STATUS. TO: ' + newStatus);
  }
}
