import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService, Task } from './services/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, TaskListComponent],
  template: `
    <div class="p-4 max-w-md mx-auto">
      <h1 class="text-2xl font-bold mb-4">📝 Tasky</h1>
      <app-add-task (add)="addTask($event)"></app-add-task>
      <app-task-list
        [tasks]="tasks()"
        (remove)="removeTask($event)"
      ></app-task-list>
    </div>
  `,
})
export class AppComponent implements OnInit {
  tasks = signal<Task[]>([]);

  constructor(private taskService: TaskService) {}

  async ngOnInit() {
    const loaded = await this.taskService.loadTasks();
    this.tasks.set(loaded);
  }

  async addTask(task: string) {
    await this.taskService.addTask(task);
    this.tasks.set([...this.taskService.getTasks()]);
  }

  async removeTask(index: number) {
    await this.taskService.removeTask(index);
    this.tasks.set([...this.taskService.getTasks()]);
  }
}
