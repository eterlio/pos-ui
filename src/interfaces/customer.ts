import { AddressProps, DefaultPluginProps, PhoneProps } from ".";
import { Gender, UserProps } from "./users";

export interface CustomerProps extends DefaultPluginProps {
  _id?: string;
  firstName: string;
  lastName: string;
  phone?: PhoneProps;
  dateOfBirth?: Date;
  email: string;
  gender: Gender;
  address?: AddressProps;
  accountId: string;
  warehouseId: string;

  //   virtuals
  createdByData?: UserProps;
}
