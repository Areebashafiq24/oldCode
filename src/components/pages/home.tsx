import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  Settings,
  User,
  Sun,
  Moon,
  Mail,
  Phone,
  CheckCircle,
  Building2,
  Users,
  Brain,
  Star,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { useTheme } from "../../App";

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen ${isDark ? "leadmagic-gradient text-white" : "leadmagic-gradient-light text-black"}`}
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
                className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
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
                className={`text-sm font-medium ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
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
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium ${isDark ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 hover:cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={`rounded-xl border-none shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
                  >
                    <DropdownMenuLabel
                      className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium ${isDark ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                    Start Free Trial – 100 credits
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero section */}
        <section className="py-32 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <h1
              className={`text-7xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"} mb-6`}
            >
              Lead Mend
            </h1>
            <p
              className={`text-2xl ${isDark ? "text-gray-300" : "text-gray-600"} mb-4 font-medium`}
            >
              Transform your prospecting data into customers
            </p>
            <p
              className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} mb-12 max-w-3xl mx-auto leading-relaxed`}
            >
              The most accurate email finder and lead enrichment platform for
              sales teams. Find verified business emails, phone numbers, and
              social profiles with our AI-powered enrichment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Start Free Trial – Get 100 Credits
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className={`px-10 py-4 text-lg rounded-xl border-2 ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"} transition-all`}
                >
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mb-16">
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-6`}
              >
                Trusted by 10,000+ sales professionals
              </p>
              <div className="flex items-center justify-center gap-12 opacity-60">
                <div
                  className={`text-2xl font-bold ${isDark ? "text-gray-400" : "text-gray-400"}`}
                >
                  G2
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 fill-current ${isDark ? "text-yellow-400" : "text-yellow-500"}`}
                    />
                  ))}
                  <span
                    className={`ml-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    4.8/5
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                  95% Email Accuracy
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                  GDPR Compliant
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Real-time Verification
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2
                className={`text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}
              >
                Everything You Need to Find & Verify Contacts
              </h2>
              <p
                className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-4xl mx-auto`}
              >
                Our comprehensive suite of tools helps you find accurate contact
                information, verify emails, and enrich your prospect data with
                AI-powered insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                className={`${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"} p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
                >
                  Email Finder
                </h3>
                <p
                  className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}
                >
                  Find anyone's professional email address using our advanced
                  algorithms and multiple data sources.
                </p>
                <ul
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} space-y-3`}
                >
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    95% accuracy rate
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Real-time verification
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Bulk processing
                  </li>
                </ul>
              </div>

              <div
                className={`${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"} p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
                >
                  Mobile Finder
                </h3>
                <p
                  className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}
                >
                  Discover mobile phone numbers for your prospects with LinkedIn
                  URL input and advanced matching.
                </p>
                <ul
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} space-y-3`}
                >
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    LinkedIn integration
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Direct dial numbers
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Mobile verification
                  </li>
                </ul>
              </div>

              <div
                className={`${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"} p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
                >
                  Email Validation
                </h3>
                <p
                  className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}
                >
                  Verify email addresses in real-time to maintain clean,
                  deliverable lists and improve campaign performance.
                </p>
                <ul
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} space-y-3`}
                >
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Real-time validation
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Bounce protection
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Deliverability scoring
                  </li>
                </ul>
              </div>

              <div
                className={`${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"} p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
                >
                  Company Finder
                </h3>
                <p
                  className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}
                >
                  Get comprehensive company data including revenue, employee
                  count, technology stack, and funding information.
                </p>
                <ul
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} space-y-3`}
                >
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Company profiles
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Technology stack
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Funding data
                  </li>
                </ul>
              </div>

              <div
                className={`${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"} p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="h-16 w-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
                >
                  Profile Finder
                </h3>
                <p
                  className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}
                >
                  Find LinkedIn profiles and professional information for your
                  prospects with advanced matching algorithms.
                </p>
                <ul
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} space-y-3`}
                >
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    LinkedIn profiles
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Professional data
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Social verification
                  </li>
                </ul>
              </div>

              <div
                className={`${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"} p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
                >
                  AI Personalization
                </h3>
                <p
                  className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}
                >
                  Generate personalized outreach messages and insights using
                  GPT-4 powered AI technology.
                </p>
                <ul
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} space-y-3`}
                >
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    GPT-4 powered
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Custom templates
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Smart insights
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2
                className={`text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}
              >
                How It Works
              </h2>
              <p
                className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto`}
              >
                Transform your prospecting workflow in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div
                  className={`w-20 h-20 rounded-full ${isDark ? "bg-blue-900" : "bg-blue-100"} flex items-center justify-center mx-auto mb-6`}
                >
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
                >
                  Upload CSV
                </h3>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Upload your prospect list with names, companies, or LinkedIn
                  URLs. Our system supports various data formats.
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`w-20 h-20 rounded-full ${isDark ? "bg-green-900" : "bg-green-100"} flex items-center justify-center mx-auto mb-6`}
                >
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
                >
                  Enrich Real-time
                </h3>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Our AI processes your data in real-time, finding emails, phone
                  numbers, and enriching with professional insights.
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`w-20 h-20 rounded-full ${isDark ? "bg-purple-900" : "bg-purple-100"} flex items-center justify-center mx-auto mb-6`}
                >
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
                >
                  Push to Outbound Tools
                </h3>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Export enriched data or integrate directly with your CRM,
                  email tools, and sales automation platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2
                className={`text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}
              >
                Simple, Transparent Pricing
              </h2>
              <p
                className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Choose the plan that fits your needs. No hidden fees, cancel
                anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`${isDark ? "glass-card-dark" : "bg-white/80"} p-8 rounded-2xl shadow-lg border ${isDark ? "border-white/20" : "border-gray-200"} backdrop-blur-sm`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Starter
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $29
                  </div>
                  <div className="text-gray-500">per month</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">1,000 email credits</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">Email verification</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">Basic support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-3">
                  Get Started
                </Button>
              </div>

              <div
                className={`${isDark ? "glass-card-dark" : "bg-white/80"} p-8 rounded-2xl shadow-xl border-2 border-blue-500 relative backdrop-blur-sm`}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Professional
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $99
                  </div>
                  <div className="text-gray-500">per month</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">5,000 email credits</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">Phone number finder</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">AI personalization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3">
                  Get Started
                </Button>
              </div>

              <div
                className={`${isDark ? "glass-card-dark" : "bg-white/80"} p-8 rounded-2xl shadow-lg border ${isDark ? "border-white/20" : "border-gray-200"} backdrop-blur-sm`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Enterprise
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    Custom
                  </div>
                  <div className="text-gray-500">contact us</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">Unlimited credits</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">Dedicated support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-3">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] py-12 text-xs text-gray-500">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="border-b border-gray-300 pb-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                Lead Mend
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    API Integration
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                Enrichment
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Company Data
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Person Intelligence
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    AI Personalization
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Email Verification
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                Integrations
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Firecrawl API
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Serper.dev
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    GPT-4 Turbo
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Custom APIs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4">
            <p>Copyright © 2025 Lead Mend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
