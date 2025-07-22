import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  PenTool,
  FileText,
  CheckCircle,
  Scissors,
  RefreshCw,
} from "lucide-react";
import { useTheme } from "../../App";
import CsvImportModal from "../company-enrichment/CsvImportModal";

interface CompanyNameCleanupProps {
  className?: string;
}

const CompanyNameCleanup = ({ className = "" }: CompanyNameCleanupProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark } = useTheme();

  const enrichmentServices = {
    "NAME CLEANUP FEATURES": [
      { name: "Legal Suffix Removal", icon: <Scissors className="h-4 w-4" /> },
      {
        name: "Standardized Formatting",
        icon: <RefreshCw className="h-4 w-4" />,
      },
      {
        name: "Duplicate Detection",
        icon: <CheckCircle className="h-4 w-4" />,
      },
      { name: "Brand Name Extraction", icon: <PenTool className="h-4 w-4" /> },
      {
        name: "Special Character Cleanup",
        icon: <Scissors className="h-4 w-4" />,
      },
      {
        name: "Abbreviation Expansion",
        icon: <RefreshCw className="h-4 w-4" />,
      },
      { name: "Case Normalization", icon: <FileText className="h-4 w-4" /> },
      {
        name: "Whitespace Trimming",
        icon: <CheckCircle className="h-4 w-4" />,
      },
    ],
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"} ${className}`}
    >
      <div className="flex">
        {/* Left Sidebar - Service Features */}
        <div
          className={`w-80 min-h-screen ${isDark ? "glass-card-dark border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-md border-r p-6 overflow-y-auto`}
        >
          <h2
            className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Name Cleanup Features
          </h2>

          <div className="space-y-6">
            {Object.entries(enrichmentServices).map(([category, services]) => (
              <div key={category}>
                <h3
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {category}
                </h3>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"} transition-colors cursor-pointer`}
                    >
                      <div
                        className={`${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {service.icon}
                      </div>
                      <span
                        className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div
                className={`p-4 rounded-2xl ${isDark ? "bg-white/10" : "bg-white/80"} backdrop-blur-sm`}
              >
                <PenTool
                  className={`h-12 w-12 ${isDark ? "text-orange-400" : "text-orange-600"}`}
                />
              </div>
            </div>
            <h1
              className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Company Name Cleanup
            </h1>
            <p
              className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
            >
              Clean and standardize company names in your database. Remove legal
              suffixes, normalize formatting, and ensure consistency across your
              data.
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
                    className={`inline-flex p-4 rounded-2xl ${isDark ? "bg-orange-900/30" : "bg-orange-50"} mb-6`}
                  >
                    <Upload
                      className={`h-8 w-8 ${isDark ? "text-orange-400" : "text-orange-600"}`}
                    />
                  </div>
                  <h2
                    className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Ready to Clean Your Company Names?
                  </h2>
                  <p
                    className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-8`}
                  >
                    Upload your CSV file with company names and get cleaned,
                    standardized names with legal suffixes removed and
                    consistent formatting applied.
                  </p>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className={`${isDark ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-600 hover:bg-orange-700"} text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
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
      </div>

      {/* CSV Import Modal */}
      <CsvImportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CompanyNameCleanup;
