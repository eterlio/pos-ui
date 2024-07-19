import { FC } from "react";
import { Link } from "react-router-dom";

interface SubNavigationProps {
  currentSubLink: string;
  subLinks: string[];
  handleSubNavChange: (link: string) => void;
}

const SubNavigation: FC<SubNavigationProps> = ({ currentSubLink, subLinks, handleSubNavChange }) => {
  return (
    <header className="flex md:h-16 items-start gap-4 border-b px-4 md:px-6">
      <nav className="gap-x-6 gap-y-3 flex items-center md:flex-0 flex-1 md:flex-nowrap flex-wrap lg:mt-0 mt-5">
        {subLinks.map((link, index) => (
          <Link
            to="#"
            key={index}
            className={`font-medium text-sm text-muted-foreground ${currentSubLink === link ? "text-primary" : ""}`}
            onClick={() => handleSubNavChange(link)}
          >
            {link}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default SubNavigation;
