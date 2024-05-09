import React from "react";
import { Link } from "react-router-dom";

interface SidebarMenuItemProps {
  url: string;
  icon: React.ReactNode;
  text: string;
}
const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  text,
  url,
}) => {
  return (
    <li>
      <Link
        to={url}
        className="flex items-center my-2 p-[0.6rem] text-gray-900 rounded-md hover:text-white hover:bg-[#202941] dark:hover:bg-[#202941] group"
      >
        {icon}
        <span className="ml-3" style={{fontSize:"14px"}}>{text}</span>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
