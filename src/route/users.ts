import { RoutesProps } from "@/interfaces/route";
import CreateUserScreen from "@/pages/users/CreateUserScreen";

export const USER_ROUTES: RoutesProps[] = [
  {
    component: CreateUserScreen,
    url: "/users/create",
    permission: ["users", "create"],
    requireAuth: true
  }
];
