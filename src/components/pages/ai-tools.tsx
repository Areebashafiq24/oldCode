import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Brain, Target, Mail, Building2, Copy, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AIToolResult {
  input: string;
  output: string;
  timestamp: Date;
}

export default function AITools() {
  const [activeTab, setActiveTab] = useState("icp-fit");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, AIToolResult | null>>({
    "icp-fit": null,
    "pain-points": null,
    "cold-email": null,
    "company-cleanup": null,
  });
  const { toast } = useToast();

  const [inputs, setInputs] = useState({
    "icp-fit": "",
    "pain-points": "",
    "cold-email": "",
    "company-cleanup": "",
  });

  const mockResults = {
    "icp-fit":
      "Based on the company profile, this is a strong ICP fit (85% match). The company operates in the B2B SaaS space with 200-500 employees, which aligns perfectly with your target market. Key indicators: recent funding round, growing team, and technology stack that suggests need for your solution.",
    "pain-points":
      "Key pain points identified:\n\n1. **Scalability Challenges**: Rapid growth is straining current infrastructure\n2. **Data Integration**: Multiple disconnected systems causing inefficiencies\n3. **Customer Onboarding**: Manual processes leading to longer time-to-value\n4. **Reporting & Analytics**: Lack of unified dashboard for decision making\n5. **Security Compliance**: Need for enhanced security measures for enterprise clients",
    "cold-email":
      "Subject: Quick question about [Company]'s recent expansion\n\nHi [Name],\n\nI noticed [Company] recently announced your Series B funding - congratulations! Your focus on enterprise clients caught my attention.\n\nI work with similar B2B SaaS companies who've faced scaling challenges around data integration and customer onboarding. We've helped companies like [Similar Company] reduce onboarding time by 40% while improving security compliance.\n\nWould you be open to a brief 15-minute conversation about how [Company] is handling these growth challenges?\n\nBest regards,\n[Your Name]",
    "company-cleanup":
      "Cleaned company names:\n\n• TechCorp Solutions Inc. → TechCorp Solutions\n• ABC Company LLC → ABC Company\n• XYZ Corp. → XYZ Corp\n• StartupName, Inc → StartupName\n• Business Solutions Ltd. → Business Solutions",
  };

  const handleGenerate = async (toolType: string) => {
    const input = inputs[toolType as keyof typeof inputs];
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some input text",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const result: AIToolResult = {
        input,
        output: mockResults[toolType as keyof typeof mockResults],
        timestamp: new Date(),
      };
      setResults((prev) => ({ ...prev, [toolType]: result }));
      setLoading(false);
      toast({
        title: "Success",
        description: "AI analysis completed",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  const updateInput = (toolType: string, value: string) => {
    setInputs((prev) => ({ ...prev, [toolType]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Tools</h1>
          <p className="text-gray-600">
            Leverage AI to analyze prospects and generate personalized outreach
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="icp-fit" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              ICP Fit
            </TabsTrigger>
            <TabsTrigger
              value="pain-points"
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Pain Points
            </TabsTrigger>
            <TabsTrigger value="cold-email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Cold Email
            </TabsTrigger>
            <TabsTrigger
              value="company-cleanup"
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              Name Cleanup
            </TabsTrigger>
          </TabsList>

          {/* ICP Fit Check */}
          <TabsContent value="icp-fit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  ICP Fit Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="icp-input">Company Information</Label>
                  <Textarea
                    id="icp-input"
                    placeholder="Paste company description, website content, or any relevant information..."
                    value={inputs["icp-fit"]}
                    onChange={(e) => updateInput("icp-fit", e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={() => handleGenerate("icp-fit")}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <LoadingSpinner className="h-4 w-4 mr-2" />
                  ) : (
                    <Wand2 className="h-4 w-4 mr-2" />
                  )}
                  {loading ? "Analyzing..." : "Analyze ICP Fit"}
                </Button>
              </CardContent>
            </Card>

            {results["icp-fit"] && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Analysis Result</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(results["icp-fit"]!.output)
                      }
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">
                      {results["icp-fit"]!.output}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Pain Point Extraction */}
          <TabsContent value="pain-points" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Pain Point Extraction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pain-input">
                    Company/Industry Information
                  </Label>
                  <Textarea
                    id="pain-input"
                    placeholder="Enter company information, industry details, or recent news to identify potential pain points..."
                    value={inputs["pain-points"]}
                    onChange={(e) => updateInput("pain-points", e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={() => handleGenerate("pain-points")}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? (
                    <LoadingSpinner className="h-4 w-4 mr-2" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  {loading ? "Extracting..." : "Extract Pain Points"}
                </Button>
              </CardContent>
            </Card>

            {results["pain-points"] && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Identified Pain Points</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(results["pain-points"]!.output)
                      }
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">
                      {results["pain-points"]!.output}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Cold Email Generator */}
          <TabsContent value="cold-email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-500" />
                  Cold Email Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email-input">Prospect Information</Label>
                  <Textarea
                    id="email-input"
                    placeholder="Enter prospect name, company, role, recent news, or any relevant context for personalization..."
                    value={inputs["cold-email"]}
                    onChange={(e) => updateInput("cold-email", e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={() => handleGenerate("cold-email")}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <LoadingSpinner className="h-4 w-4 mr-2" />
                  ) : (
                    <Mail className="h-4 w-4 mr-2" />
                  )}
                  {loading ? "Generating..." : "Generate Email"}
                </Button>
              </CardContent>
            </Card>

            {results["cold-email"] && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Generated Email</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(results["cold-email"]!.output)
                      }
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap font-mono text-sm">
                      {results["cold-email"]!.output}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Company Name Cleanup */}
          <TabsContent value="company-cleanup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-orange-500" />
                  Company Name Cleanup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cleanup-input">Company Names</Label>
                  <Textarea
                    id="cleanup-input"
                    placeholder="Enter company names (one per line) to clean up legal suffixes and standardize formatting...\n\nExample:\nTechCorp Solutions Inc.\nABC Company LLC\nXYZ Corp."
                    value={inputs["company-cleanup"]}
                    onChange={(e) =>
                      updateInput("company-cleanup", e.target.value)
                    }
                    className="mt-1 min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={() => handleGenerate("company-cleanup")}
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {loading ? (
                    <LoadingSpinner className="h-4 w-4 mr-2" />
                  ) : (
                    <Building2 className="h-4 w-4 mr-2" />
                  )}
                  {loading ? "Cleaning..." : "Clean Names"}
                </Button>
              </CardContent>
            </Card>

            {results["company-cleanup"] && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Cleaned Names</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(results["company-cleanup"]!.output)
                      }
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap font-mono text-sm">
                      {results["company-cleanup"]!.output}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
