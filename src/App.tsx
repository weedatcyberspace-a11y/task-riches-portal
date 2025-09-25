import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";
import Profile from "@/components/Profile";
import ActivationSuccess from "@/pages/ActivationSuccess";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showActivationSuccess, setShowActivationSuccess] = useState(false);

  // Check for activation success in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (window.location.pathname === '/activation-success' || urlParams.get('success') === 'true') {
      setShowActivationSuccess(true);
    }
  }, []);

  if (showActivationSuccess) {
    return <ActivationSuccess />;
  }

  if (!user) {
    return <Auth />;
  }

  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} />;
  }

  return <Dashboard onShowProfile={() => setShowProfile(true)} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/activation-success" element={<AppContent />} />
            <Route path="*" element={<AppContent />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
