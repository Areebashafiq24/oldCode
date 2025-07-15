import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  MapPin,
  Copy,
  Download,
  Search,
  Linkedin,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PersonData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  education: string;
  experience: string;
  skills: string[];
  avatar: string;
}

const mockPersonData: PersonData = {
  name: "Sarah Johnson",
  title: "VP of Marketing",
  company: "TechCorp Solutions",
  email: "sarah.johnson@techcorp.com",
  phone: "+1 (555) 123-4567",
  linkedin: "https://linkedin.com/in/sarahjohnson",
  location: "San Francisco, CA",
  education: "MBA, Stanford University",
  experience: "8+ years in B2B Marketing",
  skills: [
    "Digital Marketing",
    "Lead Generation",
    "Marketing Automation",
    "SaaS",
    "Growth Strategy",
  ],
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
};

export default function PersonEnrichment() {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [personData, setPersonData] = useState<PersonData | null>(null);
  const { toast } = useToast();

  const handleEnrich = async () => {
    if (!fullName.trim() && !linkedinUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a full name or LinkedIn URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPersonData(mockPersonData);
      setLoading(false);
      toast({
        title: "Success",
        description: "Person data enriched successfully",
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
    if (personData) {
      const dataStr = JSON.stringify(personData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${personData.name.replace(/\s+/g, "_")}_enriched_data.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Person Enrichment
          </h1>
          <p className="text-gray-600">
            Enter person details to get comprehensive professional information
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Person Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="company">Company (Optional)</Label>
                <Input
                  id="company"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn URL (Alternative)</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/johndoe"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="mt-1"
              />
            </div>
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
              {loading ? "Enriching..." : "Enrich Person"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {personData && (
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

            {/* Person Profile */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={personData.avatar}
                      alt={personData.name}
                    />
                    <AvatarFallback>
                      {personData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">
                        {personData.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(personData.name)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-600">
                      {personData.title} at {personData.company}
                    </p>
                    <p className="text-sm text-gray-500">
                      {personData.location}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span>Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${personData.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {personData.email}
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(personData.email)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span>Phone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${personData.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {personData.phone}
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(personData.phone)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-500" />
                    <span>LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={personData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Profile
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(personData.linkedin)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{personData.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="font-medium">{personData.education}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <p className="font-medium">{personData.experience}</p>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {personData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
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
