import { RoutesProps } from "@/interfaces/route";
import RecordStockScreen from "@/pages/stock/RecordStockScreen";
import StockListScreen from "@/pages/stock/StockListScreen";
import UpdateStockScreen from "@/pages/stock/UpdateStockScreen";
import ViewStockScreen from "@/pages/stock/ViewStockScreen";

export const STOCK_ROUTES: RoutesProps[] = [
  {
    component: RecordStockScreen,
    url: "/stocks/record",
    requireAuth: true,
    permission: ["stocks", "create"]
  },
  {
    component: StockListScreen,
    url: "/stocks",
    requireAuth: true,
    permission: ["stocks", "read"]
  },
  {
    component: UpdateStockScreen,
    url: "/stocks/:id",
    requireAuth: true,
    permission: ["stocks", "update"]
  },
  {
    component: ViewStockScreen,
    url: "/stocks/:id/view",
    requireAuth: true,
    permission: ["stocks", "read"]
  }
];
