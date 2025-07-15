import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Building2,
  Users,
  DollarSign,
  MapPin,
  Globe,
  Copy,
  Download,
  Search,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/App";

interface CompanyData {
  name: string;
  domain: string;
  description: string;
  industry: string;
  revenue: string;
  employees: string;
  location: string;
  founded: string;
  website: string;
  linkedin: string;
  technologies: string[];
}

const mockCompanyData: CompanyData = {
  name: "TechCorp Solutions",
  domain: "techcorp.com",
  description:
    "Leading provider of enterprise software solutions for digital transformation and cloud infrastructure.",
  industry: "Software & Technology",
  revenue: "$50M - $100M",
  employees: "200-500",
  location: "San Francisco, CA",
  founded: "2015",
  website: "https://techcorp.com",
  linkedin: "https://linkedin.com/company/techcorp",
  technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
};

export default function CompanyEnrichment() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const { toast } = useToast();
  const { isDark } = useTheme();

  const handleEnrich = async () => {
    if (!domain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a company domain",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCompanyData(mockCompanyData);
      setLoading(false);
      toast({
        title: "Success",
        description: "Company data enriched successfully",
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

  const exportData = () => {
    if (companyData) {
      const dataStr = JSON.stringify(companyData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${companyData.name.replace(/\s+/g, "_")}_enriched_data.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "leadmagic-gradient" : "leadmagic-gradient-light"} p-6`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Company Enrichment
          </h1>
          <p className="text-gray-600">
            Enter a company domain to get comprehensive business intelligence
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Domain
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleEnrich}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <LoadingSpinner className="h-4 w-4 mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  {loading ? "Enriching..." : "Enrich"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {companyData && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Enrichment Results
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={exportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Company Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{companyData.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(companyData.name)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{companyData.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Industry</p>
                      <p className="font-medium">{companyData.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Revenue</p>
                      <p className="font-medium">{companyData.revenue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Employees</p>
                      <p className="font-medium">{companyData.employees}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{companyData.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span>Website</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={companyData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {companyData.website}
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(companyData.website)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-500" />
                    <span>LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={companyData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Profile
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(companyData.linkedin)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {companyData.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
