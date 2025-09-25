import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActivationSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-earning/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-earning" />
          </div>
          <CardTitle className="text-2xl text-earning">Payment Successful!</CardTitle>
          <CardDescription>
            Your account has been activated successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Thank you for your payment. Your account is now activated and you can start earning from tasks.
          </p>
          
          <div className="bg-earning/10 p-4 rounded-lg">
            <p className="text-sm text-earning font-medium">
              🎉 Welcome to TaskEarner!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Start completing tasks to earn money
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-earning hover:bg-earning/90 text-earning-foreground"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Dashboard
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Redirecting automatically in 5 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivationSuccess;