import { defineStore } from 'pinia';
import { api } from '../../lib/api';
import type { Note } from '../../types/domain';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
    loading: false,
  }),
  actions: {
    async fetchNotes() {
      this.loading = true;
      try {
        this.notes = await api.get<Note[]>('/notes');
      } finally {
        this.loading = false;
      }
    },
    async createNote(payload: { title?: string; content: string }) {
      await api.post<Note>('/notes', payload);
      await this.fetchNotes();
    },
    async updateNote(id: number, payload: { title?: string; content?: string }) {
      await api.put<Note>(`/notes/${id}`, payload);
      await this.fetchNotes();
    },
    async deleteNote(id: number) {
      await api.delete<Note>(`/notes/${id}`);
      await this.fetchNotes();
    },
  },
});
