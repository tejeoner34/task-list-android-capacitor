import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="flex gap-2">
      <input
        [(ngModel)]="newTask"
        name="task"
        placeholder="タスクを入力..."
        class="border p-2 rounded grow"
      />
      <button type="submit" class="bg-blue-500 text-white rounded px-4">
        追加
      </button>
    </form>
  `,
})
export class AddTaskComponent {
  newTask = '';
  @Output() add = new EventEmitter<string>();

  onSubmit() {
    if (!this.newTask.trim()) return;
    this.add.emit(this.newTask);
    this.newTask = '';
  }
}
