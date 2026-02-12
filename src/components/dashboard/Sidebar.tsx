import React from "react";
import { 
  LayoutDashboard, 
  List, 
  Grid, 
  Bookmark, 
  ShieldCheck, 
  User, 
  HelpCircle,
  LogOut,
  X,
  Settings,
  Pencil
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, path, isCollapsed, onClick }: SidebarItemProps) => {
  const showTooltip = isCollapsed;

  const LinkContent = (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 group relative",
        isActive 
          ? "bg-blue-50 text-blue-900 border-l-4 border-blue-800" 
          : "text-slate-600 hover:bg-slate-50 hover:text-blue-800 border-l-4 border-transparent",
        isCollapsed ? "justify-center px-2" : ""
      )}
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", 
        // isActive check is handled via parent class, but we can add specific icon styles if needed
      )} />
      
      {!isCollapsed && (
        <span className="whitespace-nowrap transition-all duration-300 origin-left">
          {label}
        </span>
      )}
    </NavLink>
  );

  if (showTooltip) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {LinkContent}
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-900 text-white border-slate-800">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return LinkContent;
};

const SidebarSectionHeader = ({ label, isCollapsed }: { label: string, isCollapsed: boolean }) => {
  if (isCollapsed) return <div className="h-4" />;
  return (
    <div className="px-4 py-2 mt-4 mb-1">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</h3>
    </div>
  );
};

const Sidebar = ({ isCollapsed, isMobileOpen, onCloseMobile }: SidebarProps) => {
  const navigate = useNavigate();
  const { language, userProfile } = useApp();
  const t = translations[language].dashboard;
  const firstName = userProfile?.name || (language === "hi" ? "अतिथि" : "Guest");

  const menuGroups = [
    {
      title: "Main",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      ]
    },
    {
      title: "Schemes",
      items: [
        { icon: List, label: "All Schemes", path: "/schemes" },
        { icon: Grid, label: t.categories, path: "/categories" },
        { icon: Bookmark, label: t.saved, path: "/saved" },
        { icon: ShieldCheck, label: t.checkEligibility, path: "/eligibility" },
      ]
    },
    {
      title: "User",
      items: [
        { icon: User, label: "Profile", path: "/profile" },
        { icon: HelpCircle, label: "Help", path: "/help" },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]",
          isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0",
          !isMobileOpen && (isCollapsed ? "lg:w-[80px]" : "lg:w-[280px]")
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center h-18 px-6 py-5 border-b border-slate-100",
          isCollapsed && !isMobileOpen ? "justify-center px-2" : "justify-between"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 min-w-[36px] bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md ring-2 ring-blue-100">
              Y
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                  YojanaSathi
                </h1>
                <span className="text-[10px] font-medium text-slate-500 tracking-wide uppercase mt-0.5">Govt. Services Portal</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <TooltipProvider>
          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
            {menuGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                <SidebarSectionHeader label={group.title} isCollapsed={isCollapsed && !isMobileOpen} />
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    isCollapsed={isCollapsed && !isMobileOpen}
                    onClick={() => isMobileOpen && onCloseMobile()}
                  />
                ))}
              </div>
            ))}
          </nav>
        </TooltipProvider>
        
        {/* User Profile Card (Bottom) */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          {(!isCollapsed || isMobileOpen) ? (
             <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold border border-blue-200">
                 {firstName[0]}
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold text-slate-900 truncate">{firstName}</p>
                 <p className="text-xs text-slate-500 truncate">Citizen</p>
               </div>
               <button 
                 onClick={() => navigate("/profile")}
                 className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                 title="Edit Profile"
               >
                 <Pencil className="w-4 h-4" />
               </button>
             </div>
          ) : (
            <div className="flex justify-center">
               <button 
                 onClick={() => navigate("/profile")}
                 className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold border border-blue-200 hover:ring-2 hover:ring-blue-300 transition-all"
               >
                 {firstName[0]}
               </button>
            </div>
          )}
          
          <button
            onClick={() => navigate("/")}
            className={cn(
              "w-full flex items-center gap-3 mt-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors",
              isCollapsed && !isMobileOpen ? "justify-center" : ""
            )}
          >
            <LogOut className="w-4 h-4" />
            {(!isCollapsed || isMobileOpen) && <span>{t.logout}</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
