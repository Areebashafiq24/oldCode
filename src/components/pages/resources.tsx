import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../../../supabase/auth";
import { useTheme } from "../../App";
import {
  Sun,
  Moon,
  Search,
  Calendar,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Users,
  Mail,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "The Complete Guide to B2B Lead Generation in 2024",
    excerpt:
      "Discover the latest strategies and tools for generating high-quality B2B leads that convert into customers.",
    date: "2024-01-15",
    category: "Lead Generation",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
  },
  {
    id: "2",
    title: "Email Verification Best Practices for Sales Teams",
    excerpt:
      "Learn how to maintain clean email lists and improve deliverability rates with proper email verification.",
    date: "2024-01-12",
    category: "Email Marketing",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80",
  },
  {
    id: "3",
    title: "AI-Powered Personalization: The Future of Cold Outreach",
    excerpt:
      "Explore how artificial intelligence is transforming cold email campaigns and improving response rates.",
    date: "2024-01-10",
    category: "AI & Automation",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
  },
  {
    id: "4",
    title: "Data Enrichment Strategies for Better Lead Qualification",
    excerpt:
      "Maximize your lead quality with comprehensive data enrichment techniques and tools.",
    date: "2024-01-08",
    category: "Data Management",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  {
    id: "5",
    title: "Building Your Ideal Customer Profile (ICP) Framework",
    excerpt:
      "Step-by-step guide to creating an effective ICP that drives better targeting and higher conversion rates.",
    date: "2024-01-05",
    category: "Strategy",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
  },
  {
    id: "6",
    title: "GDPR Compliance for Lead Generation: What You Need to Know",
    excerpt:
      "Navigate data privacy regulations while maintaining effective lead generation practices.",
    date: "2024-01-03",
    category: "Compliance",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
];

const categories = [
  "All",
  "Lead Generation",
  "Email Marketing",
  "AI & Automation",
  "Data Management",
  "Strategy",
  "Compliance",
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
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
                className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
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

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1
              className={`text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}
            >
              Resources & Insights
            </h1>
            <p
              className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} mb-8 max-w-2xl mx-auto`}
            >
              Stay ahead with the latest strategies, best practices, and
              insights for modern lead generation and sales prospecting.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search
                className={`absolute left-3 top-3 h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-400"}`}
              />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 h-12 ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : isDark
                        ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className={`group cursor-pointer transition-all duration-200 hover:shadow-lg ${isDark ? "glass-card-dark hover:border-white/30" : "bg-white/80 border-gray-200 hover:border-gray-300"} backdrop-blur-sm`}
                >
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                      >
                        {article.category}
                      </Badge>
                      <div
                        className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        <Calendar className="h-3 w-3" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle
                      className={`text-lg leading-tight group-hover:text-blue-600 transition-colors ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p
                      className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"} mb-4 line-clamp-3`}
                    >
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {article.readTime}
                      </span>
                      <ArrowRight
                        className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-400"} group-hover:text-blue-600 transition-colors`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div
              className={`rounded-2xl p-12 ${isDark ? "glass-card-dark" : "bg-white/60"} backdrop-blur-sm`}
            >
              <Mail
                className={`h-12 w-12 mx-auto mb-6 ${isDark ? "text-blue-400" : "text-blue-600"}`}
              />
              <h2
                className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
              >
                Stay Updated
              </h2>
              <p
                className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-8 max-w-2xl mx-auto`}
              >
                Get the latest insights, strategies, and updates delivered
                straight to your inbox. Join thousands of sales professionals
                who trust Lead Mend.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`flex-1 h-12 ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                />
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8"
                >
                  Subscribe
                </Button>
              </form>
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-4`}
              >
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`${isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"} border-t py-12`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3
                className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"} mb-4`}
              >
                Lead Mend
              </h3>
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Transform your prospecting data into customers with our
                AI-powered lead enrichment platform.
              </p>
            </div>
            <div>
              <h4
                className={`font-medium ${isDark ? "text-white" : "text-gray-900"} mb-4`}
              >
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className={`font-medium ${isDark ? "text-white" : "text-gray-900"} mb-4`}
              >
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/resources"
                    className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs"
                    className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className={`font-medium ${isDark ? "text-white" : "text-gray-900"} mb-4`}
              >
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={`text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`border-t ${isDark ? "border-gray-800" : "border-gray-200"} mt-8 pt-8 text-center`}
          >
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              © 2024 Lead Mend. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
