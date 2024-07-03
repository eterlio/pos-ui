import { DefaultPluginProps } from ".";
import { CustomerProps } from "./customer";
import { InvoiceProps } from "./invoice";
import { UserProps } from "./user";

export interface Item {
  productId: string;
  quantity: number;
  price: number;
  _id?: string;
  id?: string;
}

export interface Discount {
  type: "fixed" | "percentage";
  amount: number;
}
export type ModeOfPaymentProps = "cash" | "mobile money" | "cheque" | "bank";
export interface SalesProps extends DefaultPluginProps {
  _id?: string;
  customerId: string;
  amountPaid: number;
  changeGiven: number;
  arrears: number;
  accountId?: string;
  warehouseId?: string;
  modeOfPayment: ModeOfPaymentProps;
  invoiceId: string;
  receiptNumber?: string;

  // virtuals
  invoiceData?: InvoiceProps;
  customerData?: CustomerProps;
  createdByData?: UserProps;
}

export type MobileMoneyPaymentProps = {
  networkType: "MTN" | "VODAFONE" | "AIRTEL TIGO";
  mobileMoneyNumber: string;
  transactionId: string;
};
export type BankPaymentProps = {
  bankName: string;
  bankAccountNumber: number;
};
export type ChequePaymentProps = {
  bankName: string;
  chequeNumber: number;
};
