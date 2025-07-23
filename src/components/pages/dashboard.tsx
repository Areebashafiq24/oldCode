import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import ICPFitCheck from "./icp-fit-check";
import PainPointExtraction from "./pain-point-extraction";
import CompanyNameCleanup from "./company-name-cleanup";
import { useTheme } from "../../App";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Building2 } from "lucide-react";
import CsvImportModal from "../company-enrichment/CsvImportModal";

const Home = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Company Description");
  const [currentView, setCurrentView] = useState("company-enrichment");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigation = (label: string) => {
    setActiveItem(label);

    // Handle navigation based on the selected item
    switch (label) {
      // Company Enrichment Services - show company enrichment view
      case "Company Description":
      case "Company Job Openings (Website Scraper)":
      case "Company News Summary":
      case "Company LinkedIn URL Finder":
        setCurrentView("company-enrichment");
        break;

      // Person Enrichment Services - do nothing
      case "Person Work Email":
      case "Person Mobile Phone":
      case "Person LinkedIn URL":
      case "Person Job Title":
      case "Personal Email":
      case "Person Location":
      case "Person Education":
      case "Person Bio Summary":
        // Do nothing as requested
        break;

      // AI Enrichment Services - open specific pages
      case "ICP Fit Check – Reason + Scoring":
        setCurrentView("icp-fit-check");
        break;
      case "Pain Point Extraction":
        setCurrentView("pain-point-extraction");
        break;
      case "Company Name Cleanup":
        setCurrentView("company-name-cleanup");
        break;

      default:
        break;
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "icp-fit-check":
        return <ICPFitCheck />;
      case "pain-point-extraction":
        return <PainPointExtraction />;
      case "company-name-cleanup":
        return <CompanyNameCleanup />;
      case "company-enrichment":
      default:
        return (
          <div
            className={`min-h-screen h-full ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"}`}
          >
            <div className="px-6 py-12">
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
                        Upload your CSV file with company names or domains and
                        get comprehensive business intelligence data including
                        revenue, employee count, industry, and more.
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
                        Supported formats: CSV • Max file size: 10MB • Up to
                        100,000 records
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
            />
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen h-full flex ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"}`}
    >
      <TopNavigation />
      <div className="flex w-full mt-16 h-full">
        <Sidebar activeItem={activeItem} onItemClick={handleNavigation} />
        <div className="flex-1 h-full">{renderCurrentView()}</div>
      </div>
    </div>
  );
};

export default Home;
