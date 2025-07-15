import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  User,
  Brain,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Download,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ActivityItem {
  id: string;
  type: "company" | "person" | "ai-tool";
  title: string;
  subtitle: string;
  timestamp: Date;
  status: "completed" | "failed" | "in-progress";
  data?: any;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "company",
    title: "TechCorp Solutions",
    subtitle: "Company enrichment completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: "completed",
  },
  {
    id: "2",
    type: "person",
    title: "Sarah Johnson",
    subtitle: "Person enrichment completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "completed",
  },
  {
    id: "3",
    type: "ai-tool",
    title: "ICP Fit Analysis",
    subtitle: "AI analysis for TechCorp Solutions",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    status: "completed",
  },
  {
    id: "4",
    type: "company",
    title: "StartupXYZ Inc.",
    subtitle: "Company enrichment failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    status: "failed",
  },
  {
    id: "5",
    type: "person",
    title: "John Smith",
    subtitle: "Person enrichment completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "completed",
  },
  {
    id: "6",
    type: "ai-tool",
    title: "Cold Email Generation",
    subtitle: "Email generated for Sarah Johnson",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: "completed",
  },
];

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "company":
        return <Building2 className="h-4 w-4" />;
      case "person":
        return <User className="h-4 w-4" />;
      case "ai-tool":
        return <Brain className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "company":
        return "bg-blue-100 text-blue-800";
      case "person":
        return "bg-purple-100 text-purple-800";
      case "ai-tool":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || activity.type === filterType;
    const matchesStatus =
      filterStatus === "all" || activity.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleRerun = (activity: ActivityItem) => {
    toast({
      title: "Re-running enrichment",
      description: `Starting new enrichment for ${activity.title}`,
    });
    // Here you would typically trigger the actual re-run logic
  };

  const handleView = (activity: ActivityItem) => {
    toast({
      title: "Opening details",
      description: `Viewing details for ${activity.title}`,
    });
    // Here you would typically navigate to the detailed view
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(activities, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "enrichment_history.json";
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export completed",
      description: "Activity history has been downloaded",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Recent Activity
              </h1>
              <p className="text-gray-600">
                View and manage your enrichment history
              </p>
            </div>
            <Button onClick={exportHistory} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="person">Person</SelectItem>
                    <SelectItem value="ai-tool">AI Tools</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No activities found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredActivities.map((activity) => (
              <Card
                key={activity.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${getTypeColor(activity.type)}`}
                      >
                        {getTypeIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {activity.title}
                          </h3>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {activity.subtitle}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(activity)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {activity.status === "failed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRerun(activity)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Retry
                        </Button>
                      )}
                      {activity.status === "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRerun(activity)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Re-run
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredActivities.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline">Load More Activities</Button>
          </div>
        )}
      </div>
    </div>
  );
}
