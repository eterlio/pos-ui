import { RoutesProps } from "@/interfaces/route";
import CreateSupplierScreen from "@/pages/suppliers/CreateSupplierScreen";
import ListSuppliersScreen from "@/pages/suppliers/ListSuppliersScreen";
import UpdateSupplierScreen from "@/pages/suppliers/UpdateSupplierScreen";

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
  },
  {
    component: UpdateSupplierScreen,
    url: "/suppliers/:id",
    requireAuth: true,
    permission: ["suppliers", "update"]
  }
];
