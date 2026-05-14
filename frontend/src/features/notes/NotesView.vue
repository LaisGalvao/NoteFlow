<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useNotesStore } from './store';

const notesStore = useNotesStore();
const draft = reactive({ title: '', content: '' });

const create = async () => {
  if (!draft.content.trim()) return;
  await notesStore.createNote({ title: draft.title, content: draft.content });
  draft.title = '';
  draft.content = '';
};

onMounted(() => {
  void notesStore.fetchNotes();
});
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-xl font-semibold text-violet-300">Anotações</h1>

    <div class="rounded-xl bg-zinc-900 p-4 shadow">
      <input v-model="draft.title" class="mb-2 w-full rounded bg-zinc-800 p-2" placeholder="Título" />
      <textarea v-model="draft.content" class="mb-2 h-24 w-full rounded bg-zinc-800 p-2" placeholder="Conteúdo" />
      <button class="rounded bg-orange-500 px-3 py-2 font-medium text-black" @click="create">Criar anotação</button>
    </div>

    <div v-if="notesStore.loading" class="text-sm text-zinc-400">Carregando...</div>

    <article v-for="note in notesStore.notes" :key="note.id" class="rounded-xl bg-zinc-900 p-4 shadow">
      <input
        :value="note.title"
        class="mb-2 w-full rounded bg-zinc-800 p-2"
        @change="(event) => notesStore.updateNote(note.id, { title: (event.target as HTMLInputElement).value })"
      />
      <textarea
        :value="note.content"
        class="mb-2 h-20 w-full rounded bg-zinc-800 p-2"
        @change="(event) => notesStore.updateNote(note.id, { content: (event.target as HTMLTextAreaElement).value })"
      />
      <button class="rounded bg-zinc-700 px-3 py-2 text-sm" @click="notesStore.deleteNote(note.id)">Excluir</button>
    </article>
  </section>
</template>
