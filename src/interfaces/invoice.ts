import { startCase } from "lodash";
import { DefaultPluginProps, OptionsProps } from ".";
import { CustomerProps } from "./customer";
import { UserProps } from "./user";

export const INVOICE_STATUSES: InvoiceStatus[] = ["paid", "not paid", "expired", "partly paid"];
export const invoiceFrequencies: Frequency[] = ["daily", "weekly", "monthly", "yearly"];
export const discountTypes = ["fixed", "percentage"];

export const INVOICE_FREQUENCY_OPTIONS: OptionsProps[] = invoiceFrequencies.map((frequency) => {
  return {
    label: startCase(frequency),
    value: frequency
  };
});
export const INVOICE_DISCOUNT_TYPE_OPTIONS: OptionsProps[] = discountTypes.map((discountType) => {
  return {
    label: startCase(discountType),
    value: discountType
  };
});
export interface Discount {
  type: "fixed" | "percentage";
  value: number;
}
export type InvoiceStatus = "paid" | "not paid" | "expired" | "partly paid";

export type Frequency = "daily" | "weekly" | "monthly" | "yearly";
export interface RecurrenceProps {
  interval: number; // Interval as per your need, if you want to send the invoices every month then go for '1', or if you want to send them after 2 or 3 months, then go for '2' or '3' respectively.
  frequency: Frequency;
  cycle: number; //if you set your billing frequency 'month-wise, an interval '1' then your billing cycle will be '12'. It means that you want to send invoices every month for a year, so it makes '12' billing cycles.
}
export interface InvoiceProps extends DefaultPluginProps {
  _id?: string;
  invoiceNumber?: string;
  dueDate?: Date;
  warehouseId: string;
  accountId: string;
  items: InvoiceItem[];
  totalAmount?: number;
  hasDiscount?: boolean;
  discount?: Discount;
  status?: InvoiceStatus;
  isRecurring?: boolean;
  recurrence?: RecurrenceProps;
  customerId: string;
  termsAndCondition?: string;
  note?: string;
  invoiceDate?: Date;

  // virtuals
  customerData?: CustomerProps;
  createdByData?: UserProps;
}

export interface InvoiceItem {
  name?: string;
  quantity: number;
  price: number;
  _id?: string;
}
