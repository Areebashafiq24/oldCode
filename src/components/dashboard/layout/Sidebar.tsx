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
  MessageSquare,
} from "lucide-react";
import { useTheme } from "../../../App";
import { useNavigate } from "react-router-dom";

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

const companyEnrichmentItems: NavItem[] = [
  { icon: <Building2 size={16} />, label: "Company Description" },
  {
    icon: <Building2 size={16} />,
    label: "Company Job Openings (Website Scraper)",
  },
  { icon: <Building2 size={16} />, label: "Company News Summary" },
  { icon: <Building2 size={16} />, label: "Company LinkedIn URL Finder" },
];

const personEnrichmentItems: NavItem[] = [
  {
    icon: <Mail size={16} />,
    label: "Person Work Email",
  },
  {
    icon: <Phone size={16} />,
    label: "Person Mobile Phone",
  },
  { icon: <Users size={16} />, label: "Person LinkedIn URL" },
  { icon: <Mail size={16} />, label: "Personal Email" },
];

const aiEnrichmentItems: NavItem[] = [
  { icon: <Target size={16} />, label: "ICP Fit Check – Reason + Scoring" },
  { icon: <Brain size={16} />, label: "Pain Point Extraction" },
  { icon: <PenTool size={16} />, label: "Company Name Cleanup" },
  {
    icon: <MessageSquare size={16} />,
    label: "Cold Email First Line Generator Write",
  },
  { icon: <Mail size={16} />, label: "Custom Sales Email Based on ICP" },
];

const defaultBottomItems: NavItem[] = [
  { icon: <Settings size={20} />, label: "Settings" },
  { icon: <HelpCircle size={20} />, label: "Help" },
];

const Sidebar = ({
  items,
  activeItem = "Home",
  onItemClick = () => {},
}: SidebarProps) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleItemClick = (item: NavItem) => {
    onItemClick(item.label);
  };
  return (
    <div
      className={`w-[280px] h-full ${isDark ? "leadmagic-gradient border-white/10" : "leadmagic-gradient-light border-gray-200"} backdrop-blur-md border-r flex flex-col`}
    >
      <div className="p-6">
        <h2
          className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Lead Mend Enrichment Templates
        </h2>
      </div>

      <ScrollArea className="flex-1 px-4">
        {/* ENRICH COMPANY INFO */}
        <div className="space-y-3 mb-6">
          <h3
            className={`text-xs font-medium px-2 py-1 ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}
          >
            1. ENRICH COMPANY INFO
          </h3>
          <div className="space-y-1">
            {companyEnrichmentItems.map((item) => (
              <Button
                key={item.label}
                variant={"ghost"}
                className={`w-full justify-start gap-3 h-9 rounded-lg text-xs font-medium ${item.label === activeItem ? (isDark ? "bg-blue-900/50 text-blue-400 hover:bg-blue-900/70" : "bg-blue-50 text-blue-600 hover:bg-blue-100") : isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
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
        </div>

        {/* ENRICH PERSON INFO */}
        <div className="space-y-3 mb-6">
          <h3
            className={`text-xs font-medium px-2 py-1 ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}
          >
            2. ENRICH PERSON INFO
          </h3>
          <div className="space-y-1">
            {personEnrichmentItems.map((item) => (
              <Button
                key={item.label}
                variant={"ghost"}
                className={`w-full justify-start gap-3 h-9 rounded-lg text-xs font-medium ${item.label === activeItem ? (isDark ? "bg-blue-900/50 text-blue-400 hover:bg-blue-900/70" : "bg-blue-50 text-blue-600 hover:bg-blue-100") : isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => handleItemClick(item)}
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
        </div>

        {/* AI ENRICHMENT */}
        <div className="space-y-3 mb-6">
          <h3
            className={`text-xs font-medium px-2 py-1 ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}
          >
            3. AI ENRICHMENT
          </h3>
          <div className="space-y-1">
            {aiEnrichmentItems.map((item) => (
              <Button
                key={item.label}
                variant={"ghost"}
                className={`w-full justify-start gap-3 h-9 rounded-lg text-xs font-medium ${item.label === activeItem ? (isDark ? "bg-blue-900/50 text-blue-400 hover:bg-blue-900/70" : "bg-blue-50 text-blue-600 hover:bg-blue-100") : isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
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
