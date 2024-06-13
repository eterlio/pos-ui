import { DefaultPluginProps } from ".";
import { ProductProps } from "./products";
import { SupplierProps } from "./supplier";

export type StockDataStatus = "received" | "partially received";

export interface StockDataProps {
  section?: string;
  remarks?: string;
  productId: string;
  quantityExpected: number;
  quantityReceived: number;
  status?: StockDataStatus;
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
  status?: "pending" | "approved" | "rejected";

  // virtuals
  supplier?: SupplierProps;
  products?: ProductProps[];
}
