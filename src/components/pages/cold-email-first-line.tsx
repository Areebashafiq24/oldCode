import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  Mail,
  FileText,
  CheckCircle,
  Zap,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "../../App";
import CsvImportModal from "../company-enrichment/CsvImportModal";

interface ColdEmailFirstLineProps {
  className?: string;
}

const ColdEmailFirstLine = ({ className = "" }: ColdEmailFirstLineProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen h-full ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"} ${className}`}
    >
      <div className="px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div
              className={`p-4 rounded-2xl ${isDark ? "bg-white/10" : "bg-white/80"} backdrop-blur-sm`}
            >
              <MessageSquare
                className={`h-12 w-12 ${isDark ? "text-green-400" : "text-green-600"}`}
              />
            </div>
          </div>
          <h1
            className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Cold Email First Line Generator Write
          </h1>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
          >
            Generate compelling and personalized first lines for your cold
            emails using AI. Upload your CSV file to create engaging opening
            lines that capture attention and increase response rates.
          </p>
        </div>

        {/* Main CTA Section */}
        <div className="max-w-2xl mx-auto">
          <Card
            className={`${isDark ? "glass-card-dark" : "bg-white/80"} backdrop-blur-sm border-0 shadow-xl`}
          >
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div
                  className={`inline-flex p-4 rounded-2xl ${isDark ? "bg-green-900/30" : "bg-green-50"} mb-6`}
                >
                  <Upload
                    className={`h-8 w-8 ${isDark ? "text-green-400" : "text-green-600"}`}
                  />
                </div>
                <h2
                  className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Ready to Generate First Lines?
                </h2>
                <p
                  className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-8`}
                >
                  Upload your CSV file with prospect information and get
                  AI-generated first lines that are personalized, engaging, and
                  designed to maximize your email open and response rates.
                </p>
              </div>

              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className={`${isDark ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700"} text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
              >
                <Upload className="h-5 w-5 mr-3" />
                Import CSV File
              </Button>

              <div className="mt-8 pt-8 border-t border-gray-200/20">
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Supported formats: CSV • Max file size: 10MB • Up to 100,000
                  records
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CSV Import Modal */}
      <CsvImportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hideEnrichmentOptions={true}
        apiEndpoint="/api/cold-email-first-line"
      />
    </div>
  );
};

export default ColdEmailFirstLine;
