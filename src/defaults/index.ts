import { UserProps } from "@/interfaces/users";
import {
  AddressProps,
  IDefaultPlugin,
  PhoneProps,
  RequestStateProps,
} from "../interfaces";

export const defaultPlugin: IDefaultPlugin = {
  createdAt: new Date(),
  updatedBy: "",
  updatedAt: new Date(),
  deleted: false,
  deletedAt: new Date(),
  deletedBy: "",
  createdBy: "",
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
  poBox: "",
};

export const phone: PhoneProps = {
  prefix: "",
  number: "",
  country: "",
};

export const initialRequestState: RequestStateProps = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
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
  isLoggedIn: false,
  permission: null,
  subscriptionDataLayer: null,
  ...defaultPlugin,
});

