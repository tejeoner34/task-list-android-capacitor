import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: string[] = [];

  async loadTasks() {
    const { value } = await Preferences.get({ key: 'tasks' });
    this.tasks = value ? JSON.parse(value) : [];
    return this.tasks;
  }

  getTasks() {
    return this.tasks;
  }

  async addTask(task: string) {
    this.tasks.push(task);
    await Preferences.set({ key: 'tasks', value: JSON.stringify(this.tasks) });
  }

  async removeTask(index: number) {
    this.tasks.splice(index, 1);
    await Preferences.set({ key: 'tasks', value: JSON.stringify(this.tasks) });
  }
}
