import type { RouteConfig } from "../types/routes";
import { SignIn } from "../pages/public/SignIn";
import { Register } from "../pages/public/Register";

export const publicRoutes: RouteConfig[] = [
  {
    id: "signin",
    path: "/signin",
    component: SignIn,
    exact: true,
  },
  {
    id: "register",
    path: "/register",
    component: Register,
    exact: true,
  },
];