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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  apiEndpoint?: string;
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
  apiEndpoint = "/enrich-company",
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

  // ICP Fit Check questions state
  const [icpAnswers, setIcpAnswers] = useState({
    targetIndustries: "",
    companySizes: "",
    targetGeography: "",
    requiredTechnologies: "",
    exclusionCriteria: "",
    perfectMatchKeywords: "",
  });

  // Custom Sales Email questions state
  const [salesEmailAnswers, setSalesEmailAnswers] = useState({
    companyDescription: "",
    whatYouSell: "",
    whoYouSellTo: "",
    whereYouSell: "",
    companiesNotToSellTo: "",
    uniqueValueProposition: "",
  });

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

        // Proper CSV parsing function
        const parseCSV = (csvText: string) => {
          const result = [];
          let current = "";
          let inQuotes = false;
          let row = [];

          for (let i = 0; i < csvText.length; i++) {
            const char = csvText[i];
            const nextChar = csvText[i + 1];

            if (char === '"') {
              if (inQuotes && nextChar === '"') {
                // Escaped quote
                current += '"';
                i++; // Skip next quote
              } else {
                // Toggle quote state
                inQuotes = !inQuotes;
              }
            } else if (char === "," && !inQuotes) {
              // End of field
              row.push(current.trim());
              current = "";
            } else if ((char === "\n" || char === "\r") && !inQuotes) {
              // End of row
              if (current.trim() || row.length > 0) {
                row.push(current.trim());
                if (row.some((cell) => cell.length > 0)) {
                  result.push(row);
                }
                row = [];
                current = "";
              }
              // Skip \r\n combinations
              if (char === "\r" && nextChar === "\n") {
                i++;
              }
            } else {
              current += char;
            }
          }

          // Handle last field/row
          if (current.trim() || row.length > 0) {
            row.push(current.trim());
            if (row.some((cell) => cell.length > 0)) {
              result.push(row);
            }
          }

          return result;
        };

        const parsedData = parseCSV(text);

        if (parsedData.length === 0) {
          toast({
            title: "Empty file",
            description: "The CSV file appears to be empty",
            variant: "destructive",
          });
          return;
        }

        const headers = parsedData[0];
        const rows = parsedData.slice(1, 11); // Show first 10 rows

        setCsvData({
          headers,
          rows,
          totalRows: parsedData.length - 1,
          totalColumns: headers.length,
        });

        setUploadedFile(file);
        setEnrichedData(null); // Reset enriched data when new file is uploaded

        toast({
          title: "File uploaded successfully",
          description: `Loaded ${parsedData.length - 1} rows with ${headers.length} columns`,
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

  // Check if ICP questions are answered (for ICP Fit Check)
  const areIcpQuestionsAnswered =
    apiEndpoint === "/icp-fit-check"
      ? Object.values(icpAnswers).every((answer) => answer.trim() !== "")
      : true;

  // Check if Custom Sales Email questions are answered
  const areSalesEmailQuestionsAnswered =
    apiEndpoint === "/api/custom-sales-email"
      ? Object.values(salesEmailAnswers).every((answer) => answer.trim() !== "")
      : true;

  // Check if form is ready for submission
  const isFormReady =
    uploadedFile &&
    (hideEnrichmentOptions || isAnyToggleSelected) &&
    areIcpQuestionsAnswered &&
    areSalesEmailQuestionsAnswered;

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

      // Add ICP answers if this is ICP Fit Check
      if (apiEndpoint === "/icp-fit-check") {
        formData.append("target_industries", icpAnswers.targetIndustries);
        formData.append("company_sizes", icpAnswers.companySizes);
        formData.append("target_geography", icpAnswers.targetGeography);
        formData.append(
          "required_technologies",
          icpAnswers.requiredTechnologies,
        );
        formData.append("exclusion_criteria", icpAnswers.exclusionCriteria);
        formData.append(
          "perfect_match_keywords",
          icpAnswers.perfectMatchKeywords,
        );
      }

      // Add Custom Sales Email answers if this is Custom Sales Email
      if (apiEndpoint === "/api/custom-sales-email") {
        formData.append(
          "company_description",
          salesEmailAnswers.companyDescription,
        );
        formData.append("what_you_sell", salesEmailAnswers.whatYouSell);
        formData.append("who_you_sell_to", salesEmailAnswers.whoYouSellTo);
        formData.append("where_you_sell", salesEmailAnswers.whereYouSell);
        formData.append(
          "companies_not_to_sell_to",
          salesEmailAnswers.companiesNotToSellTo,
        );
        formData.append(
          "unique_value_proposition",
          salesEmailAnswers.uniqueValueProposition,
        );
      }

      const response = await fetch(`http://localhost:8000${apiEndpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const enrichedBlob = await response.blob();
      const enrichedText = await enrichedBlob.text();

      // Use the same CSV parsing function for enriched data
      const parseCSV = (csvText: string) => {
        const result = [];
        let current = "";
        let inQuotes = false;
        let row = [];

        for (let i = 0; i < csvText.length; i++) {
          const char = csvText[i];
          const nextChar = csvText[i + 1];

          if (char === '"') {
            if (inQuotes && nextChar === '"') {
              // Escaped quote
              current += '"';
              i++; // Skip next quote
            } else {
              // Toggle quote state
              inQuotes = !inQuotes;
            }
          } else if (char === "," && !inQuotes) {
            // End of field
            row.push(current.trim());
            current = "";
          } else if ((char === "\n" || char === "\r") && !inQuotes) {
            // End of row
            if (current.trim() || row.length > 0) {
              row.push(current.trim());
              if (row.some((cell) => cell.length > 0)) {
                result.push(row);
              }
              row = [];
              current = "";
            }
            // Skip \r\n combinations
            if (char === "\r" && nextChar === "\n") {
              i++;
            }
          } else {
            current += char;
          }
        }

        // Handle last field/row
        if (current.trim() || row.length > 0) {
          row.push(current.trim());
          if (row.some((cell) => cell.length > 0)) {
            result.push(row);
          }
        }

        return result;
      };

      const enrichedParsedData = parseCSV(enrichedText);

      if (enrichedParsedData.length === 0) {
        throw new Error("Enriched file appears to be empty");
      }

      const enrichedHeaders = enrichedParsedData[0];
      const enrichedRows = enrichedParsedData.slice(1, 11); // Show first 10 rows for preview

      setEnrichedData({
        headers: enrichedHeaders,
        rows: enrichedRows,
        totalRows: enrichedParsedData.length - 1,
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
    setIcpAnswers({
      targetIndustries: "",
      companySizes: "",
      targetGeography: "",
      requiredTechnologies: "",
      exclusionCriteria: "",
      perfectMatchKeywords: "",
    });
    setSalesEmailAnswers({
      companyDescription: "",
      whatYouSell: "",
      whoYouSellTo: "",
      whereYouSell: "",
      companiesNotToSellTo: "",
      uniqueValueProposition: "",
    });
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
                        {/* Enhanced Data Table with Better Formatting */}
                        <div className="overflow-auto max-h-96 border rounded-lg">
                          <table
                            className={`w-full table-auto ${isDark ? "bg-gray-800" : "bg-white"}`}
                          >
                            <thead
                              className={`sticky top-0 z-10 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
                            >
                              <tr>
                                {(enrichedData || csvData).headers.map(
                                  (header, index) => (
                                    <th
                                      key={index}
                                      className={`px-4 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-200" : "text-gray-700"} border-b-2 ${isDark ? "border-gray-600" : "border-gray-300"} border-r ${isDark ? "border-gray-600" : "border-gray-300"} last:border-r-0 min-w-[150px]`}
                                      style={{
                                        minWidth: "150px",
                                        maxWidth: "none",
                                      }}
                                    >
                                      <div className="font-medium leading-tight">
                                        {header}
                                      </div>
                                    </th>
                                  ),
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {(enrichedData || csvData).rows.map(
                                (row, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    className={`${isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50"} transition-colors ${rowIndex % 2 === 0 ? (isDark ? "bg-gray-800/50" : "bg-gray-50/30") : ""}`}
                                  >
                                    {row.map((cell, cellIndex) => {
                                      const cellContent = cell || "-";
                                      const headerName =
                                        (enrichedData || csvData).headers[
                                          cellIndex
                                        ]?.toLowerCase() || "";
                                      const isEmailBody =
                                        headerName.includes("email") ||
                                        headerName.includes("body") ||
                                        headerName.includes("message") ||
                                        headerName.includes("content") ||
                                        headerName.includes("description") ||
                                        headerName.includes("summary");
                                      const isLongContent =
                                        cellContent.length > 100;
                                      const hasMultipleLines =
                                        cellContent.includes("\n") ||
                                        cellContent.includes("\r");
                                      const shouldUseScrollableCell =
                                        isEmailBody ||
                                        isLongContent ||
                                        hasMultipleLines;

                                      return (
                                        <td
                                          key={cellIndex}
                                          className={`px-3 py-3 text-sm align-top ${isDark ? "text-gray-300" : "text-gray-700"} border-b ${isDark ? "border-gray-700" : "border-gray-200"} border-r ${isDark ? "border-gray-700" : "border-gray-200"} last:border-r-0 relative`}
                                          style={{
                                            minWidth: "120px",
                                            maxWidth: shouldUseScrollableCell
                                              ? "350px"
                                              : "250px",
                                            width: shouldUseScrollableCell
                                              ? "350px"
                                              : "auto",
                                          }}
                                        >
                                          <div
                                            className={`leading-relaxed ${
                                              shouldUseScrollableCell
                                                ? "max-h-24 overflow-y-auto whitespace-pre-wrap break-words pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                                                : "whitespace-normal break-words"
                                            }`}
                                            style={{
                                              wordWrap: "break-word",
                                              overflowWrap: "break-word",
                                              hyphens: "auto",
                                              fontSize: shouldUseScrollableCell
                                                ? "0.8rem"
                                                : "0.875rem",
                                              lineHeight:
                                                shouldUseScrollableCell
                                                  ? "1.3"
                                                  : "1.5",
                                            }}
                                            title={
                                              cellContent.length > 50
                                                ? cellContent
                                                : undefined
                                            }
                                          >
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
            <div className="space-y-6 overflow-auto">
              {/* ICP Questions Section - Only show for ICP Fit Check */}
              {apiEndpoint === "/icp-fit-check" && csvData && (
                <Card
                  className={
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white"
                  }
                >
                  <CardContent className="p-6">
                    <h4
                      className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      ICP Fit Questions
                    </h4>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}
                    >
                      Please answer these questions to help us analyze your
                      prospects against your Ideal Customer Profile.
                    </p>

                    <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                      {/* Question 1: Target Industries */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="target-industries"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          What are your target industries (e.g., SaaS,
                          logistics, finance)?
                        </Label>
                        <Textarea
                          id="target-industries"
                          placeholder="Enter your target industries..."
                          value={icpAnswers.targetIndustries}
                          onChange={(e) =>
                            setIcpAnswers((prev) => ({
                              ...prev,
                              targetIndustries: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 2: Company Sizes */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="company-sizes"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          What company sizes do you sell to (SMB, mid-market,
                          enterprise)?
                        </Label>
                        <Textarea
                          id="company-sizes"
                          placeholder="Enter your target company sizes..."
                          value={icpAnswers.companySizes}
                          onChange={(e) =>
                            setIcpAnswers((prev) => ({
                              ...prev,
                              companySizes: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 3: Target Geography */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="target-geography"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          What is your target geography or region?
                        </Label>
                        <Textarea
                          id="target-geography"
                          placeholder="Enter your target geography or region..."
                          value={icpAnswers.targetGeography}
                          onChange={(e) =>
                            setIcpAnswers((prev) => ({
                              ...prev,
                              targetGeography: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 4: Required Technologies */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="required-technologies"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          What technologies, solutions, or offerings should
                          prospects have to be a good fit?
                        </Label>
                        <Textarea
                          id="required-technologies"
                          placeholder="Enter required technologies or solutions..."
                          value={icpAnswers.requiredTechnologies}
                          onChange={(e) =>
                            setIcpAnswers((prev) => ({
                              ...prev,
                              requiredTechnologies: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 5: Exclusion Criteria */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="exclusion-criteria"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Are there any exclusion criteria (industries, company
                          types, or geographies you do NOT sell to)?
                        </Label>
                        <Textarea
                          id="exclusion-criteria"
                          placeholder="Enter exclusion criteria..."
                          value={icpAnswers.exclusionCriteria}
                          onChange={(e) =>
                            setIcpAnswers((prev) => ({
                              ...prev,
                              exclusionCriteria: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 6: Perfect Match Keywords */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="perfect-match-keywords"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Are there any specific keywords or traits that
                          indicate a perfect match?
                        </Label>
                        <Textarea
                          id="perfect-match-keywords"
                          placeholder="Enter keywords or traits that indicate a perfect match..."
                          value={icpAnswers.perfectMatchKeywords}
                          onChange={(e) =>
                            setIcpAnswers((prev) => ({
                              ...prev,
                              perfectMatchKeywords: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>
                    </div>

                    {!areIcpQuestionsAnswered && csvData && (
                      <div
                        className={`mt-6 p-3 rounded-lg ${isDark ? "bg-yellow-900/20" : "bg-yellow-50"}`}
                      >
                        <p
                          className={`text-sm ${isDark ? "text-yellow-300" : "text-yellow-700"}`}
                        >
                          Please answer all questions to continue with the ICP
                          fit analysis.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Custom Sales Email Questions Section - Only show for Custom Sales Email */}
              {apiEndpoint === "/api/custom-sales-email" && csvData && (
                <Card
                  className={
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white"
                  }
                >
                  <CardContent className="p-6">
                    <h4
                      className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Sales Email Questions
                    </h4>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}
                    >
                      Please answer these questions to help us create
                      personalized sales emails based on your company profile.
                    </p>

                    <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                      {/* Question 1: What does your company do */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="company-description"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          What does your company do (SaaS, services, products)?
                        </Label>
                        <Textarea
                          id="company-description"
                          placeholder="Describe what your company does..."
                          value={salesEmailAnswers.companyDescription}
                          onChange={(e) =>
                            setSalesEmailAnswers((prev) => ({
                              ...prev,
                              companyDescription: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 2: What do you sell specifically */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="what-you-sell"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          What do you sell specifically?
                        </Label>
                        <Textarea
                          id="what-you-sell"
                          placeholder="Describe what you sell specifically..."
                          value={salesEmailAnswers.whatYouSell}
                          onChange={(e) =>
                            setSalesEmailAnswers((prev) => ({
                              ...prev,
                              whatYouSell: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 3: Who do you sell to */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="who-you-sell-to"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Who do you sell to (industries, job titles, company
                          sizes)?
                        </Label>
                        <Textarea
                          id="who-you-sell-to"
                          placeholder="Describe your target customers..."
                          value={salesEmailAnswers.whoYouSellTo}
                          onChange={(e) =>
                            setSalesEmailAnswers((prev) => ({
                              ...prev,
                              whoYouSellTo: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 4: Where do you sell */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="where-you-sell"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Where do you sell (geography, if applicable)?
                        </Label>
                        <Textarea
                          id="where-you-sell"
                          placeholder="Enter your target geography or regions..."
                          value={salesEmailAnswers.whereYouSell}
                          onChange={(e) =>
                            setSalesEmailAnswers((prev) => ({
                              ...prev,
                              whereYouSell: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 5: Companies you do NOT sell to */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="companies-not-to-sell-to"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Are there any companies you absolutely do NOT sell to?
                        </Label>
                        <Textarea
                          id="companies-not-to-sell-to"
                          placeholder="Enter companies or types you don't sell to..."
                          value={salesEmailAnswers.companiesNotToSellTo}
                          onChange={(e) =>
                            setSalesEmailAnswers((prev) => ({
                              ...prev,
                              companiesNotToSellTo: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>

                      {/* Question 6: Unique value proposition */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="unique-value-proposition"
                          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          What is your unique value proposition for solving
                          client pain points?
                        </Label>
                        <Textarea
                          id="unique-value-proposition"
                          placeholder="Describe your unique value proposition..."
                          value={salesEmailAnswers.uniqueValueProposition}
                          onChange={(e) =>
                            setSalesEmailAnswers((prev) => ({
                              ...prev,
                              uniqueValueProposition: e.target.value,
                            }))
                          }
                          className={`min-h-[80px] ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                          disabled={isProcessing}
                        />
                      </div>
                    </div>

                    {!areSalesEmailQuestionsAnswered && csvData && (
                      <div
                        className={`mt-6 p-3 rounded-lg ${isDark ? "bg-yellow-900/20" : "bg-yellow-50"}`}
                      >
                        <p
                          className={`text-sm ${isDark ? "text-yellow-300" : "text-yellow-700"}`}
                        >
                          Please answer all questions to continue with the
                          custom sales email generation.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
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
