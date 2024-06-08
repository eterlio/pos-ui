import { RoutesProps } from "@/interfaces/route";
import { AUTH_ROUTES } from "./auth";
import { MISCELLANEOUS_ROUTES } from "./miscellaneous";
import { USER_ROUTES } from "./users";
import { PRODUCT_ENDPOINTS } from "./product";
import { SUPPLIERS_ROUTES } from "./suppliers";
import { STOCK_ROUTES } from "./stock";

export const ROUTES: RoutesProps[] = [
  ...AUTH_ROUTES,
  ...MISCELLANEOUS_ROUTES,
  ...USER_ROUTES,
  ...PRODUCT_ENDPOINTS,
  ...SUPPLIERS_ROUTES,
  ...STOCK_ROUTES
];
