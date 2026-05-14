<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useTasksStore } from './store';
import type { TaskStatus } from '../../types/domain';

const tasksStore = useTasksStore();
const draft = reactive({ title: '', description: '', status: 'BACKLOG' as TaskStatus });

const statusOptions: Array<{ value: TaskStatus; label: string }> = [
  { value: 'BACKLOG', label: 'Backlog' },
  { value: 'TODO', label: 'A fazer' },
  { value: 'IN_PROGRESS', label: 'Em andamento' },
  { value: 'VALIDATION', label: 'Validação' },
  { value: 'DONE', label: 'Finalizado' },
];

const create = async () => {
  if (!draft.title.trim()) return;
  await tasksStore.createTask(draft);
  draft.title = '';
  draft.description = '';
  draft.status = 'BACKLOG';
};

onMounted(() => {
  void tasksStore.fetchTasks();
});
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-xl font-semibold text-emerald-300">Tarefas</h1>

    <div class="rounded-xl bg-zinc-900 p-4 shadow">
      <input v-model="draft.title" class="mb-2 w-full rounded bg-zinc-800 p-2" placeholder="Título da tarefa" />
      <textarea v-model="draft.description" class="mb-2 h-20 w-full rounded bg-zinc-800 p-2" placeholder="Descrição" />
      <select v-model="draft.status" class="mb-2 w-full rounded bg-zinc-800 p-2">
        <option v-for="option in statusOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <button class="rounded bg-orange-500 px-3 py-2 font-medium text-black" @click="create">Criar tarefa</button>
    </div>

    <div v-if="tasksStore.loading" class="text-sm text-zinc-400">Carregando...</div>

    <article v-for="task in tasksStore.tasks" :key="task.id" class="rounded-xl bg-zinc-900 p-4 shadow">
      <input
        :value="task.title"
        class="mb-2 w-full rounded bg-zinc-800 p-2"
        @change="(event) => tasksStore.updateTask(task.id, { title: (event.target as HTMLInputElement).value })"
      />
      <textarea
        :value="task.description ?? ''"
        class="mb-2 h-20 w-full rounded bg-zinc-800 p-2"
        @change="(event) => tasksStore.updateTask(task.id, { description: (event.target as HTMLTextAreaElement).value })"
      />
      <select
        :value="task.status"
        class="mb-2 w-full rounded bg-zinc-800 p-2"
        @change="(event) => tasksStore.updateTask(task.id, { status: (event.target as HTMLSelectElement).value as TaskStatus })"
      >
        <option v-for="option in statusOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <button class="rounded bg-zinc-700 px-3 py-2 text-sm" @click="tasksStore.deleteTask(task.id)">Excluir</button>
    </article>
  </section>
</template>
