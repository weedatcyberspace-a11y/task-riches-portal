export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  completedTasks: number;
  totalEarnings: number;
  joinedDate: string;
}

export interface Task {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
  taskId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  earnedAmount: number;
  completedAt: string;
}