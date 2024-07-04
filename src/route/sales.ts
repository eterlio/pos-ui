import { RoutesProps } from "@/interfaces/route";
import SalesListScreen from "@/pages/sales/SalesListScreen";
export const SALES_ROUTES: RoutesProps[] = [
  {
    component: SalesListScreen,
    url: "/sales",
    requireAuth: true
  }
];
