import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  Building2,
  Users,
  Brain,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  DollarSign,
  TrendingUp,
  Globe,
  MessageSquare,
  FileText,
  Zap,
  Target,
  PenTool,
} from "lucide-react";
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

  const enrichmentServices = {
    "ENRICH COMPANY INFO": [
      { name: "Company Description", icon: <FileText className="h-4 w-4" /> },
      { name: "Company Industry", icon: <Building2 className="h-4 w-4" /> },
      {
        name: "Company Revenue (Estimated)",
        icon: <DollarSign className="h-4 w-4" />,
      },
      { name: "Employee Count", icon: <Users className="h-4 w-4" /> },
      {
        name: "Company Funding Stage",
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Total Funding Raised",
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Company Job Openings (Website Scraper)",
        icon: <Briefcase className="h-4 w-4" />,
      },
      { name: "Company Social Profiles", icon: <Globe className="h-4 w-4" /> },
      {
        name: "Company News Summary",
        icon: <MessageSquare className="h-4 w-4" />,
      },
    ],
    "ENRICH PERSON INFO": [
      { name: "Person Work Email", icon: <Mail className="h-4 w-4" /> },
      { name: "Person Mobile Phone", icon: <Phone className="h-4 w-4" /> },
      { name: "Person LinkedIn URL", icon: <Users className="h-4 w-4" /> },
      { name: "Person Job Title", icon: <Briefcase className="h-4 w-4" /> },
      { name: "Personal Email", icon: <Mail className="h-4 w-4" /> },
      { name: "Person Location", icon: <MapPin className="h-4 w-4" /> },
      { name: "Person Education", icon: <GraduationCap className="h-4 w-4" /> },
      { name: "Person Bio Summary", icon: <FileText className="h-4 w-4" /> },
    ],
    "AI ENRICHMENT": [
      {
        name: "ICP Fit Check – Reason + Scoring",
        icon: <Target className="h-4 w-4" />,
      },
      { name: "Pain Point Extraction", icon: <Brain className="h-4 w-4" /> },
      { name: "Company Name Cleanup", icon: <PenTool className="h-4 w-4" /> },
      {
        name: "Cold Email First Line Generator",
        icon: <Mail className="h-4 w-4" />,
      },
      {
        name: "Write Custom Sales Email Based on ICP",
        icon: <Zap className="h-4 w-4" />,
      },
    ],
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"} ${className}`}
    >
      <div className="flex">
        {/* Left Sidebar - Enrichment Services */}
        <div
          className={`w-80 min-h-screen ${isDark ? "glass-card-dark border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-md border-r p-6 overflow-y-auto`}
        >
          <h2
            className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Enrichment Services
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
