import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Geolocation } from '@capacitor/geolocation';

export interface Task {
  title: string;
  latitude?: number;
  longitude?: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];

  async loadTasks() {
    const { value } = await Preferences.get({ key: 'tasks' });
    this.tasks = value ? JSON.parse(value) : [];
    return this.tasks;
  }

  getTasks() {
    return this.tasks;
  }

  async addTask(title: string) {
    let coords;
    try {
      const pos = await Geolocation.getCurrentPosition();
      coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
    } catch (err) {
      console.warn('位置情報が取得できませんでした', err);
    }

    const task: Task = { title, ...coords };
    this.tasks.push(task);
    await Preferences.set({ key: 'tasks', value: JSON.stringify(this.tasks) });
  }

  async removeTask(index: number) {
    this.tasks.splice(index, 1);
    await Preferences.set({ key: 'tasks', value: JSON.stringify(this.tasks) });
  }
}
