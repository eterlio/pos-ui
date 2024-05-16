import { RoutesProps } from "@/interfaces/route";
import CreateUserScreen from "@/pages/users/CreateUserScreen";
import ListUsersScreen from "@/pages/users/ListUsersScreen";
import UpdateUserScreen from "@/pages/users/UpdateUserScreen";

export const USER_ROUTES: RoutesProps[] = [
  {
    component: ListUsersScreen,
    url: "/users",
    permission: ["users", "read"],
    requireAuth: true
  },
  {
    component: CreateUserScreen,
    url: "/users/create",
    permission: ["users", "create"],
    requireAuth: true
  },
  {
    component: UpdateUserScreen,
    url: "/users/:id",
    permission: ["users", "update"],
    requireAuth: true
  }
];
