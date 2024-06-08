import { RoutesProps } from "@/interfaces/route";
import RecordStockScreen from "@/pages/stock/RecordStockScreen";
import StockListScreen from "@/pages/stock/StockListScreen";

export const STOCK_ROUTES: RoutesProps[] = [
  {
    component: RecordStockScreen,
    url: "/record-stock",
    requireAuth: true,
    permission: ["stocks", "create"]
  },
  {
    component: StockListScreen,
    url: "/stocks",
    requireAuth: true,
    permission: ["stocks", "read"]
  }
];
