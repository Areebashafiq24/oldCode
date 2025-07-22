import {
  Suspense,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import AuthCallback from "./components/auth/AuthCallback";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import Resources from "./components/pages/resources";
import Docs from "./components/pages/docs";
import CompanyEnrichment from "./components/pages/company-enrichment";
import PersonEnrichment from "./components/pages/person-enrichment";
import EnrichPersonInfo from "./components/pages/enrich-person-info";
import AITools from "./components/pages/ai-tools";
import ICPFitCheck from "./components/pages/icp-fit-check";
import PainPointExtraction from "./components/pages/pain-point-extraction";
import CompanyNameCleanup from "./components/pages/company-name-cleanup";
import RecentActivity from "./components/pages/recent-activity";
import Settings from "./components/pages/settings";
import Error404 from "./components/pages/error-404";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Loading..." />;
  }

  // If user is already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/docs" element={<Docs />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpForm />
              </PublicRoute>
            }
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/company-enrichment"
            element={
              <PrivateRoute>
                <CompanyEnrichment />
              </PrivateRoute>
            }
          />
          <Route
            path="/person-enrichment"
            element={
              <PrivateRoute>
                <PersonEnrichment />
              </PrivateRoute>
            }
          />
          <Route
            path="/enrich-person-info"
            element={
              <PrivateRoute>
                <EnrichPersonInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="/ai-tools"
            element={
              <PrivateRoute>
                <AITools />
              </PrivateRoute>
            }
          />
          <Route
            path="/icp-fit-check"
            element={
              <PrivateRoute>
                <ICPFitCheck />
              </PrivateRoute>
            }
          />
          <Route
            path="/pain-point-extraction"
            element={
              <PrivateRoute>
                <PainPointExtraction />
              </PrivateRoute>
            }
          />
          <Route
            path="/company-name-cleanup"
            element={
              <PrivateRoute>
                <CompanyNameCleanup />
              </PrivateRoute>
            }
          />
          <Route
            path="/recent-activity"
            element={
              <PrivateRoute>
                <RecentActivity />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </AuthProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
