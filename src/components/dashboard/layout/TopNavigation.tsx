import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell, Home, Search, Settings, User, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../supabase/auth";
import { useTheme } from "../../../App";

interface TopNavigationProps {
  onSearch?: (query: string) => void;
  notifications?: Array<{ id: string; title: string }>;
}

const TopNavigation = ({
  onSearch = () => {},
  notifications = [
    { id: "1", title: "New project assigned" },
    { id: "2", title: "Meeting reminder" },
  ],
}: TopNavigationProps) => {
  const { user, userMetadata, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  if (!user) return null;

  // Extract user information from metadata or fallback to user object
  const displayName =
    userMetadata?.fullName || user.email?.split("@")[0] || "User";
  const userEmail = userMetadata?.email || user.email;
  const avatarUrl =
    userMetadata?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`;

  return (
    <div
      className={`w-full h-16 border-b ${isDark ? "border-white/10 bg-black/20" : "border-gray-200 bg-white/20"} backdrop-blur-md flex items-center justify-between px-6 fixed top-0 z-50 shadow-sm`}
    >
      <div className="flex items-center gap-4 flex-1">
        <Link
          to="/"
          className={`${isDark ? "text-white hover:text-gray-300" : "text-gray-900 hover:text-gray-700"} transition-colors`}
        >
          <Home className="h-5 w-5" />
        </Link>
        <div className="relative w-64">
          <Search
            className={`absolute left-3 top-2.5 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-400"}`}
          />
          <Input
            placeholder="Search projects..."
            className={`pl-9 h-10 rounded-full ${isDark ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400" : "bg-gray-100 border-0 text-gray-900"} text-sm focus:ring-2 focus:ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-0`}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={`rounded-full h-9 w-9 ${isDark ? "bg-white/10 hover:bg-white/20 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} transition-colors`}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative rounded-full h-9 w-9 ${isDark ? "bg-white/10 hover:bg-white/20" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
                  >
                    <Bell
                      className={`h-4 w-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium border border-white">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={`rounded-xl overflow-hidden p-2 border ${isDark ? "border-white/20 bg-gray-900" : "border-gray-200 bg-white"} shadow-lg`}
                >
                  <DropdownMenuLabel
                    className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"} px-2`}
                  >
                    Notifications
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator
                    className={`my-1 ${isDark ? "bg-white/10" : "bg-gray-100"}`}
                  />
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`rounded-lg text-sm py-2 ${isDark ? "focus:bg-white/10 text-gray-300" : "focus:bg-gray-100 text-gray-900"}`}
                    >
                      {notification.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={`flex items-center gap-3 hover:cursor-pointer p-2 rounded-lg ${isDark ? "hover:bg-white/10" : "hover:bg-gray-100"} transition-colors`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="bg-blue-500 text-white">
                  {displayName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p
                  className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {displayName}
                </p>
                <p
                  className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {userEmail}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`rounded-xl border-none shadow-lg w-56 ${isDark ? "bg-gray-900" : "bg-white"}`}
          >
            <DropdownMenuLabel className="px-4 py-3">
              <div className="flex flex-col space-y-1">
                <p
                  className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {displayName}
                </p>
                <p
                  className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {userEmail}
                </p>
                {userMetadata?.provider && (
                  <p className="text-xs text-blue-600 capitalize">
                    via {userMetadata.provider}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={`cursor-pointer ${isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}`}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`cursor-pointer ${isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}`}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600"
              onSelect={() => signOut()}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigation;
