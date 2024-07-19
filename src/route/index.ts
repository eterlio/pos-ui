import { RoutesProps } from "@/interfaces/route";
import { AUTH_ROUTES } from "./auth";
import { MISCELLANEOUS_ROUTES } from "./miscellaneous";
import { USER_ROUTES } from "./users";
import { PRODUCT_ENDPOINTS } from "./product";
import { SUPPLIERS_ROUTES } from "./suppliers";
import { STOCK_ROUTES } from "./stock";
import { POS_ROUTES } from "./pos";
import Test from "@/pages/Test";
import { SALES_ROUTES } from "./sales";
import SettingsScreen from "@/pages/settings/SettingsScreen";

export const ROUTES: RoutesProps[] = [
  ...AUTH_ROUTES,
  ...MISCELLANEOUS_ROUTES,
  ...USER_ROUTES,
  ...PRODUCT_ENDPOINTS,
  ...SUPPLIERS_ROUTES,
  ...STOCK_ROUTES,
  ...POS_ROUTES,
  ...SALES_ROUTES,
  {
    component: SettingsScreen,
    url: "/settings",
    allowedRoles: ["admin"],
    requireAuth: true,
    routeName: "settings"
  },
  {
    component: Test,
    url: "/test"
  }
];
