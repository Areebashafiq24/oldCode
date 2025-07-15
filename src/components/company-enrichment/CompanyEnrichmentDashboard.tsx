import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Building2, FileSpreadsheet, TrendingUp } from "lucide-react";
import { useTheme } from "../../App";
import CsvImportModal from "./CsvImportModal";

interface CompanyEnrichmentDashboardProps {
  className?: string;
}

const CompanyEnrichmentDashboard = ({
  className = "",
}: CompanyEnrichmentDashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark } = useTheme();

  const stats = [
    {
      title: "Companies Enriched",
      value: "12,847",
      icon: <Building2 className="h-6 w-6" />,
      color: "text-blue-500",
      bgColor: isDark ? "bg-blue-900/20" : "bg-blue-50",
    },
    {
      title: "CSV Files Processed",
      value: "234",
      icon: <FileSpreadsheet className="h-6 w-6" />,
      color: "text-green-500",
      bgColor: isDark ? "bg-green-900/20" : "bg-green-50",
    },
    {
      title: "Success Rate",
      value: "94.2%",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-purple-500",
      bgColor: isDark ? "bg-purple-900/20" : "bg-purple-50",
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"} ${className}`}
    >
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div
              className={`p-4 rounded-2xl ${isDark ? "bg-white/10" : "bg-white/80"} backdrop-blur-sm`}
            >
              <Building2
                className={`h-12 w-12 ${isDark ? "text-blue-400" : "text-blue-600"}`}
              />
            </div>
          </div>
          <h1
            className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Company Enrichment
          </h1>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
          >
            Transform your company data with comprehensive business
            intelligence. Upload your CSV file and get detailed company
            information in seconds.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`${isDark ? "glass-card-dark" : "bg-white/80"} backdrop-blur-sm border-0 shadow-lg`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {stat.title}
                    </p>
                    <p
                      className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mt-1`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
                  Ready to Enrich Your Company Data?
                </h2>
                <p
                  className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-8`}
                >
                  Upload your CSV file with company names or domains and get
                  comprehensive business intelligence data including revenue,
                  employee count, industry, and more.
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Company Details",
              description:
                "Get comprehensive company information including industry, size, and description",
              icon: <Building2 className="h-6 w-6" />,
            },
            {
              title: "Financial Data",
              description:
                "Access revenue estimates, funding information, and financial metrics",
              icon: <TrendingUp className="h-6 w-6" />,
            },
            {
              title: "Contact Information",
              description:
                "Find key contacts, email addresses, and social media profiles",
              icon: <FileSpreadsheet className="h-6 w-6" />,
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className={`${isDark ? "glass-card-dark" : "bg-white/60"} backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-200`}
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex p-2 rounded-lg ${isDark ? "bg-white/10" : "bg-gray-100"} mb-4`}
                >
                  <div className={isDark ? "text-blue-400" : "text-blue-600"}>
                    {feature.icon}
                  </div>
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
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

export default CompanyEnrichmentDashboard;
