import {
  LayoutDashboard,
  SettingsIcon,
} from "lucide-react";

export const menuSidebarRoutes = {
  title: "Menu",
  routeLinks: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    }
  ],
};
export const generalSidebarRoutes = {
  title: "General",
  routeLinks: [
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
  ],
};
