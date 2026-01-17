export interface Stack {
  id: number;
  name: string;
  trigger: string;
  habits: Habit[];
}

export interface Habit {
  id: number;
  name: string;
  description: string;
  status: Status[];
}

export interface Status {
  completed: boolean;
  completedAt?: string;
}
