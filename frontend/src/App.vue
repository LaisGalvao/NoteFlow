<template>
  <main class="mx-auto min-h-screen w-full max-w-screen-sm bg-zinc-950 p-4 text-zinc-100">
    <header class="mb-4 rounded-xl bg-zinc-900 p-4">
      <h1 class="text-2xl font-bold text-orange-400">NoteFlow</h1>
      <p class="text-sm text-zinc-400">PWA mobile-first para notas e tarefas via captura de imagem</p>
    </header>

    <router-view />

    <nav class="sticky bottom-2 mt-6 grid grid-cols-3 gap-2 rounded-xl bg-zinc-900 p-2 text-center text-sm">
      <router-link class="rounded p-2 hover:bg-zinc-800" to="/capture">Captura</router-link>
      <router-link class="rounded p-2 hover:bg-zinc-800" to="/notes">Anotações</router-link>
      <router-link class="rounded p-2 hover:bg-zinc-800" to="/tasks">Tarefas</router-link>
    </nav>
  </main>
</template>
