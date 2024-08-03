import { RoutesProps } from "@/interfaces/route";
import SalesAnalysisView from "@/pages/sales/SalesAnalysisView";
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
  },
  {
    component: SalesAnalysisView,
    url: "/sales/analysis",
    requireAuth: true
  }
];
