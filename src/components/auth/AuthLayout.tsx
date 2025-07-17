import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../App";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"}`}
    >
      {/* Navigation */}
      <header
        className={`fixed top-0 z-50 w-full ${isDark ? "bg-black/20" : "bg-white/20"} backdrop-blur-md border-b ${isDark ? "border-white/10" : "border-black/10"}`}
      >
        <div className="max-w-[980px] mx-auto flex h-12 items-center justify-between px-4">
          <div className="flex items-center">
            <Link
              to="/"
              className={`font-medium text-xl ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Lead Mend
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-7 text-sm font-light">
            <Link
              to="/"
              className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Features
            </Link>
            <Link
              to="/"
              className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Documentation
            </Link>
            <Link
              to="/"
              className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Components
            </Link>
            <Link
              to="/"
              className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Examples
            </Link>
            <Link
              to="/"
              className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Support
            </Link>
          </nav>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center pt-12">
        <div className="max-w-2xl w-full px-6">
          <div className="text-center mb-8">
            <h2
              className={`text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Lead Mend
            </h2>
            <p
              className={`text-2xl font-medium ${isDark ? "text-gray-300" : "text-gray-600"} mt-4`}
            >
              Transform your prospecting data into customers
            </p>
            <p
              className={`text-lg ${isDark ? "text-gray-400" : "text-gray-500"} mt-2 max-w-2xl mx-auto`}
            >
              The most accurate email finder and lead enrichment platform for
              sales teams. Find verified business emails, phone numbers, and
              social profiles with our AI-powered enrichment platform.
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
