import type { RouteConfig } from "../types/routes";
import { SignIn } from "../pages/public/SignIn";
import { Register } from "../pages/public/Register";
import LandingPage from "@/pages/public/LandingPage/LandingPage";

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
  {
    id: "landing",
    path: "/landing",
    component: LandingPage,
    exact: true,
  },
];