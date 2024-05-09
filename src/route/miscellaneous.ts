import { RoutesProps } from "@/interfaces/route";
import Home from "@/pages/shared/Home";


export const MISCELLANEOUS_ROUTES: RoutesProps[] = [
{
    component: Home,
    url: "/",
    requireAuth: false
}
];
