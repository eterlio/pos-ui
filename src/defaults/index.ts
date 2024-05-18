import { UserProps } from "@/interfaces/users";
import {
  AddressProps,
  DefaultPluginProps,
  PhoneProps,
  RequestStateProps,
} from "../interfaces";

export const defaultPlugin: DefaultPluginProps = {
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
  permission: null,
  isLoggedIn: false,
  ...defaultPlugin,
});

