import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import {
  PermissionOperation,
  PermissionString,
  hasPermission,
} from "@/helpers/permission";
import { Meta } from "@/interfaces/route";
import { UserRole } from "@/interfaces/users";
import { StoreContext, StoreContextProps } from "@/utils/store";

interface RequireAuthProps {
  permission: [PermissionString, PermissionOperation];
  allowedRoles?: UserRole[];
  meta?: Meta;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  permission,
  allowedRoles,
  meta,
}) => {
  const {authUser: auth } = useContext(StoreContext) as StoreContextProps;
  const location = useLocation();
  const userRole = auth?.role;
  const permissionVerified = hasPermission(
    String(auth?.permission?.access),
    permission
  );  

  // Check if userRole is admin or support
  if (userRole && ["admin", "support"].includes(userRole)) {
    return <Outlet context={{ meta }} />;
  }

  // Check if userRole exists and no specific permission is required
  if (userRole && !permission) {
    return <Outlet context={{ meta }} />;
  }

  // Check if userRole has the required permission
  if (userRole && permissionVerified) {
    // Check if allowedRoles is not defined or userRole is in allowedRoles
    if (!allowedRoles || allowedRoles.includes(userRole as UserRole)) {
      return <Outlet context={{ meta }} />;
    } else {
      // UserRole is not in allowedRoles, navigate to unauthorized
      return <Navigate to="/notFound" state={{ from: location }} replace />;
    }
  }
  if (userRole && !permissionVerified){
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }


  // Default case: navigate to login if none of the conditions are met
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default RequireAuth;
