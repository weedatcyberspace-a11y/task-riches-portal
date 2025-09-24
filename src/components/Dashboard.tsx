import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { generateTasks, taskCategories } from '@/data/tasks';
import { storage } from '@/lib/storage';
import TaskCard from './TaskCard';
import { 
  DollarSign, 
  Trophy, 
  Target, 
  Zap, 
  User, 
  LogOut, 
  Shuffle,
  MessageCircle
} from 'lucide-react';
import { Task } from '@/types/user';

interface DashboardProps {
  onShowProfile: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onShowProfile }) => {
  const { user, logout } = useAuth();
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      // Load user's completed tasks
      const userAnswers = storage.getUserAnswers(user.id);
      setCompletedTaskIds(new Set(userAnswers.map(answer => answer.taskId)));
      
      // Initialize available tasks
      const tasks = generateTasks();
      setAvailableTasks(tasks);
      
      // Get first available task
      getNextTask(tasks, new Set(userAnswers.map(answer => answer.taskId)));
    }
  }, [user]);

  const getNextTask = (tasks: Task[], completed: Set<string>) => {
    const availableTasksList = tasks.filter(task => !completed.has(task.id));
    
    if (availableTasksList.length === 0) {
      // If all tasks completed, generate new ones or cycle through
      const newTasks = generateTasks();
      setAvailableTasks(newTasks);
      setCurrentTask(newTasks[Math.floor(Math.random() * newTasks.length)]);
      return;
    }
    
    // Get random task from available ones
    const randomIndex = Math.floor(Math.random() * availableTasksList.length);
    setCurrentTask(availableTasksList[randomIndex]);
  };

  const handleTaskComplete = () => {
    if (user && currentTask) {
      const newCompleted = new Set([...completedTaskIds, currentTask.id]);
      setCompletedTaskIds(newCompleted);
      
      // Get next task
      setTimeout(() => {
        getNextTask(availableTasks, newCompleted);
      }, 1000);
    }
  };

  const handleRefreshTasks = () => {
    const newTasks = generateTasks();
    setAvailableTasks(newTasks);
    getNextTask(newTasks, completedTaskIds);
  };

  const handleWithdraw = () => {
    if (user && user.balance > 0) {
      const message = `Hello! I would like to withdraw $${user.balance.toFixed(2)} from my TaskEarner account. Username: ${user.username}, Email: ${user.email}`;
      const whatsappUrl = `https://wa.me/254114470612?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-earning to-reward bg-clip-text text-transparent">
                TaskEarner
              </h1>
              <Badge variant="outline" className="hidden sm:inline-flex">
                Dashboard
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Welcome back,</span>
                <span className="font-medium">{user.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={onShowProfile}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-earning/5 border-earning/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-earning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-earning">
                ${user.balance.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Available for withdrawal
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-reward/5 border-reward/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <Trophy className="h-4 w-4 text-reward" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-reward-foreground">
                ${user.totalEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime earnings
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-premium/5 border-premium/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <Target className="h-4 w-4 text-premium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.completedTasks}
              </div>
              <p className="text-xs text-muted-foreground">
                Questions answered
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.completedTasks > 0 
                  ? Math.round((user.totalEarnings / (user.completedTasks * 1.25)) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Correct answers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={handleRefreshTasks}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Refresh Tasks
          </Button>
          
          <Button 
            onClick={handleWithdraw}
            disabled={user.balance <= 0}
            className="bg-reward hover:bg-reward/90 text-reward-foreground flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Withdraw ${user.balance.toFixed(2)}
          </Button>
        </div>

        {/* Current Task */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Current Task</h2>
            <p className="text-muted-foreground">
              Complete tasks to earn money. Each correct answer adds to your balance!
            </p>
          </div>
          
          {currentTask ? (
            <TaskCard task={currentTask} onComplete={handleTaskComplete} />
          ) : (
            <Card className="text-center p-8">
              <CardContent>
                <div className="space-y-4">
                  <Zap className="w-12 h-12 mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-semibold">Loading your next task...</h3>
                  <p className="text-muted-foreground">
                    We're preparing an exciting question for you!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Categories Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Available Categories</CardTitle>
            <CardDescription>
              Earn money by answering questions from these categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {taskCategories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;