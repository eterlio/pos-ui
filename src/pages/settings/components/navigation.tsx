import { startCase } from "lodash";
import { FC, memo } from "react";

interface NavigationProps {
  currentNav: string;
  navOptions: { [key: string]: { subLinks: string[] } };
  handleNavChange: (nav: any) => void;
}

const Navigation: FC<NavigationProps> = ({ currentNav, navOptions, handleNavChange }) => {
  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      {(Object.keys(navOptions) as string[]).map((nav, index) => (
        <span
          key={index}
          className={`font-semibold ${currentNav === nav ? "text-primary" : ""} cursor-pointer`}
          onClick={() => handleNavChange(nav)}
        >
          {startCase(nav)}
        </span>
      ))}
    </nav>
  );
};

export default memo(Navigation);
