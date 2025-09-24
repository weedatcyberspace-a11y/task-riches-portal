import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/user';
import { storage } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    setUser(currentUser);
  }, []);

  const register = (username: string, email: string, password: string): boolean => {
    const existingUser = storage.findUserByEmail(email);
    if (existingUser) {
      toast({
        title: "Registration Failed",
        description: "An account with this email already exists.",
        variant: "destructive",
      });
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      balance: 0,
      completedTasks: 0,
      totalEarnings: 0,
      joinedDate: new Date().toISOString(),
    };

    storage.saveUser(newUser);
    storage.setCurrentUser(newUser);
    setUser(newUser);
    
    toast({
      title: "Welcome to TaskEarner!",
      description: "Your account has been created successfully.",
    });
    
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const existingUser = storage.findUserByEmail(email);
    if (!existingUser) {
      toast({
        title: "Login Failed",
        description: "No account found with this email.",
        variant: "destructive",
      });
      return false;
    }

    storage.setCurrentUser(existingUser);
    setUser(existingUser);
    
    toast({
      title: "Welcome back!",
      description: `Good to see you again, ${existingUser.username}!`,
    });
    
    return true;
  };

  const logout = () => {
    storage.clearCurrentUser();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    storage.saveUser(updatedUser);
    storage.setCurrentUser(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};