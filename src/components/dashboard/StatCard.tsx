import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  iconColor: string;
  bgColor: string;
}

const StatCard = ({ icon: Icon, value, label, iconColor, bgColor }: StatCardProps) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", bgColor)}>
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default StatCard;
