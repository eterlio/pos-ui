import { UserProps } from "@/interfaces/user";
import { AddressProps, DefaultPluginProps, PhoneProps, RequestStateProps } from "../interfaces";
import {
  BarcodeSymbology,
  ProductProps,
  ProductStatus,
  productBarcodeSymbology,
  productStatus
} from "@/interfaces/products";
import { startCase } from "lodash";
import { SupplierProps } from "@/interfaces/supplier";
import { StockDataProps, StockProps } from "@/interfaces/stock";
import { CustomerProps } from "@/interfaces/customer";

export const defaultPlugin: DefaultPluginProps = {
  createdAt: new Date(),
  updatedBy: "",
  updatedAt: new Date(),
  deleted: false,
  deletedAt: new Date(),
  deletedBy: "",
  createdBy: "",
  _id: "",
  id: ""
};

export const address: AddressProps = {
  zipCode: "",
  country: "GH",
  city: "",
  street: "",
  state: "",
  gpsAddress: "",
  isGpsAddress: false,
  isPoBox: false,
  poBox: ""
};

export const phone: PhoneProps = {
  prefix: "",
  number: "",
  country: ""
};

export const initialRequestState: RequestStateProps = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
};

export const createDefaultUser: () => UserProps = () => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  address,
  phone,
  permission: null,
  isLoggedIn: false,
  status: "pending",
  ...defaultPlugin,
  fullName: "",
  accountId: "",
  warehouseId: [],
  currentWarehouse: ""
});

export const barCodeOptions: { label: string; value: BarcodeSymbology }[] = productBarcodeSymbology.map((code) => {
  return {
    label: startCase(code),
    value: code
  };
});
export const productStatusOptions: { label: string; value: ProductStatus }[] = productStatus.map(
  (status: ProductStatus) => {
    return {
      label: startCase(status),
      value: status
    };
  }
);
export const productDefaults = (): ProductProps => {
  return {
    name: "",
    brandId: "",
    alertQuantity: 0,
    barcodeSymbology: "code128",
    categoryId: "",
    productCodeId: "",
    productSellingPrice: 0,
    productUnitPrice: 0,
    status: "draft",
    supplierId: "",
    unitId: "",
    accountId: "",
    availability: "offlineOnly",
    canExpire: false,
    expirationDate: null,
    createdAt: new Date(),
    createdBy: "",
    deleted: false,
    deletedAt: new Date(),
    deletedBy: "",
    description: "",
    dimensions: {
      height: 0,
      length: 0,
      width: 0
    },
    isFeatured: false,
    primaryImageId: "",
    secondaryImages: [],
    SKU: "",
    tags: [],
    taxId: "",
    taxType: undefined,
    updatedAt: new Date(),
    updatedBy: "",
    warehouseIds: [],
    weight: 0
  };
};
export const supplierDefaults = (): SupplierProps => {
  return {
    email: "",
    name: "",
    phone: {
      country: "gh",
      number: "",
      prefix: "233"
    },
    ...defaultPlugin,
    address,
    accountId: "",
    warehouseId: "",
    status: "active"
  };
};

export const stockDataDefault = (): StockDataProps => {
  return {
    productId: "",
    quantityExpected: 0,
    quantityReceived: 0,
    remarks: "",
    section: "",
    status: "partially received",
    batchId: ""
  };
};
export const stockDefault = (): StockProps => {
  return {
    accountId: "",
    deliveryId: "",
    stockData: [stockDataDefault()],
    supplierId: "",
    warehouseId: "",
    truckNumber: "",
    ...defaultPlugin,
    receivedDate: new Date(),
    status: "pending"
  };
};

export const defaultCustomer = (): CustomerProps => {
  return {
    ...defaultPlugin,
    accountId: "",
    warehouseId: "",
    email: "",
    firstName: "",
    gender: undefined,
    lastName: "",
    address,
    phone,
    dateOfBirth: undefined
  };
};
