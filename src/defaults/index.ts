import { UserProps } from "@/interfaces/users";
import { AddressProps, DefaultPluginProps, PhoneProps, RequestStateProps } from "../interfaces";
import { BarcodeSymbology, ProductProps, ProductStatus, productBarcodeSymbology, productStatus } from "@/interfaces/products";
import { startCase } from "lodash";

export const defaultPlugin: DefaultPluginProps = {
  createdAt: new Date(),
  updatedBy: "",
  updatedAt: new Date(),
  deleted: false,
  deletedAt: new Date(),
  deletedBy: "",
  createdBy: ""
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
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: null,
  address,
  phone,
  status: null,
  permission: null,
  isLoggedIn: false,
  ...defaultPlugin
});

export const barCodeOptions: { label: string; value: BarcodeSymbology }[] = productBarcodeSymbology.map((code) => {
  return {
    label: startCase(code),
    value: code
  };
});
export const productStatusOptions: { label: string; value: ProductStatus }[] = productStatus.map((status) => {
  return {
    label: startCase(status),
    value: status
  };
});
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
    _id: "",
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
    id: "",
    isFeatured: false,
    primaryImageId: "",
    secondaryImages: [],
    SKU: "",
    tags: [],
    taxId: "",
    taxType: null,
    updatedAt: new Date(),
    updatedBy: "",
    warehouseIds: [],
    weight: 0
  };
};
