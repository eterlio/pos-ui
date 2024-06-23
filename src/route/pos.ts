import { RoutesProps } from "@/interfaces/route";
import SellProductScreen from "@/pages/pos/SellProductScreen";
export const POS_ROUTES: RoutesProps[] = [
  {
    component: SellProductScreen,
    url: "/pos",
    requireAuth: true
  }
];
