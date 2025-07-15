import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-xl border-0">
          <CardContent className="p-12 text-center">
            {/* 404 Animation */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="text-8xl font-bold text-blue-500 mb-4">404</div>
              <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Oops! Page Not Found
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-gray-500">
                Don't worry, let's get you back on track!
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>

              <Link to="/">
                <Button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="border-t pt-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  to="/dashboard"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-3 bg-blue-100 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Dashboard
                  </span>
                </Link>

                <Link
                  to="/company-enrichment"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-3 bg-purple-100 rounded-full mb-2 group-hover:bg-purple-200 transition-colors">
                    <Search className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Company
                  </span>
                </Link>

                <Link
                  to="/person-enrichment"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-3 bg-green-100 rounded-full mb-2 group-hover:bg-green-200 transition-colors">
                    <Search className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Person
                  </span>
                </Link>

                <Link
                  to="/ai-tools"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-3 bg-orange-100 rounded-full mb-2 group-hover:bg-orange-200 transition-colors">
                    <HelpCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    AI Tools
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Help Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 pt-6 border-t text-sm text-gray-500"
            >
              <p>
                Still having trouble? Contact our support team for assistance.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
