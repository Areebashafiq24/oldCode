import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Key,
  User,
  Brain,
  Bell,
  Shield,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../../supabase/auth";

interface APIKey {
  name: string;
  key: string;
  status: "connected" | "disconnected" | "error";
  description: string;
}

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("api-keys");
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      name: "OpenAI API Key",
      key: "sk-...",
      status: "connected",
      description: "For AI-powered analysis and content generation",
    },
    {
      name: "Firecrawl API Key",
      key: "",
      status: "disconnected",
      description: "For web scraping and content extraction",
    },
    {
      name: "Serper.dev API Key",
      key: "",
      status: "disconnected",
      description: "For Google search results and SERP data",
    },
    {
      name: "Wiza API Key",
      key: "",
      status: "disconnected",
      description: "For email finding and verification",
    },
  ]);

  const [gptSettings, setGptSettings] = useState({
    temperature: [0.7],
    maxTokens: 1000,
    model: "gpt-4-turbo",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    enrichmentComplete: true,
    dailySummary: false,
    errorAlerts: true,
  });

  const [profile, setProfile] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    company: "",
    role: "",
  });

  const handleSaveAPIKey = (index: number, newKey: string) => {
    const updatedKeys = [...apiKeys];
    updatedKeys[index].key = newKey;
    updatedKeys[index].status = newKey ? "connected" : "disconnected";
    setApiKeys(updatedKeys);

    toast({
      title: "API Key Updated",
      description: `${updatedKeys[index].name} has been ${newKey ? "connected" : "disconnected"}`,
    });
  };

  const toggleKeyVisibility = (keyName: string) => {
    setShowKeys((prev) => ({ ...prev, [keyName]: !prev[keyName] }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved",
    });
  };

  const handleSaveGPTSettings = () => {
    toast({
      title: "AI Settings Updated",
      description: "Your AI configuration has been saved",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const maskKey = (key: string) => {
    if (!key || key.length < 8) return key;
    return key.substring(0, 4) + "..." + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your API keys, preferences, and account settings
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="api-keys" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger
              value="ai-settings"
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              AI Settings
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* API Keys */}
          <TabsContent value="api-keys" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-blue-500" />
                  API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {apiKeys.map((apiKey, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Label className="font-medium">{apiKey.name}</Label>
                          <Badge className={getStatusColor(apiKey.status)}>
                            {apiKey.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {apiKey.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          type={showKeys[apiKey.name] ? "text" : "password"}
                          placeholder="Enter API key..."
                          value={apiKey.key}
                          onChange={(e) => {
                            const updatedKeys = [...apiKeys];
                            updatedKeys[index].key = e.target.value;
                            setApiKeys(updatedKeys);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => toggleKeyVisibility(apiKey.name)}
                        >
                          {showKeys[apiKey.name] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        onClick={() =>
                          handleSaveAPIKey(index, apiKeys[index].key)
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    {index < apiKeys.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai-settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  GPT Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Temperature: {gptSettings.temperature[0]}</Label>
                  <p className="text-sm text-gray-500">
                    Controls randomness in AI responses (0 = focused, 1 =
                    creative)
                  </p>
                  <Slider
                    value={gptSettings.temperature}
                    onValueChange={(value) =>
                      setGptSettings((prev) => ({
                        ...prev,
                        temperature: value,
                      }))
                    }
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label htmlFor="maxTokens">Max Tokens</Label>
                  <p className="text-sm text-gray-500">
                    Maximum length of AI responses
                  </p>
                  <Input
                    id="maxTokens"
                    type="number"
                    value={gptSettings.maxTokens}
                    onChange={(e) =>
                      setGptSettings((prev) => ({
                        ...prev,
                        maxTokens: parseInt(e.target.value),
                      }))
                    }
                    min={100}
                    max={4000}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label htmlFor="model">Model</Label>
                  <p className="text-sm text-gray-500">
                    AI model to use for analysis
                  </p>
                  <Input
                    id="model"
                    value={gptSettings.model}
                    onChange={(e) =>
                      setGptSettings((prev) => ({
                        ...prev,
                        model: e.target.value,
                      }))
                    }
                    placeholder="gpt-4-turbo"
                  />
                </div>

                <Button
                  onClick={handleSaveGPTSettings}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save AI Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-green-500" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        emailNotifications: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Enrichment Complete</Label>
                    <p className="text-sm text-gray-500">
                      Notify when enrichment tasks finish
                    </p>
                  </div>
                  <Switch
                    checked={notifications.enrichmentComplete}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        enrichmentComplete: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Daily Summary</Label>
                    <p className="text-sm text-gray-500">
                      Daily summary of your enrichment activity
                    </p>
                  </div>
                  <Switch
                    checked={notifications.dailySummary}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        dailySummary: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Error Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Notify when enrichment tasks fail
                    </p>
                  </div>
                  <Switch
                    checked={notifications.errorAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        errorAlerts: checked,
                      }))
                    }
                  />
                </div>

                <Button
                  onClick={handleSaveNotifications}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-orange-500" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                    />
                    <AvatarFallback>
                      {user?.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {profile.fullName || "User"}
                    </h3>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={profile.role}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      placeholder="Your job title"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
