import React, { useState } from "react";
import { Menu, Bell, ChevronDown, Globe, LogOut, User } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
  setIsMobileMenuOpen: (value: boolean) => void;
}

const Header = ({ isSidebarCollapsed, setIsSidebarCollapsed, setIsMobileMenuOpen }: HeaderProps) => {
  const { userProfile, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const firstName = userProfile?.name?.split(" ")[0] || (language === "hi" ? "अतिथि" : "Guest");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <header className="mb-8 sticky top-0 z-30 pt-2 transition-all">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Tricolor Strip */}
        <div className="h-1 w-full flex">
          <div className="h-full w-1/3 bg-[#FF9933]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#138808]"></div>
        </div>

        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-md lg:hidden transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Desktop Toggle */}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
              className="hidden lg:flex p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-800 rounded-lg transition-all"
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title (Optional) */}
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Government of India</span>
              <span className="text-sm font-bold text-slate-800">Scheme Samadhan Portal</span>
            </div>
          </div>

          {/* Right Side Header Items */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === "en" ? "English" : "हिंदी"}</span>
            </button>

            {/* Notification */}
            <button className="p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-full transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-800 leading-none">{firstName}</p>
                    <p className="text-[10px] text-slate-500 leading-none mt-1">Citizen</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-sm">
                    {firstName[0]}
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 w-4 h-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/saved")}>
                  <Bell className="mr-2 w-4 h-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")} className="text-red-600">
                  <LogOut className="mr-2 w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
