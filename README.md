# NoteFlow

Aplicação PWA mobile-first para converter fotos de papel/post-it em anotações e tarefas.

## Stack

- **Frontend:** Vue 3, Vite, TypeScript, Pinia, Vue Router, Tailwind CSS, vite-plugin-pwa, fetch nativo
- **Backend:** NestJS, TypeScript, Prisma ORM, MySQL, Multer, OCR com provider isolado

## Estrutura

- `/frontend`: app PWA com captura por Camera API + fallback de upload
- `/backend`: API NestJS com CRUD de notas/tarefas, OCR e adapters de integração futura (Teams, Planner, Jira, ClickUp)

## Backend

1. Configure o banco MySQL e copie o exemplo:
   ```bash
   cp .env.example .env
   ```
2. Ajuste `DATABASE_URL`.
3. Gere o Prisma Client:
   ```bash
   npm run prisma:generate
   ```
4. Rode a API:
   ```bash
   npm run start:dev
   ```

## Frontend

1. Configure URL da API opcionalmente em `.env`:
   ```bash
   VITE_API_URL=http://localhost:3000
   ```
2. Rode o app:
   ```bash
   npm run dev
   ```

## Scripts úteis

### frontend
- `npm run dev`
- `npm run build`

### backend
- `npm run start:dev`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run prisma:generate`
