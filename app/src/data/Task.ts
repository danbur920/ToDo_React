export interface Task {
    id: string;
    name: string;
    description: string;
    category: string;
    completed: boolean;
    isDisposable: boolean;
  }