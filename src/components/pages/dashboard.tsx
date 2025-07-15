import React, { useState, useEffect } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import DashboardGrid from "../dashboard/DashboardGrid";
import TaskBoard from "../dashboard/TaskBoard";
import CompanyEnrichment from "./company-enrichment";
import PersonEnrichment from "./person-enrichment";
import AITools from "./ai-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  Mail,
  Phone,
  CheckCircle,
  Linkedin,
  Upload,
  History,
  ArrowRight,
  ArrowLeft,
  Download,
  FileText,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "../../App";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { isDark } = useTheme();
  const { toast } = useToast();

  // Function to trigger loading state for demonstration
  const handleRefresh = () => {
    setLoading(true);
    // Reset loading after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Function to call backend
  const handleCallBackend = async () => {
    try {
      const response = await fetch("https://ce32c0500e9a.ngrok-free.app/hello");
      const data = await response.json();

      // Log the backend response in the browser console
      console.log("Backend response:", data);

      // Show success message
      toast({
        title: "Backend responded successfully!",
        description: "Check the console for the full response.",
      });
    } catch (error) {
      console.error("Error calling backend:", error);
      toast({
        title: "Error",
        description: "Failed to call backend",
        variant: "destructive",
      });
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const EmailPhoneEnrichment = () => {
    const enrichmentFeatures = [
      {
        title: "Find Work Email",
        description:
          "Upload CSV with names and companies to find work emails using waterfall enrichment",
        icon: <Mail className="h-8 w-8 text-blue-500" />,
        color: "bg-blue-50 border-blue-200",
        action: () => setActiveSection("Find Work Email"),
      },
      {
        title: "Find Mobile Phone",
        description:
          "Upload CSV with LinkedIn URLs to find mobile phone numbers",
        icon: <Phone className="h-8 w-8 text-green-500" />,
        color: "bg-green-50 border-green-200",
        action: () => setActiveSection("Find Mobile Phone"),
      },
      {
        title: "Verify Email",
        description: "Upload CSV with email addresses to verify their validity",
        icon: <CheckCircle className="h-8 w-8 text-purple-500" />,
        color: "bg-purple-50 border-purple-200",
        action: () => setActiveSection("Verify Email"),
      },
      {
        title: "Find LinkedIn URL",
        description:
          "Upload CSV with names and companies to find LinkedIn profiles",
        icon: <Linkedin className="h-8 w-8 text-orange-500" />,
        color: "bg-orange-50 border-orange-200",
        action: () => setActiveSection("Find LinkedIn URL"),
      },
    ];

    return (
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}
          >
            Email & Phone Enrichment
          </h1>
          <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Choose an enrichment feature to upload your CSV and process data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrichmentFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`${isDark ? "glass-card-dark hover:border-white/30" : feature.color} hover:shadow-lg transition-all duration-200 cursor-pointer group backdrop-blur-sm`}
              onClick={feature.action}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <CardTitle
                      className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {feature.title}
                    </CardTitle>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <p
                  className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-4`}
                >
                  {feature.description}
                </p>
                <div
                  className={`flex items-center gap-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  <div className="flex items-center gap-1">
                    <Upload className="h-4 w-4" />
                    <span>CSV Upload</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <History className="h-4 w-4" />
                    <span>History Tracking</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const EnrichmentSubPage = ({
    type,
    onBack,
  }: {
    type: string;
    onBack: () => void;
  }) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const mockHistory = [
      {
        id: 1,
        date: "2024-01-15",
        fileName: "leads_batch_1.csv",
        status: "Completed",
        totalRows: 1250,
        enrichedCount: 1180,
        resultFile: "leads_batch_1_enriched.csv",
      },
      {
        id: 2,
        date: "2024-01-14",
        fileName: "prospects_q1.csv",
        status: "Processing",
        totalRows: 850,
        enrichedCount: 420,
        resultFile: null,
      },
      {
        id: 3,
        date: "2024-01-13",
        fileName: "company_contacts.csv",
        status: "Failed",
        totalRows: 500,
        enrichedCount: 0,
        resultFile: null,
      },
    ];

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: "Please upload a file smaller than 10MB",
            variant: "destructive",
          });
          return;
        }
        if (!file.name.endsWith(".csv")) {
          toast({
            title: "Invalid file type",
            description: "Please upload a CSV file",
            variant: "destructive",
          });
          return;
        }
        setUploadedFile(file);
      }
    };

    const handleProcess = () => {
      if (!uploadedFile) {
        toast({
          title: "No file selected",
          description: "Please upload a CSV file first",
          variant: "destructive",
        });
        return;
      }

      setIsProcessing(true);
      toast({
        title: "Processing started",
        description: `Starting ${type.toLowerCase()} enrichment for ${uploadedFile.name}`,
      });

      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Processing completed",
          description: "Your enrichment job has been completed successfully",
        });
      }, 3000);
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case "Completed":
          return "bg-green-100 text-green-800";
        case "Processing":
          return "bg-yellow-100 text-yellow-800";
        case "Failed":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    const getTypeIcon = () => {
      switch (type) {
        case "Find Work Email":
          return <Mail className="h-6 w-6 text-blue-500" />;
        case "Find Mobile Phone":
          return <Phone className="h-6 w-6 text-green-500" />;
        case "Verify Email":
          return <CheckCircle className="h-6 w-6 text-purple-500" />;
        case "Find LinkedIn URL":
          return <Linkedin className="h-6 w-6 text-orange-500" />;
        default:
          return <FileText className="h-6 w-6 text-gray-500" />;
      }
    };

    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className={`mb-4 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Email & Phone Enrichment
          </Button>

          <div className="flex items-center gap-3 mb-2">
            {getTypeIcon()}
            <h1
              className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {type}
            </h1>
          </div>
          <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Upload your CSV file and track enrichment progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card
              className={`${isDark ? "glass-card-dark" : "bg-white/80"} backdrop-blur-sm`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload CSV File
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="csv-upload">Select CSV File</Label>
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Max 10MB, CSV format only, up to 100k records
                  </p>
                </div>

                {uploadedFile && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">
                        {uploadedFile.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleProcess}
                  disabled={!uploadedFile || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Start Enrichment
                    </>
                  )}
                </Button>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>
                    <strong>Waterfall Logic:</strong>
                  </p>
                  <p>1. Leadmagic (Primary)</p>
                  <p>2. Findymail → Prospeo (Secondary)</p>
                  <p>3. Hunter.io (Final fallback)</p>
                  <p>4. MillionVerifier (Verification)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History Section */}
          <div className="lg:col-span-2">
            <Card
              className={`${isDark ? "glass-card-dark" : "bg-white/80"} backdrop-blur-sm`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Enrichment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>File Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total Rows</TableHead>
                      <TableHead>Enriched</TableHead>
                      <TableHead>Result File</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="font-medium">
                          {item.fileName}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.totalRows.toLocaleString()}</TableCell>
                        <TableCell>
                          {item.enrichedCount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {item.resultFile ? (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Email & Phone Enrichment":
        return <EmailPhoneEnrichment />;
      case "Find Work Email":
      case "Find Mobile Phone":
      case "Verify Email":
      case "Find LinkedIn URL":
        return (
          <EnrichmentSubPage
            type={activeSection}
            onBack={() => setActiveSection("Email & Phone Enrichment")}
          />
        );
      case "Company Enrichment":
        return <CompanyEnrichment />;
      case "Person Enrichment":
        return <PersonEnrichment />;
      case "AI Tools":
        return <AITools />;
      default:
        return (
          <div
            className={cn(
              "container mx-auto p-6 space-y-8",
              "transition-all duration-300 ease-in-out",
            )}
          >
            <DashboardGrid isLoading={loading} />
            <TaskBoard isLoading={loading} />
          </div>
        );
    }
  };
  return (
    <div
      className={`min-h-screen ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"}`}
    >
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem={activeSection} onItemClick={handleSectionChange} />
        <main className="flex-1 overflow-auto">
          {(activeSection === "Home" || activeSection === "Dashboard") && (
            <div className="container mx-auto px-6 pt-4 pb-2 flex justify-end gap-3">
              <Button
                onClick={handleCallBackend}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2"
              >
                Call Backend
              </Button>
              <Button
                onClick={handleRefresh}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Loading..." : "Refresh Dashboard"}
              </Button>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Home;
