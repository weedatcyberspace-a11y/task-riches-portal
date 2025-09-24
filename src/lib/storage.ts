import { User, Task, UserAnswer } from '@/types/user';

const STORAGE_KEYS = {
  CURRENT_USER: 'taskearner_current_user',
  USER_ANSWERS: 'taskearner_user_answers',
  USERS: 'taskearner_users',
} as const;

export const storage = {
  getCurrentUser: (): User | null => {
    const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userData ? JSON.parse(userData) : null;
  },

  setCurrentUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  clearCurrentUser: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (user: User) => {
    const users = storage.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getUserAnswers: (userId: string): UserAnswer[] => {
    const answers = localStorage.getItem(`${STORAGE_KEYS.USER_ANSWERS}_${userId}`);
    return answers ? JSON.parse(answers) : [];
  },

  saveUserAnswer: (userId: string, answer: UserAnswer) => {
    const answers = storage.getUserAnswers(userId);
    answers.push(answer);
    localStorage.setItem(`${STORAGE_KEYS.USER_ANSWERS}_${userId}`, JSON.stringify(answers));
  },

  findUserByEmail: (email: string): User | null => {
    const users = storage.getUsers();
    return users.find(user => user.email === email) || null;
  },
};