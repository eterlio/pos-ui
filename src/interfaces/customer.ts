import { AddressProps, DefaultPluginProps, PhoneProps } from ".";
import { Gender } from "./users";

export interface CustomerProps extends DefaultPluginProps {
  _id?: string;
  firstName: string;
  lastName: string;
  phone?: PhoneProps;
  dateOfBirth?: Date;
  email: string;
  gender?: Gender;
  address?: AddressProps;
  accountId: string;
  warehouseId: string;
}
