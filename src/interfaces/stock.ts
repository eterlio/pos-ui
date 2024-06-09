import { DefaultPluginProps } from ".";
import { SupplierProps } from "./supplier";

export type StockStatus = "received" | "partially received" | "pending";

export interface StockDataProps {
  section?: string;
  remarks?: string;
  productId: string;
  quantityExpected: number;
  quantityReceived: number;
  status?: StockStatus;
}
export interface StockProps extends DefaultPluginProps {
  _id?: string;
  batchId: string;
  stockData: StockDataProps[];
  receivedDate?: Date;
  supplierId: string;
  truckNumber: string;
  accountId: string;
  warehouseId: string;
  // virtuals
  supplier?: SupplierProps;
}
