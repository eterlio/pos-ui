import { LucideIcon } from "lucide-react";
import React, { createElement } from "react";

interface TabProps {
  label: string;
  isActiveTab: boolean;
  onClick?: () => void;
  icon?: LucideIcon;
}

const Tab: React.FC<TabProps> = ({ label, isActiveTab, onClick, icon }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer block transition-all duration-300 ${
        isActiveTab
          ? "text-[#10172a]  border-custom-active border-b-2"
          : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
      } rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2 border-transparent dark:text-gray-400 dark:hover:text-gray-300`}
    >
      <div className="flex items-center gap-1 justify-center">
        {icon && createElement(icon, {size: 16})}
        {label}
      </div>
    </div>
  );
};

export default Tab;
