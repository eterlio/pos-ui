import { DefaultPluginProps } from ".";

export type ProductStatus = "active" | "inactive" | "draft";
export type BarcodeSymbology = "code25" | "code39" | "code128" | "ean5" | "ean13" | "upca" | "upce";
export const productBarcodeSymbology: BarcodeSymbology[] = [
  "code128",
  "code25",
  "code39",
  "ean13",
  "ean5",
  "upca",
  "upce"
];
export const productStatus: ProductStatus[] = ["active", "draft", "inactive"];
export interface ProductProps extends DefaultPluginProps {
  _id?: string;
  id?: string;
  name: string;
  productCodeId: string;
  categoryId: string;
  supplierId: string;
  brandId: string;
  barcodeSymbology: BarcodeSymbology;
  unitId: string;
  productUnitPrice: number;
  productSellingPrice: number;
  taxId?: string;
  taxType?: "inclusive" | "exclusive" | null;
  warehouseIds?: string[];
  accountId?: string;
  alertQuantity: number;
  description?: string;
  status: ProductStatus;
  isFeatured?: boolean;
  tags?: string[];
  availability?: "onlineOnly" | "offlineOnly" | "bothOnlineAndOffLine";
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;
  canExpire?: boolean;
  expirationDate?: Date | null;
  SKU?: string;
  primaryImageId?: string;
  secondaryImages?: string[];
}
