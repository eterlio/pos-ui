import { RoutesProps } from "@/interfaces/route";
import CreateInvoiceScreen from "@/pages/invoices/CreateInvoiceScreen";
import EditInvoiceScreen from "@/pages/invoices/EditInvoiceScreen";
import InvoiceDetailsScreen from "@/pages/invoices/InvoiceDetailsScreen";
import InvoiceListScreen from "@/pages/invoices/InvoiceListScreen";
export const INVOICES_ROUTES: RoutesProps[] = [
  {
    component: InvoiceListScreen,
    url: "/invoices",
    requireAuth: true,
    permission: ["invoice", "read"]
  },
  {
    component: CreateInvoiceScreen,
    url: "/invoices/create",
    requireAuth: true,
    permission: ["invoice", "create"]
  },
  {
    component: InvoiceDetailsScreen,
    url: "/invoices/:id",
    requireAuth: true,
    permission: ["invoice", "read"]
  },
  {
    component: EditInvoiceScreen,
    url: "/invoices/:id/edit",
    requireAuth: true,
    permission: ["invoice", "update"]
  }
];
