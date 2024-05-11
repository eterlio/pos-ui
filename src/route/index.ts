import { RoutesProps } from "@/interfaces/route";
import { AUTH_ROUTES } from "./auth";
import { MISCELLANEOUS_ROUTES } from "./miscellaneous";
import { USER_ROUTES } from "./users";

export const ROUTES: RoutesProps[] = [
  ...AUTH_ROUTES,
  ...MISCELLANEOUS_ROUTES,
  ...USER_ROUTES
];
