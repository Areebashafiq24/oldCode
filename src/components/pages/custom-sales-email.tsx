import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  Mail,
  FileText,
  CheckCircle,
  Zap,
  Users,
  Target,
} from "lucide-react";
import { useTheme } from "../../App";
import CsvImportModal from "../company-enrichment/CsvImportModal";

interface CustomSalesEmailProps {
  className?: string;
}

const CustomSalesEmail = ({ className = "" }: CustomSalesEmailProps) => {
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
              <Mail
                className={`h-12 w-12 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}
              />
            </div>
          </div>
          <h1
            className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Custom Sales Email Based on ICP
          </h1>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
          >
            Create personalized sales emails tailored to your Ideal Customer
            Profile. Upload your CSV file to generate custom email content that
            resonates with your target prospects and drives conversions.
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
                  className={`inline-flex p-4 rounded-2xl ${isDark ? "bg-indigo-900/30" : "bg-indigo-50"} mb-6`}
                >
                  <Upload
                    className={`h-8 w-8 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}
                  />
                </div>
                <h2
                  className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Ready to Create Custom Sales Emails?
                </h2>
                <p
                  className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-8`}
                >
                  Upload your CSV file with prospect and ICP data to generate
                  personalized sales emails that align with your ideal customer
                  profile and address specific pain points and opportunities.
                </p>
              </div>

              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className={`${isDark ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"} text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
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
        apiEndpoint="/api/custom-sales-email"
      />
    </div>
  );
};

export default CustomSalesEmail;
