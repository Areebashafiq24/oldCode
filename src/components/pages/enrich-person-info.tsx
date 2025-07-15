import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  User,
  Mail,
  Phone,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Copy,
  Linkedin,
  Building2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface EnrichmentResult {
  type: "email" | "phone" | "verification" | "linkedin";
  result: string;
  status: "success" | "failed" | "risky";
  source?: string;
}

export default function EnrichPersonInfo() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<
    Record<string, EnrichmentResult | null>
  >({
    email: null,
    phone: null,
    verification: null,
    linkedin: null,
  });
  const { toast } = useToast();

  // Form states
  const [emailForm, setEmailForm] = useState({ fullName: "", company: "" });
  const [phoneForm, setPhoneForm] = useState({ linkedinUrl: "" });
  const [verificationForm, setVerificationForm] = useState({ email: "" });
  const [linkedinForm, setLinkedinForm] = useState({
    fullName: "",
    company: "",
  });

  const mockResults = {
    email: {
      type: "email" as const,
      result: "john.doe@techcorp.com",
      status: "success" as const,
      source: "Leadmagic",
    },
    phone: {
      type: "phone" as const,
      result: "+1 (555) 123-4567",
      status: "success" as const,
      source: "Findymail",
    },
    verification: {
      type: "verification" as const,
      result: "Valid",
      status: "success" as const,
      source: "MillionVerifier",
    },
    linkedin: {
      type: "linkedin" as const,
      result: "https://linkedin.com/in/johndoe",
      status: "success" as const,
      source: "Serper.dev + GPT-4",
    },
  };

  const handleEnrichment = async (type: string, formData: any) => {
    if (!validateForm(type, formData)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading((prev) => ({ ...prev, [type]: true }));

    // Simulate API call
    setTimeout(() => {
      const result = mockResults[type as keyof typeof mockResults];
      setResults((prev) => ({ ...prev, [type]: result }));
      setLoading((prev) => ({ ...prev, [type]: false }));

      toast({
        title: "Success",
        description: `${getTypeLabel(type)} found successfully`,
      });
    }, 2000);
  };

  const validateForm = (type: string, formData: any) => {
    switch (type) {
      case "email":
        return formData.fullName.trim() && formData.company.trim();
      case "phone":
        return formData.linkedinUrl.trim();
      case "verification":
        return formData.email.trim() && formData.email.includes("@");
      case "linkedin":
        return formData.fullName.trim() && formData.company.trim();
      default:
        return false;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "email":
        return "Work Email";
      case "phone":
        return "Mobile Phone";
      case "verification":
        return "Email Verification";
      case "linkedin":
        return "LinkedIn URL";
      default:
        return "Result";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "risky":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "risky":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Enrich Person Info
          </h1>
          <p className="text-gray-600">
            Use different tools to find work email, mobile number, verify email,
            or fetch LinkedIn URL based on input data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Person Work Email */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                Person Work Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email-fullname">Full Name</Label>
                  <Input
                    id="email-fullname"
                    placeholder="John Doe"
                    value={emailForm.fullName}
                    onChange={(e) =>
                      setEmailForm((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email-company">Company/Domain</Label>
                  <Input
                    id="email-company"
                    placeholder="techcorp.com"
                    value={emailForm.company}
                    onChange={(e) =>
                      setEmailForm((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                onClick={() => handleEnrichment("email", emailForm)}
                disabled={loading.email}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading.email ? (
                  <LoadingSpinner className="h-4 w-4 mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                {loading.email ? "Finding..." : "Find Email"}
              </Button>

              {results.email && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(results.email.status)}
                      <Badge className={getStatusColor(results.email.status)}>
                        {results.email.status}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(results.email.result)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-medium text-gray-900">
                    {results.email.result}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Source: {results.email.source}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Person Mobile Phone */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-500" />
                Person Mobile Phone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone-linkedin">LinkedIn URL</Label>
                <Input
                  id="phone-linkedin"
                  placeholder="https://linkedin.com/in/johndoe"
                  value={phoneForm.linkedinUrl}
                  onChange={(e) =>
                    setPhoneForm((prev) => ({
                      ...prev,
                      linkedinUrl: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <Button
                onClick={() => handleEnrichment("phone", phoneForm)}
                disabled={loading.phone}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading.phone ? (
                  <LoadingSpinner className="h-4 w-4 mr-2" />
                ) : (
                  <Phone className="h-4 w-4 mr-2" />
                )}
                {loading.phone ? "Finding..." : "Find Mobile"}
              </Button>

              {results.phone && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(results.phone.status)}
                      <Badge className={getStatusColor(results.phone.status)}>
                        {results.phone.status}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(results.phone.result)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-medium text-gray-900">
                    {results.phone.result}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Source: {results.phone.source}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Verification */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-500" />
                Email Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="verify-email">Email Address</Label>
                <Input
                  id="verify-email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={verificationForm.email}
                  onChange={(e) =>
                    setVerificationForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <Button
                onClick={() =>
                  handleEnrichment("verification", verificationForm)
                }
                disabled={loading.verification}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {loading.verification ? (
                  <LoadingSpinner className="h-4 w-4 mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                {loading.verification ? "Verifying..." : "Verify Email"}
              </Button>

              {results.verification && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(results.verification.status)}
                      <Badge
                        className={getStatusColor(results.verification.status)}
                      >
                        {results.verification.result}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Source: {results.verification.source}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Person LinkedIn URL */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-orange-500" />
                Person LinkedIn URL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin-fullname">Full Name</Label>
                  <Input
                    id="linkedin-fullname"
                    placeholder="John Doe"
                    value={linkedinForm.fullName}
                    onChange={(e) =>
                      setLinkedinForm((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin-company">Company</Label>
                  <Input
                    id="linkedin-company"
                    placeholder="TechCorp"
                    value={linkedinForm.company}
                    onChange={(e) =>
                      setLinkedinForm((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                onClick={() => handleEnrichment("linkedin", linkedinForm)}
                disabled={loading.linkedin}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {loading.linkedin ? (
                  <LoadingSpinner className="h-4 w-4 mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                {loading.linkedin ? "Finding..." : "Find LinkedIn"}
              </Button>

              {results.linkedin && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(results.linkedin.status)}
                      <Badge
                        className={getStatusColor(results.linkedin.status)}
                      >
                        {results.linkedin.status}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(results.linkedin.result)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <a
                    href={results.linkedin.result}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {results.linkedin.result}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Source: {results.linkedin.source}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
