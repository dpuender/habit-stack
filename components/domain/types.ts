export interface StackType {
  id: number;
  name: string;
  trigger?: string | null;
  habits: HabitType[];
  status: StatusType[];
}

export interface HabitType {
  id: number;
  name: string | null;
  description: string | null;
  status: StatusType[];
}

export interface StatusType {
  completed: boolean;
  completedAt?: string;
}
