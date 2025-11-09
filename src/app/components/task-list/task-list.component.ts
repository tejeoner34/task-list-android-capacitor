import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="mt-4">
      <li
        *ngFor="let task of tasks; let i = index"
        class="flex justify-between items-center border-b py-2"
      >
        <span>{{ task }}</span>
        <button (click)="remove.emit(i)" class="text-red-500">削除</button>
      </li>
    </ul>
  `,
})
export class TaskListComponent {
  @Input() tasks: string[] = [];
  @Output() remove = new EventEmitter<number>();
}
