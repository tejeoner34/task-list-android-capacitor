import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="mt-4">
      <li
        *ngFor="let task of tasks; let i = index"
        class="flex flex-col border-b py-2"
      >
        <div class="flex justify-between items-center">
          <span>{{ task.title }}</span>
          <button (click)="remove.emit(i)" class="text-red-500">削除</button>
        </div>
        <small *ngIf="task.latitude">
          📍 {{ task.latitude | number : '1.4-4' }},
          {{ task.longitude | number : '1.4-4' }}
        </small>
      </li>
    </ul>
  `,
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() remove = new EventEmitter<number>();
}
