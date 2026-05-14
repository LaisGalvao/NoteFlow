<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { api } from '../../lib/api';
import { useNotesStore } from '../notes/store';
import { useTasksStore } from '../tasks/store';
import type { TaskStatus } from '../../types/domain';

const videoRef = ref<HTMLVideoElement | null>(null);
const streamRef = ref<MediaStream | null>(null);
const selectedFile = ref<File | null>(null);
const extractedText = ref('');
const loading = ref(false);

const notesStore = useNotesStore();
const tasksStore = useTasksStore();

const onFileChange = (event: Event) => {
  selectedFile.value = (event.target as HTMLInputElement).files?.[0] ?? null;
};

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    streamRef.value = stream;
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
      await videoRef.value.play();
    }
  } catch {
    streamRef.value = null;
  }
};

const stopCamera = () => {
  streamRef.value?.getTracks().forEach((track) => track.stop());
  streamRef.value = null;
};

const capturePhoto = async () => {
  if (!videoRef.value) return;
  const canvas = document.createElement('canvas');
  canvas.width = videoRef.value.videoWidth;
  canvas.height = videoRef.value.videoHeight;
  const context = canvas.getContext('2d');
  if (!context) return;
  context.drawImage(videoRef.value, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
  if (!blob) return;

  selectedFile.value = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
};

const extractText = async () => {
  if (!selectedFile.value) return;
  loading.value = true;
  try {
    const response = await api.upload<{ text: string }>('/ocr/extract', selectedFile.value);
    extractedText.value = response.text;
  } finally {
    loading.value = false;
  }
};

const createNoteFromText = async () => {
  if (!extractedText.value.trim()) return;
  await notesStore.createNote({ content: extractedText.value, title: 'Anotação capturada' });
};

const createTaskFromText = async () => {
  if (!extractedText.value.trim()) return;
  await tasksStore.createTask({ title: extractedText.value.slice(0, 60), description: extractedText.value, status: 'TODO' as TaskStatus });
};

onMounted(() => {
  void startCamera();
});

onBeforeUnmount(() => {
  stopCamera();
});
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-xl font-semibold text-orange-300">Captura de texto</h1>

    <video ref="videoRef" autoplay muted playsinline class="w-full rounded-xl bg-black" />

    <div class="flex flex-wrap gap-2">
      <button class="rounded bg-emerald-500 px-3 py-2 font-medium text-black" @click="capturePhoto">Capturar foto</button>
      <input type="file" accept="image/*" @change="onFileChange" />
      <button class="rounded bg-orange-500 px-3 py-2 font-medium text-black" :disabled="!selectedFile || loading" @click="extractText">
        {{ loading ? 'Processando...' : 'Extrair texto' }}
      </button>
    </div>

    <textarea v-model="extractedText" class="h-32 w-full rounded-xl bg-zinc-900 p-3" placeholder="Texto extraído aparece aqui" />

    <div class="flex gap-2">
      <button class="rounded bg-violet-500 px-3 py-2 font-medium text-black" @click="createNoteFromText">Criar anotação</button>
      <button class="rounded bg-emerald-500 px-3 py-2 font-medium text-black" @click="createTaskFromText">Criar tarefa</button>
    </div>
  </section>
</template>
