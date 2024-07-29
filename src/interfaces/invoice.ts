import { DefaultPluginProps } from ".";
import { CustomerProps } from "./customer";
import { UserProps } from "./user";

export interface Discount {
  type: "fixed" | "percentage";
  amount: number;
}
export type InvoiceStatus = "paid" | "not paid" | "expired" | "partly paid";
export const INVOICE_STATUSES: InvoiceStatus[] = ["expired", "not paid", "paid", "partly paid"];
export type Interval = "daily" | "weekly" | "monthly" | "yearly";
export interface RecurrenceProps {
  interval: Interval;
  frequency: number;
}
export interface InvoiceProps extends DefaultPluginProps {
  _id?: string;
  invoiceNumber?: string;
  dueDate?: Date | null;
  warehouseId: string;
  accountId: string;
  items: InvoiceItem[];
  totalAmount?: number;
  discount?: Discount;
  status?: InvoiceStatus;
  isRecurring?: boolean;
  recurrence?: RecurrenceProps;
  description?: string;
  customerId: string;
  remarks?: string;

  // virtuals
  customerData?: CustomerProps;
  createdByData?: UserProps;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  _id?: string;
}
