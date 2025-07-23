import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Upload,
  FileText,
  X,
  Settings,
  Zap,
  Play,
  CheckCircle,
  Download,
} from "lucide-react";
import { useTheme } from "../../App";
import { useToast } from "@/components/ui/use-toast";

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  hideEnrichmentOptions?: boolean;
}

interface CsvData {
  headers: string[];
  rows: string[][];
  totalRows: number;
  totalColumns: number;
}

interface EnrichedCsvData {
  headers: string[];
  rows: string[][];
  totalRows: number;
  totalColumns: number;
  blob?: Blob;
}

const CsvImportModal = ({
  isOpen,
  onClose,
  hideEnrichmentOptions = false,
}: CsvImportModalProps) => {
  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [enrichedData, setEnrichedData] = useState<EnrichedCsvData | null>(
    null,
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Toggle states for enrichment options
  const [companyJobOpenings, setCompanyJobOpenings] = useState(false);
  const [companyDescription, setCompanyDescription] = useState(false);
  const [companyNewsSummary, setCompanyNewsSummary] = useState(false);
  const [companyLinkedinUrlFinder, setCompanyLinkedinUrlFinder] =
    useState(false);

  const { isDark } = useTheme();
  const { toast } = useToast();

  const handleFileUpload = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".csv")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());

        if (lines.length === 0) {
          toast({
            title: "Empty file",
            description: "The CSV file appears to be empty",
            variant: "destructive",
          });
          return;
        }

        const headers = lines[0]
          .split(",")
          .map((h) => h.trim().replace(/"/g, ""));
        const rows = lines
          .slice(1, 11)
          .map((line) =>
            line.split(",").map((cell) => cell.trim().replace(/"/g, "")),
          );

        setCsvData({
          headers,
          rows,
          totalRows: lines.length - 1,
          totalColumns: headers.length,
        });

        setUploadedFile(file);
        setEnrichedData(null); // Reset enriched data when new file is uploaded

        toast({
          title: "File uploaded successfully",
          description: `Loaded ${lines.length - 1} rows with ${headers.length} columns`,
        });
      };
      reader.readAsText(file);
    },
    [toast],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Check if at least one toggle is selected
  const isAnyToggleSelected =
    companyJobOpenings ||
    companyDescription ||
    companyNewsSummary ||
    companyLinkedinUrlFinder;

  // Check if form is ready for submission
  const isFormReady =
    uploadedFile && (hideEnrichmentOptions || isAnyToggleSelected);

  const handleStartEnrichment = async () => {
    if (!csvData || !uploadedFile) {
      toast({
        title: "No file uploaded",
        description: "Please upload a CSV file first",
        variant: "destructive",
      });
      return;
    }

    if (!hideEnrichmentOptions && !isAnyToggleSelected) {
      toast({
        title: "No enrichment options selected",
        description: "Please select at least one enrichment option",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    toast({
      title: "Enrichment started",
      description: `Processing ${csvData.totalRows} companies...`,
    });

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      // Add boolean form fields for enrichment options
      formData.append("company_job_openings", companyJobOpenings.toString());
      formData.append("company_description", companyDescription.toString());
      formData.append("company_news_summary", companyNewsSummary.toString());
      formData.append(
        "company_linkedin_url_finder",
        companyLinkedinUrlFinder.toString(),
      );

      const response = await fetch("http://localhost:8000/enrich-company", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const enrichedBlob = await response.blob();
      const enrichedText = await enrichedBlob.text();
      const enrichedLines = enrichedText
        .split("\n")
        .filter((line) => line.trim());

      if (enrichedLines.length === 0) {
        throw new Error("Enriched file appears to be empty");
      }

      const enrichedHeaders = enrichedLines[0]
        .split(",")
        .map((h) => h.trim().replace(/"/g, ""));
      const enrichedRows = enrichedLines
        .slice(1, 11) // Show first 10 rows for preview
        .map((line) =>
          line.split(",").map((cell) => cell.trim().replace(/"/g, "")),
        );

      setEnrichedData({
        headers: enrichedHeaders,
        rows: enrichedRows,
        totalRows: enrichedLines.length - 1,
        totalColumns: enrichedHeaders.length,
        blob: enrichedBlob,
      });

      setIsProcessing(false);
      toast({
        title: "Enrichment completed",
        description: "Your company data has been enriched successfully!",
      });
    } catch (error: any) {
      console.error("Enrichment error:", error);
      setIsProcessing(false);
      toast({
        title: "Enrichment failed",
        description:
          error.message || "Failed to enrich data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadEnrichedCsv = () => {
    if (!enrichedData?.blob) {
      toast({
        title: "No enriched data",
        description: "Please complete enrichment first",
        variant: "destructive",
      });
      return;
    }

    const url = URL.createObjectURL(enrichedData.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `enriched_${uploadedFile?.name || "data.csv"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Your enriched CSV file is being downloaded",
    });
  };

  const resetModal = () => {
    setCsvData(null);
    setEnrichedData(null);
    setUploadedFile(null);
    setIsProcessing(false);
    setCompanyJobOpenings(false);
    setCompanyDescription(false);
    setCompanyNewsSummary(false);
    setCompanyLinkedinUrlFinder(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`max-w-6xl h-[90vh] ${isDark ? "bg-gray-900 border-gray-700" : "bg-white"} overflow-hidden`}
      >
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Import CSV File
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Data Cleaning
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Zap className="h-4 w-4" />
                Integrations
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6 overflow-auto">
              {!csvData ? (
                <Card
                  className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50"} border-2 border-dashed ${isDragOver ? "border-blue-500 bg-blue-50/50" : "border-gray-300"} transition-all duration-200`}
                >
                  <CardContent
                    className="p-12 text-center"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <div className="mb-6">
                      <div
                        className={`inline-flex p-4 rounded-2xl ${isDark ? "bg-blue-900/30" : "bg-blue-100"} mb-4`}
                      >
                        <Upload
                          className={`h-8 w-8 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                        />
                      </div>
                      <h3
                        className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        Drop your CSV file here
                      </h3>
                      <p
                        className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}
                      >
                        or click to browse and select a file
                      </p>
                    </div>

                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="csv-upload"
                      disabled={isProcessing}
                    />
                    <label htmlFor="csv-upload">
                      <Button
                        asChild
                        className="cursor-pointer"
                        disabled={isProcessing}
                      >
                        <span>
                          <FileText className="h-4 w-4 mr-2" />
                          Choose CSV File
                        </span>
                      </Button>
                    </label>

                    <div
                      className={`mt-6 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}
                    >
                      <p>Supported: CSV files up to 10MB</p>
                      <p>Maximum 100,000 records</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* File Info */}
                  <Card
                    className={
                      isDark ? "bg-gray-800 border-gray-700" : "bg-white"
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${isDark ? "bg-green-900/30" : "bg-green-100"}`}
                          >
                            <CheckCircle
                              className={`h-5 w-5 ${isDark ? "text-green-400" : "text-green-600"}`}
                            />
                          </div>
                          <div>
                            <h4
                              className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                            >
                              CSV File Loaded
                            </h4>
                            <p
                              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                            >
                              Ready for enrichment
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={resetModal}
                          className={
                            isDark
                              ? "text-gray-400 hover:text-white"
                              : "text-gray-600 hover:text-gray-900"
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Data Preview */}
                  <Card
                    className={
                      isDark ? "bg-gray-800 border-gray-700" : "bg-white"
                    }
                  >
                    <CardContent className="p-0">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4
                              className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                            >
                              {enrichedData
                                ? "Enriched Data Preview"
                                : "Data Preview"}
                            </h4>
                            <p
                              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                            >
                              Showing first 10 rows
                            </p>
                          </div>
                          {enrichedData && (
                            <Button
                              onClick={handleDownloadEnrichedCsv}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download CSV
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        {/* Fixed Header Container */}
                        <div
                          className={`sticky top-0 z-10 ${isDark ? "bg-gray-800" : "bg-white"} border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                              <thead>
                                <tr>
                                  {(enrichedData || csvData).headers.map(
                                    (header, index) => (
                                      <th
                                        key={index}
                                        className={`px-4 py-3 text-left text-sm font-semibold whitespace-nowrap min-w-[120px] max-w-[200px] ${isDark ? "text-gray-200 bg-gray-800" : "text-gray-700 bg-gray-50"} border-r ${isDark ? "border-gray-700" : "border-gray-200"} last:border-r-0`}
                                        title={header}
                                      >
                                        <div className="truncate">{header}</div>
                                      </th>
                                    ),
                                  )}
                                </tr>
                              </thead>
                            </table>
                          </div>
                        </div>

                        {/* Scrollable Body Container */}
                        <div className="overflow-auto max-h-80">
                          <table className="w-full min-w-max">
                            <tbody>
                              {(enrichedData || csvData).rows.map(
                                (row, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    className={`border-b ${isDark ? "border-gray-700 hover:bg-gray-700/30" : "border-gray-200 hover:bg-gray-50"} transition-colors`}
                                  >
                                    {row.map((cell, cellIndex) => {
                                      const cellContent = cell || "-";
                                      const isLongContent =
                                        cellContent.length > 30;

                                      return (
                                        <td
                                          key={cellIndex}
                                          className={`px-4 py-3 text-sm whitespace-nowrap min-w-[120px] max-w-[200px] ${isDark ? "text-gray-300" : "text-gray-600"} border-r ${isDark ? "border-gray-700" : "border-gray-200"} last:border-r-0`}
                                          title={
                                            isLongContent
                                              ? cellContent
                                              : undefined
                                          }
                                        >
                                          <div className="truncate">
                                            {cellContent}
                                          </div>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats */}
                  <div className="flex gap-4">
                    <Badge variant="secondary" className="px-3 py-1">
                      Rows:{" "}
                      {(enrichedData || csvData).totalRows.toLocaleString()}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      Columns: {(enrichedData || csvData).totalColumns}
                    </Badge>
                    {enrichedData && (
                      <Badge
                        variant="default"
                        className="px-3 py-1 bg-green-600"
                      >
                        Enriched
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Section */}
            <div className="space-y-6">
              {/* Enrichment Options */}
              {!hideEnrichmentOptions && (
                <Card
                  className={
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white"
                  }
                >
                  <CardContent className="p-6">
                    <h4
                      className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Enrichment Options
                    </h4>

                    <div className="space-y-4">
                      {/* Company Job Openings */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <label
                            htmlFor="company-job-openings"
                            className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} cursor-pointer`}
                          >
                            Company Job Openings
                          </label>
                          <p
                            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"} mt-1`}
                          >
                            Hiring status, job titles, and careers URL
                          </p>
                        </div>
                        <Switch
                          id="company-job-openings"
                          checked={companyJobOpenings}
                          onCheckedChange={setCompanyJobOpenings}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Company Description */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <label
                            htmlFor="company-description"
                            className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} cursor-pointer`}
                          >
                            Company Description Summary
                          </label>
                          <p
                            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"} mt-1`}
                          >
                            Business description and summary
                          </p>
                        </div>
                        <Switch
                          id="company-description"
                          checked={companyDescription}
                          onCheckedChange={setCompanyDescription}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Company News Summary */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <label
                            htmlFor="company-news-summary"
                            className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} cursor-pointer`}
                          >
                            Company News Summary
                          </label>
                          <p
                            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"} mt-1`}
                          >
                            Latest news and updates
                          </p>
                        </div>
                        <Switch
                          id="company-news-summary"
                          checked={companyNewsSummary}
                          onCheckedChange={setCompanyNewsSummary}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Company LinkedIn URL Finder */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <label
                            htmlFor="company-linkedin-url"
                            className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} cursor-pointer`}
                          >
                            Company LinkedIn URL Finder
                          </label>
                          <p
                            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"} mt-1`}
                          >
                            Find LinkedIn company profiles
                          </p>
                        </div>
                        <Switch
                          id="company-linkedin-url"
                          checked={companyLinkedinUrlFinder}
                          onCheckedChange={setCompanyLinkedinUrlFinder}
                          disabled={isProcessing}
                        />
                      </div>
                    </div>

                    {!isAnyToggleSelected && uploadedFile && (
                      <div
                        className={`mt-4 p-3 rounded-lg ${isDark ? "bg-yellow-900/20" : "bg-yellow-50"}`}
                      >
                        <p
                          className={`text-sm ${isDark ? "text-yellow-300" : "text-yellow-700"}`}
                        >
                          Please select at least one enrichment option to
                          continue.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Enrichment Process */}
              <Card
                className={isDark ? "bg-gray-800 border-gray-700" : "bg-white"}
              >
                <CardContent className="p-6">
                  <h4
                    className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Enrichment Process
                  </h4>

                  {csvData ? (
                    <div className="space-y-4">
                      {enrichedData ? (
                        <div
                          className={`p-4 rounded-lg ${isDark ? "bg-green-900/20" : "bg-green-50"}`}
                        >
                          <h5
                            className={`font-medium mb-2 ${isDark ? "text-green-400" : "text-green-700"}`}
                          >
                            Enrichment Complete
                          </h5>
                          <p
                            className={`text-sm ${isDark ? "text-green-300" : "text-green-600"}`}
                          >
                            {enrichedData.totalRows.toLocaleString()} companies
                            have been enriched with comprehensive business data.
                          </p>
                        </div>
                      ) : (
                        <div
                          className={`p-4 rounded-lg ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}
                        >
                          <h5
                            className={`font-medium mb-2 ${isDark ? "text-blue-400" : "text-blue-700"}`}
                          >
                            Ready to Process
                          </h5>
                          <p
                            className={`text-sm ${isDark ? "text-blue-300" : "text-blue-600"}`}
                          >
                            {csvData.totalRows.toLocaleString()} companies will
                            be enriched with selected data options.
                          </p>
                        </div>
                      )}

                      {!enrichedData ? (
                        <Button
                          onClick={handleStartEnrichment}
                          disabled={isProcessing || !isFormReady}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                          size="lg"
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start Enrichment
                            </>
                          )}
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Button
                            onClick={handleDownloadEnrichedCsv}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            size="lg"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Enriched CSV
                          </Button>
                          <Button
                            onClick={resetModal}
                            variant="outline"
                            className="w-full"
                            size="lg"
                          >
                            Process New File
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`p-4 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"} text-center`}
                    >
                      <p
                        className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Upload a CSV file to begin the enrichment process
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Process Info */}
              <Card
                className={isDark ? "bg-gray-800 border-gray-700" : "bg-white"}
              >
                <CardContent className="p-6">
                  <h4
                    className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    What You'll Get
                  </h4>
                  <div className="space-y-3 text-sm">
                    {[
                      "Company industry & description",
                      "Revenue & employee estimates",
                      "Contact information",
                      "Social media profiles",
                      "Technology stack",
                      "Funding information",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle
                          className={`h-4 w-4 ${isDark ? "text-green-400" : "text-green-600"}`}
                        />
                        <span
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CsvImportModal;
