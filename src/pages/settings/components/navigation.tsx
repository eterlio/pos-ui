import { startCase } from "lodash";
import { FC } from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  currentNav: string;
  navOptions: { [key: string]: { subLinks: string[] } };
  handleNavChange: (nav: any) => void;
}

const Navigation: FC<NavigationProps> = ({ currentNav, navOptions, handleNavChange }) => {
  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      {(Object.keys(navOptions) as string[]).map((nav, index) => (
        <Link
          to="#"
          key={index}
          className={`font-semibold ${currentNav === nav ? "text-primary" : ""}`}
          onClick={() => handleNavChange(nav)}
        >
          {startCase(nav)}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
