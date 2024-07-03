import React, { useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { PermissionOperation, PermissionString, hasPermission } from "@/helpers/permission";
import { Meta } from "@/interfaces/route";
import { UserRole, specialRoles } from "@/interfaces/user";
import { StoreContext, StoreContextProps } from "@/utils/store";
import { useBaseRequestService } from "@/hooks/request/useAxiosPrivate";

interface RequireAuthProps {
  permission: [PermissionString, PermissionOperation];
  allowedRoles?: UserRole[];
  meta?: Meta;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ permission, allowedRoles, meta }) => {
  const { authUser: auth } = useContext(StoreContext) as StoreContextProps;
  const location = useLocation();
  const userRole = auth?.role;
  const permissionVerified =
    permission && permission.length ? hasPermission(String(auth?.permission?.access), permission) : true;

  const { getInitData } = useBaseRequestService({
    useToken: true,
    tokenType: "accessToken"
  });

  useEffect(() => {
    getInitData();
  }, [location.pathname]);

  // Check if userRole is admin or support
  if (userRole && [...specialRoles, "admin"].includes(userRole)) {
    return <Outlet context={{ meta }} />;
  }

  // Check if userRole exists and no specific permission is required
  if (userRole && !permission && !allowedRoles?.length) {
    return <Outlet context={{ meta }} />;
  }

  // Check if userRole has the required permission
  if (userRole && permissionVerified) {
    if (!allowedRoles || !allowedRoles.length) {
      return <Outlet context={{ meta }} />;
    }
    if (allowedRoles && allowedRoles.length && allowedRoles.includes(userRole as UserRole)) {
      return <Outlet context={{ meta }} />;
    } else {
      return <Navigate to="/unauthorized" state={{ from: location }} />;
    }
  }
  if (userRole && !permissionVerified) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  // Default case: navigate to login if none of the conditions are met
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default RequireAuth;
