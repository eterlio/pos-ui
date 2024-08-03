import { DefaultPluginProps, AddressProps, PhoneProps } from ".";

export type SupplierStatus = "active" | "inactive";

export interface SupplierProps extends DefaultPluginProps {
  _id?: string;
  name: string;
  email: string;
  phone: PhoneProps;
  address: AddressProps;
  status?: SupplierStatus;
  accountId?: string;
  warehouseId?: string;
}