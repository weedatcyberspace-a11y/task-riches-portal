import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { storage } from '@/lib/storage';
import { 
  User, 
  Mail, 
  Calendar, 
  DollarSign, 
  Trophy, 
  Target, 
  TrendingUp,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { UserAnswer } from '@/types/user';

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const { user } = useAuth();

  if (!user) return null;

  const userAnswers = storage.getUserAnswers(user.id);
  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const successRate = userAnswers.length > 0 ? Math.round((correctAnswers / userAnswers.length) * 100) : 0;

  const getRecentActivity = (): UserAnswer[] => {
    return userAnswers
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, 10);
  };

  const handleWithdraw = () => {
    if (user && user.balance > 0) {
      const message = `Hello! I would like to withdraw $${user.balance.toFixed(2)} from my TaskEarner account. Username: ${user.username}, Email: ${user.email}`;
      const whatsappUrl = `https://wa.me/254114470612?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-earning to-reward bg-clip-text text-transparent">
            Profile
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium">{user.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">
                      {new Date(user.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earnings Summary */}
          <Card className="bg-earning/5 border-earning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-earning">
                <DollarSign className="w-5 h-5" />
                Earnings Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-earning mb-1">
                  ${user.balance.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-xl font-semibold">${user.totalEarnings.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Total Earned</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold">{user.completedTasks}</div>
                  <p className="text-xs text-muted-foreground">Tasks Done</p>
                </div>
              </div>
              
              <Button 
                onClick={handleWithdraw}
                disabled={user.balance <= 0}
                className="w-full bg-reward hover:bg-reward/90 text-reward-foreground"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Withdraw Balance
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Trophy className="h-4 w-4 text-reward" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successRate}%</div>
              <p className="text-xs text-muted-foreground">
                Correct answers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Correct Answers</CardTitle>
              <Target className="h-4 w-4 text-earning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-earning">{correctAnswers}</div>
              <p className="text-xs text-muted-foreground">
                Out of {userAnswers.length} total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-premium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${user.completedTasks > 0 ? (user.totalEarnings / user.completedTasks).toFixed(2) : '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                Per task
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest task completions and earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {getRecentActivity().length === 0 ? (
              <div className="text-center py-8">
                <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No activity yet</p>
                <p className="text-sm text-muted-foreground">Complete some tasks to see your history here!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {getRecentActivity().map((answer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        answer.isCorrect ? 'bg-earning' : 'bg-destructive'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">
                          {answer.isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(answer.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={answer.isCorrect ? "default" : "secondary"}>
                      {answer.isCorrect ? `+$${answer.earnedAmount.toFixed(2)}` : '$0.00'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;