import React from "react";

interface QuickActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const QuickActionButton = ({ icon: Icon, label, onClick }: QuickActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-5 py-3 bg-blue-50 text-blue-900 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200"
    >
      <Icon className="w-5 h-5 text-blue-800" />
      <span>{label}</span>
    </button>
  );
};

export default QuickActionButton;
