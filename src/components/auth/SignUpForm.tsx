import { useState, useEffect } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "../../App";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const { signUp, signInWithGoogle, user, loading } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await signUp(email, password, fullName);

      if (data?.user && !data.user.email_confirmed_at) {
        toast({
          title: "Check your email",
          description:
            "We've sent you a confirmation link. Click it to complete your registration and sign in automatically.",
          duration: 8000,
        });
        // Clear form but stay on signup page
        setEmail("");
        setPassword("");
        setFullName("");
      } else if (data?.user?.email_confirmed_at) {
        // User is already confirmed, redirect to dashboard
        toast({
          title: "Welcome!",
          description: "Your account has been created successfully.",
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.message.includes("User already registered")) {
        setError(
          "An account with this email already exists. Please sign in instead.",
        );
      } else {
        setError(error.message || "Error creating account");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // OAuth flow will handle redirection automatically
    } catch (error: any) {
      console.error("Google sign in error:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div
        className={`${isDark ? "glass-card-dark" : "bg-white/90"} rounded-2xl shadow-xl border ${isDark ? "border-white/20" : "border-gray-100"} p-8 w-full max-w-md mx-auto backdrop-blur-sm`}
      >
        <div className="space-y-6">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full h-12 rounded-xl border-2 border-gray-200 hover:bg-gray-50 text-sm font-medium flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span
                className={`${isDark ? "bg-transparent text-gray-300" : "bg-white text-gray-500"} px-2`}
              >
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={`h-12 rounded-xl border-2 ${isDark ? "border-white/20 bg-white/10 text-white placeholder:text-gray-400" : "border-gray-200 bg-white text-gray-900"} focus:ring-blue-500 focus:border-blue-500 transition-all`}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`h-12 rounded-xl border-2 ${isDark ? "border-white/20 bg-white/10 text-white placeholder:text-gray-400" : "border-gray-200 bg-white text-gray-900"} focus:ring-blue-500 focus:border-blue-500 transition-all`}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`h-12 rounded-xl border-2 ${isDark ? "border-white/20 bg-white/10 text-white placeholder:text-gray-400" : "border-gray-200 bg-white text-gray-900"} focus:ring-blue-500 focus:border-blue-500 transition-all`}
            />
            <p
              className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}
            >
              Password must be at least 8 characters
            </p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium transition-all shadow-lg hover:shadow-xl"
          >
            Create account
          </Button>

          <div
            className={`text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"} mt-6`}
          >
            By creating an account, you agree to our{" "}
            <Link to="/" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </div>

          <div
            className={`text-sm text-center ${isDark ? "text-gray-300" : "text-gray-600"} mt-6`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
