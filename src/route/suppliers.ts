import { RoutesProps } from "@/interfaces/route";
import CreateSupplierScreen from "@/pages/suppliers/CreateSupplierScreen";
import ListSuppliersScreen from "@/pages/suppliers/ListSuppliersScreen";

export const SUPPLIERS_ROUTES: RoutesProps[] = [
  {
    component: ListSuppliersScreen,
    url: "/suppliers",
    requireAuth: true,
    permission: ["suppliers", "read"]
  },
  {
    component: CreateSupplierScreen,
    url: "/suppliers/create",
    requireAuth: true,
    permission: ["suppliers", "create"]
  }
  // {
  //   component: UpdateProductCategoryScreen,
  //   url: "/suppliers/:id",
  //   requireAuth: true,
  //   permission: ["suppliers", "update"]
  // }
];
