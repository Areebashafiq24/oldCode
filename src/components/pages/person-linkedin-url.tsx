import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Users, FileText, CheckCircle } from "lucide-react";
import { useTheme } from "../../App";
import CsvImportModal from "../company-enrichment/CsvImportModal";

interface PersonLinkedInUrlProps {
  className?: string;
}

const PersonLinkedInUrl = ({ className = "" }: PersonLinkedInUrlProps) => {
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
              <Users
                className={`h-12 w-12 ${isDark ? "text-blue-400" : "text-blue-600"}`}
              />
            </div>
          </div>
          <h1
            className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Person LinkedIn URL
          </h1>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
          >
            Find LinkedIn URLs for your prospects with AI-powered search. Upload
            your CSV file with person names and company information to get
            accurate LinkedIn profile URLs.
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
                  className={`inline-flex p-4 rounded-2xl ${isDark ? "bg-blue-900/30" : "bg-blue-50"} mb-6`}
                >
                  <Upload
                    className={`h-8 w-8 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                  />
                </div>
                <h2
                  className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Ready to Find LinkedIn URLs?
                </h2>
                <p
                  className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-8`}
                >
                  Upload your CSV file with person names and company data to get
                  accurate LinkedIn profile URLs for your prospects.
                </p>
              </div>

              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className={`${isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
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
        apiEndpoint="/api/person-linkedin-url"
      />
    </div>
  );
};

export default PersonLinkedInUrl;
