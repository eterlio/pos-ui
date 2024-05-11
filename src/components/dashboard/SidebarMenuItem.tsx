import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown, Minus } from "lucide-react";
import { MenuSidebarRoute, SubLink } from "@/route/sidebar";

const SidebarMenuItem: React.FC<MenuSidebarRoute> = ({
  icon,
  title,
  url,
  subLinks,
  isDisabled = false,
  isVisible = true
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    if (!isDisabled) {
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  const hasSubLinks = subLinks && Array.isArray(subLinks) && subLinks.length > 0;

  return (
    <>
      {isVisible && (
        <li>
          {hasSubLinks ? (
            <div
              className={`cursor-pointer flex items-center mt-[0.3rem] p-[0.5rem] text-gray-900 hover:text-white hover:bg-[#202941] dark:hover:bg-[#202941] group ${
                isSubMenuOpen ? "rounded-t-md rounded-b-0" : "rounded-md"
              } ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none " : ""}`}
              onClick={toggleSubMenu}
            >
              {icon}
              <span className="ml-3 text-[12px]">{title.toUpperCase()}</span>
              {subLinks && (
                <span className="ml-auto transition-transform duration-300 transform">
                  {isSubMenuOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </span>
              )}
            </div>
          ) : (
            <Link
              to={url}
              className={`block cursor-pointer mt-[0.3rem] p-[0.5rem] text-gray-900 hover:text-white hover:bg-[#202941] dark:hover:bg-[#202941] rounded-m ${
                isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
              }`}
            >
              <div className="flex items-center">
                {icon}
                <span className="ml-3 text-[12px]">{title.toUpperCase()}</span>
              </div>
            </Link>
          )}

          {hasSubLinks && !isDisabled && (
            <ul className={`bg-[#131c36] overflow-hidden ${isSubMenuOpen ? "h-full" : "h-0"}`}>
              {subLinks.map(({ title, url, isDisabled = false, isVisible = true }: SubLink, index: number) => (
                <span key={index}>
                  {isVisible && (
                    <li>
                      <Link
                        to={isDisabled ? "#" : url}
                        className={`flex items-center gap-4 px-4 py-2 text-gray-300 transition-all duration-300 text-[13px] hover:bg-[#202941] min-h-[43px] ${
                          isDisabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
                        }`}
                      >
                        <span>
                          <Minus size={16} />
                        </span>
                        <span>{title}</span>
                      </Link>
                    </li>
                  )}
                </span>
              ))}
            </ul>
          )}
        </li>
      )}
    </>
  );
};

export default SidebarMenuItem;
