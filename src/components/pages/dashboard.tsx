import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import CompanyEnrichmentDashboard from "../company-enrichment/CompanyEnrichmentDashboard";
import AITools from "./ai-tools";
import ICPFitCheck from "./icp-fit-check";
import PainPointExtraction from "./pain-point-extraction";
import CompanyNameCleanup from "./company-name-cleanup";
import { useTheme } from "../../App";

const Home = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Company Description");
  const [currentView, setCurrentView] = useState("company-enrichment");

  const handleNavigation = (label: string) => {
    setActiveItem(label);

    // Handle navigation based on the selected item
    switch (label) {
      // Company Enrichment Services - all redirect to company enrichment
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
        return <CompanyEnrichmentDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <TopNavigation />
      <div className="flex w-full mt-16">
        <Sidebar activeItem={activeItem} onItemClick={handleNavigation} />
        <div className="flex-1">{renderCurrentView()}</div>
      </div>
    </div>
  );
};

export default Home;
