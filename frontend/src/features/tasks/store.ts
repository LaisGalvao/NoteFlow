import { defineStore } from 'pinia';
import { api } from '../../lib/api';
import type { Task, TaskStatus } from '../../types/domain';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true;
      try {
        this.tasks = await api.get<Task[]>('/tasks');
      } finally {
        this.loading = false;
      }
    },
    async createTask(payload: { title: string; description?: string; status?: TaskStatus }) {
      await api.post<Task>('/tasks', payload);
      await this.fetchTasks();
    },
    async updateTask(id: number, payload: { title?: string; description?: string; status?: TaskStatus }) {
      await api.put<Task>(`/tasks/${id}`, payload);
      await this.fetchTasks();
    },
    async deleteTask(id: number) {
      await api.delete<Task>(`/tasks/${id}`);
      await this.fetchTasks();
    },
  },
});
