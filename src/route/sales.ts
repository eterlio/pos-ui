import { RoutesProps } from "@/interfaces/route";
import SalesListScreen from "@/pages/sales/SalesListScreen";
import ViewSaleScreen from "@/pages/sales/ViewSaleScreen";
export const SALES_ROUTES: RoutesProps[] = [
  {
    component: SalesListScreen,
    url: "/sales",
    requireAuth: true
  },
  {
    component: ViewSaleScreen,
    url: "/sales/:id",
    requireAuth: true
  }
];
