import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import CompanyEnrichmentDashboard from "../company-enrichment/CompanyEnrichmentDashboard";
import { useTheme } from "../../App";

const Home = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Company Enrichment");

  const handleNavigation = (label: string) => {
    setActiveItem(label);

    // Handle navigation based on the selected item
    switch (label) {
      case "Home":
        navigate("/home");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Company Enrichment":
        navigate("/company-enrichment");
        break;
      case "Person Enrichment":
        navigate("/person-enrichment");
        break;
      case "Email & Phone Enrichment":
        navigate("/enrich-person-info");
        break;
      case "AI Tools":
        navigate("/ai-tools");
        break;
      case "ICP Fit Check – Reason + Scoring":
        navigate("/icp-fit-check");
        break;
      case "Pain Point Extraction":
        navigate("/pain-point-extraction");
        break;
      case "Company Name Cleanup":
        navigate("/company-name-cleanup");
        break;
      case "Recent Activity":
        navigate("/recent-activity");
        break;
      case "Settings":
        navigate("/settings");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex">
      <TopNavigation />
      <div className="flex w-full mt-16">
        <Sidebar activeItem={activeItem} onItemClick={handleNavigation} />
        <div className="flex-1">
          <CompanyEnrichmentDashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
