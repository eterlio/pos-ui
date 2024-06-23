import { RoutesProps } from "@/interfaces/route";
import Dashboard from "@/pages/dashboard/AdminDashboard";
import OtherRoleDashboard from "@/pages/dashboard/OtherRoleDashboard";
import Home from "@/pages/shared/Home";
import ForgotPasswordScreen from "@/pages/shared/auth/ForgotPasswordScreen";
import LoginScreen from "@/pages/shared/auth/LoginScreen";
import ResetPasswordScreen from "@/pages/shared/auth/ResetPassword";
import VerifyAccountScreen from "@/pages/shared/auth/VerifyAccountScreen";

export const AUTH_ROUTES: RoutesProps[] = [
  {
    component: LoginScreen,
    url: "/auth/login",
    routeName: "login"
  },
  {
    component: ForgotPasswordScreen,
    url: "/auth/forgot-password"
  },
  {
    component: ResetPasswordScreen,
    url: "/auth/reset-password"
  },
  {
    component: VerifyAccountScreen,
    url: "/auth/verify-account"
  },
  {
    component: Dashboard,
    url: "/dashboard/admin",
    requireAuth: true,
    allowedRoles: ["admin"]
  },
  {
    component: OtherRoleDashboard,
    url: "/dashboard/:role",
    requireAuth: true,
    allowedRoles: ["manager", "sales-personnel", "support", "super-admin"]
  },
  {
    component: Home,
    url: "/",
    requireAuth: false
  }
];
