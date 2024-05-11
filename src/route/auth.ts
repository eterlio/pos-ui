import { RoutesProps } from "@/interfaces/route";
import Dashboard from "@/pages/admin/Dashboard";
import Home from "@/pages/shared/Home";
import ForgotPasswordScreen from "@/pages/shared/auth/ForgotPasswordScreen";
import LoginScreen from "@/pages/shared/auth/LoginScreen";
import ResetPasswordScreen from "@/pages/shared/auth/ResetPassword";


export const AUTH_ROUTES: RoutesProps[] = [
{
    component:  LoginScreen,
    url: "/auth/login",
    routeName:"login",
},
{
    component: ForgotPasswordScreen,
    url: "/auth/forgot-password"
},
{
    component: ResetPasswordScreen,
    url: "/auth/password-recovery"
},
{
    component: Dashboard,
    url: "/dashboard/:role",
    requireAuth: true
},
{
    component: Home,
    url: "/",
    requireAuth: false
}
];
