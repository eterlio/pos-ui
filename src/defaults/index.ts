import { UserProps } from "@/interfaces/users";
import { AddressProps, DefaultPluginProps, PhoneProps, RequestStateProps } from "../interfaces";
import { SupplierProps } from "@/interfaces/supplier";

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
  address,
  phone,
  permission: null,
  isLoggedIn: false,
  ...defaultPlugin
});

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
