import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Task, UserAnswer } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';
import { storage } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, DollarSign, Clock, Award } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onComplete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const { user, updateUser } = useAuth();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!user) return null;

  const handleSubmit = () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "You must choose an option before submitting.",
        variant: "destructive",
      });
      return;
    }

    const answerIndex = parseInt(selectedAnswer);
    const correct = answerIndex === task.correctAnswer;
    setIsCorrect(correct);
    setSubmitted(true);

    const userAnswer: UserAnswer = {
      taskId: task.id,
      selectedAnswer: answerIndex,
      isCorrect: correct,
      earnedAmount: correct ? task.reward : 0,
      completedAt: new Date().toISOString(),
    };

    storage.saveUserAnswer(user.id, userAnswer);

    if (correct) {
      updateUser({
        balance: user.balance + task.reward,
        completedTasks: user.completedTasks + 1,
        totalEarnings: user.totalEarnings + task.reward,
      });

      toast({
        title: "Correct! 🎉",
        description: `You earned $${task.reward.toFixed(2)}!`,
      });
    } else {
      updateUser({
        completedTasks: user.completedTasks + 1,
      });

      toast({
        title: "Incorrect ❌",
        description: `The correct answer was: ${task.options[task.correctAnswer]}`,
        variant: "destructive",
      });
    }

    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-earning/20 text-earning';
      case 'medium': return 'bg-reward/20 text-reward-foreground';
      case 'hard': return 'bg-premium/20 text-premium';
      default: return 'bg-secondary';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="px-3 py-1">
            {task.category}
          </Badge>
          <div className="flex items-center gap-2">
            <Badge className={getDifficultyColor(task.difficulty)}>
              <Award className="w-3 h-3 mr-1" />
              {task.difficulty}
            </Badge>
            <Badge className="bg-earning/20 text-earning">
              <DollarSign className="w-3 h-3 mr-1" />
              ${task.reward.toFixed(2)}
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-xl leading-relaxed">
          {task.question}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Choose the correct answer to earn your reward
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!submitted ? (
          <>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {task.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-base leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button 
              onClick={handleSubmit}
              className="w-full bg-earning hover:bg-earning/90 text-earning-foreground"
              size="lg"
            >
              Submit Answer
            </Button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              isCorrect ? 'bg-earning/20 text-earning' : 'bg-destructive/20 text-destructive'
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Correct! +${task.reward.toFixed(2)}</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" />
                  <span className="font-semibold">Incorrect</span>
                </>
              )}
            </div>
            
            {!isCorrect && (
              <p className="text-sm text-muted-foreground">
                Correct answer: <span className="font-medium">{task.options[task.correctAnswer]}</span>
              </p>
            )}
            
            <p className="text-sm text-muted-foreground">
              Loading next task...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;