import { PermissionOperation, PermissionString } from "@/helpers/permission";
import { AddressProps, DefaultPluginProps, PhoneProps } from ".";

export type UserRole = "admin" | "support" | "manager";

export const userRoles: UserRole[] = ["admin", "support"];

export const specialRoles: UserRole[] = userRoles.filter((role: UserRole) => ["admin", "support"].includes(role));

export type Gender = "male" | "female" | "non-binary" | "other";
export const genders: Gender[] = ["female", "male", "non-binary", "other"];
export type UserStatus = "active" | "suspended" | "pending" | "inactive";

export const userStatuses: UserStatus[] = ["active", "suspended", "pending", "inactive"];

export interface UserProps extends DefaultPluginProps {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: UserRole;
  gender?: Gender;

  address?: AddressProps;
  phone?: PhoneProps;
  status?: UserStatus;
  isLoggedIn?: boolean;
  userPermissions?: string;
  userPermission?: {
    [key in PermissionString]?: PermissionOperation[];
  };
  // virtuals
  permission?: any;
  fullName?: string;
}

export interface AuthUserResponse extends UserProps {
  accessToken: string;
}
