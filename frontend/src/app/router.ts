import { createRouter, createWebHistory } from 'vue-router';
import CaptureView from '../features/capture/CaptureView.vue';
import NotesView from '../features/notes/NotesView.vue';
import TasksView from '../features/tasks/TasksView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/capture' },
    { path: '/capture', component: CaptureView },
    { path: '/notes', component: NotesView },
    { path: '/tasks', component: TasksView },
  ],
});
