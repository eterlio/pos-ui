import { RoutesProps } from "@/interfaces/route";
import CreateCustomerScreen from "@/pages/customer/CreateCustomerScreen";
import CustomersListScreen from "@/pages/customer/CustomersListScreen";
import UpdateCustomerScreen from "@/pages/customer/UpdateCustomerScreen";

export const CUSTOMERS_ROUTES: RoutesProps[] = [
  {
    component: CustomersListScreen,
    url: "/customers",
    requireAuth: true,
    permission: ["customers", "create"]
  },
  {
    component: UpdateCustomerScreen,
    url: "/customers/:id/edit",
    requireAuth: true,
    permission: ["customers", "update"]
  },
  {
    component: CreateCustomerScreen,
    url: "/customers/create",
    requireAuth: true,
    permission: ["customers", "create"]
  }
];
