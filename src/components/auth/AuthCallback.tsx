import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { LoadingScreen } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (loading) return;

    if (user) {
      toast({
        title: "Welcome!",
        description: "You have been successfully signed in.",
      });
      navigate("/dashboard", { replace: true });
    } else {
      toast({
        title: "Authentication failed",
        description: "Please try signing in again.",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate, toast]);

  return <LoadingScreen text="Completing authentication..." fullScreen />;
}
