export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'VALIDATION' | 'DONE';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}
