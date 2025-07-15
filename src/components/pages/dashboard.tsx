import React from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import CompanyEnrichmentDashboard from "../company-enrichment/CompanyEnrichmentDashboard";
import { useTheme } from "../../App";

const Home = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen">
      <TopNavigation />
      <div className="mt-16">
        <CompanyEnrichmentDashboard />
      </div>
    </div>
  );
};

export default Home;
