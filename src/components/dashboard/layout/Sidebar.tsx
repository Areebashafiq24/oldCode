import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  FolderKanban,
  Mail,
  Phone,
  Building2,
  Brain,
  Target,
  PenTool,
} from "lucide-react";
import { useTheme } from "../../../App";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
}

interface SidebarProps {
  items?: NavItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

const defaultNavItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Home", isActive: true },
  { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { icon: <FolderKanban size={20} />, label: "Projects" },
  { icon: <Calendar size={20} />, label: "Calendar" },
  { icon: <Users size={20} />, label: "Team" },
];

const enrichmentNavItems: NavItem[] = [
  { icon: <Mail size={20} />, label: "Email & Phone Enrichment" },
  { icon: <Building2 size={20} />, label: "Company Enrichment" },
  { icon: <Users size={20} />, label: "Person Enrichment" },
  { icon: <Brain size={20} />, label: "AI Tools" },
];

const aiEnrichmentNavItems: NavItem[] = [
  { icon: <Target size={20} />, label: "ICP Fit Check – Reason + Scoring" },
  { icon: <Brain size={20} />, label: "Pain Point Extraction" },
  { icon: <PenTool size={20} />, label: "Company Name Cleanup" },
];

const defaultBottomItems: NavItem[] = [
  { icon: <Settings size={20} />, label: "Settings" },
  { icon: <HelpCircle size={20} />, label: "Help" },
];

const Sidebar = ({
  items = defaultNavItems,
  activeItem = "Home",
  onItemClick = () => {},
}: SidebarProps) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`w-[280px] h-full ${isDark ? "glass-card-dark border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-md border-r flex flex-col`}
    >
      <div className="p-6">
        <h2
          className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Lead Mend
        </h2>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Find anyone's email in seconds
        </p>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1.5">
          {items.map((item) => (
            <Button
              key={item.label}
              variant={"ghost"}
              className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? (isDark ? "bg-blue-900/50 text-blue-400 hover:bg-blue-900/70" : "bg-blue-50 text-blue-600 hover:bg-blue-100") : isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => onItemClick(item.label)}
            >
              <span
                className={`${item.label === activeItem ? (isDark ? "text-blue-400" : "text-blue-600") : isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </Button>
          ))}
        </div>

        <Separator
          className={`my-4 ${isDark ? "bg-white/10" : "bg-gray-100"}`}
        />

        <div className="space-y-3">
          <h3
            className={`text-xs font-medium px-4 py-1 ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}
          >
            Enrichment Tools
          </h3>
          {enrichmentNavItems.map((item) => (
            <Button
              key={item.label}
              variant={"ghost"}
              className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? (isDark ? "bg-blue-900/50 text-blue-400 hover:bg-blue-900/70" : "bg-blue-50 text-blue-600 hover:bg-blue-100") : isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => onItemClick(item.label)}
            >
              <span
                className={`${item.label === activeItem ? (isDark ? "text-blue-400" : "text-blue-600") : isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </Button>
          ))}
        </div>

        <div className="space-y-3 mt-6">
          <h3
            className={`text-xs font-medium px-4 py-1 ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}
          >
            AI Enrichment
          </h3>
          {aiEnrichmentNavItems.map((item) => (
            <Button
              key={item.label}
              variant={"ghost"}
              className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? (isDark ? "bg-blue-900/50 text-blue-400 hover:bg-blue-900/70" : "bg-blue-50 text-blue-600 hover:bg-blue-100") : isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => onItemClick(item.label)}
            >
              <span
                className={`${item.label === activeItem ? (isDark ? "text-blue-400" : "text-blue-600") : isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div
        className={`p-4 mt-auto border-t ${isDark ? "border-white/10" : "border-gray-200"}`}
      >
        {defaultBottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"} mb-1.5`}
            onClick={() => onItemClick(item.label)}
          >
            <span className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {item.icon}
            </span>
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
