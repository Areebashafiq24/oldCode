import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../../../supabase/auth";
import { useTheme } from "../../App";
import {
  Sun,
  Moon,
  Search,
  ChevronRight,
  BookOpen,
  Zap,
  Shield,
  Code,
  Users,
  BarChart3,
  Mail,
  Phone,
  Building2,
  Brain,
  CheckCircle,
} from "lucide-react";

interface NavItem {
  id: string;
  title: string;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      { id: "introduction", title: "Introduction" },
      { id: "quick-start", title: "Quick Start" },
      { id: "authentication", title: "Authentication" },
    ],
  },
  {
    id: "features",
    title: "Features",
    items: [
      { id: "email-finder", title: "Email Finder" },
      { id: "mobile-finder", title: "Mobile Finder" },
      { id: "email-validation", title: "Email Validation" },
      { id: "company-finder", title: "Company Finder" },
      { id: "profile-finder", title: "Profile Finder" },
      { id: "ai-personalization", title: "AI Personalization" },
    ],
  },
  {
    id: "api",
    title: "API Reference",
    items: [
      { id: "api-overview", title: "Overview" },
      { id: "endpoints", title: "Endpoints" },
      { id: "rate-limits", title: "Rate Limits" },
      { id: "errors", title: "Error Handling" },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    items: [
      { id: "csv-upload", title: "CSV Upload" },
      { id: "webhooks", title: "Webhooks" },
      { id: "zapier", title: "Zapier" },
    ],
  },
];

const features = [
  {
    icon: <Mail className="h-6 w-6 text-blue-500" />,
    title: "Email Finder",
    description:
      "Find professional email addresses with 95% accuracy using our advanced algorithms.",
  },
  {
    icon: <Phone className="h-6 w-6 text-green-500" />,
    title: "Mobile Finder",
    description:
      "Discover mobile phone numbers for your prospects with LinkedIn URL input.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-purple-500" />,
    title: "Email Validation",
    description:
      "Verify email addresses in real-time to maintain clean, deliverable lists.",
  },
  {
    icon: <Building2 className="h-6 w-6 text-orange-500" />,
    title: "Company Finder",
    description:
      "Get comprehensive company data including revenue, employee count, and technology stack.",
  },
  {
    icon: <Users className="h-6 w-6 text-red-500" />,
    title: "Profile Finder",
    description:
      "Find LinkedIn profiles and professional information for your prospects.",
  },
  {
    icon: <Brain className="h-6 w-6 text-indigo-500" />,
    title: "AI Personalization",
    description:
      "Generate personalized outreach messages using GPT-4 powered AI.",
  },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const renderContent = () => {
    switch (activeSection) {
      case "introduction":
        return (
          <div className="space-y-8">
            <div>
              <h1
                className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
              >
                Introduction
              </h1>
              <p
                className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-8`}
              >
                Welcome to Lead Mend - the most accurate email finder and lead
                enrichment platform for sales teams.
              </p>
            </div>

            <div
              className={`p-6 rounded-lg ${isDark ? "bg-blue-900/20 border border-blue-800" : "bg-blue-50 border border-blue-200"}`}
            >
              <h3
                className={`text-lg font-semibold ${isDark ? "text-blue-400" : "text-blue-900"} mb-2`}
              >
                What is Lead Mend?
              </h3>
              <p className={`${isDark ? "text-blue-300" : "text-blue-800"}`}>
                Lead Mend is a comprehensive lead enrichment platform that helps
                sales teams find, verify, and enrich prospect data with
                AI-powered insights.
              </p>
            </div>

            <div>
              <h2
                className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}
              >
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className={`${isDark ? "glass-card-dark" : "bg-white/80 border-gray-200"} backdrop-blur-sm`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
                        >
                          {feature.icon}
                        </div>
                        <div>
                          <h3
                            className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}
                          >
                            {feature.title}
                          </h3>
                          <p
                            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2
                className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
              >
                Getting Started
              </h2>
              <div className="space-y-4">
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold`}
                  >
                    1
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}
                    >
                      Sign Up for Free
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Create your account and get 100 free credits to start
                      enriching your leads.
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold`}
                  >
                    2
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}
                    >
                      Upload Your Data
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Import your prospect list via CSV or use our API for
                      real-time enrichment.
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold`}
                  >
                    3
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}
                    >
                      Enrich & Export
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Let our AI enrich your data with emails, phone numbers,
                      and insights, then export the results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <div>
              <h1
                className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
              >
                {activeSection.charAt(0).toUpperCase() +
                  activeSection.slice(1).replace("-", " ")}
              </h1>
              <p
                className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Documentation for {activeSection.replace("-", " ")} is coming
                soon.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"}`}
    >
      {/* Navigation */}
      <header
        className={`fixed top-0 z-50 w-full ${isDark ? "bg-black/20" : "bg-white/20"} backdrop-blur-md border-b ${isDark ? "border-white/10" : "border-black/10"}`}
      >
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Lead Mend
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
              >
                Home
              </Link>
              <Link
                to="/resources"
                className={`text-sm font-medium ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
              >
                Resources
              </Link>
              <Link
                to="/docs"
                className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Docs
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${isDark ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className={`${isDark ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside
          className={`w-80 h-screen sticky top-16 ${isDark ? "glass-card-dark border-white/10" : "bg-white/60 border-gray-200"} border-r overflow-y-auto backdrop-blur-sm`}
        >
          <div className="p-6">
            <div className="relative mb-6">
              <Search
                className={`absolute left-3 top-3 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-400"}`}
              />
              <Input
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
              />
            </div>

            <nav className="space-y-2">
              {navigation.map((section) => (
                <div key={section.id}>
                  <h3
                    className={`font-semibold text-sm ${isDark ? "text-gray-300" : "text-gray-700"} mb-2 px-3 py-1`}
                  >
                    {section.title}
                  </h3>
                  {section.items && (
                    <ul className="space-y-1 mb-4">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              activeSection === item.id
                                ? isDark
                                  ? "bg-blue-900 text-blue-300"
                                  : "bg-blue-100 text-blue-900"
                                : isDark
                                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-8 py-12">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
