import Dashboard from "@/pages/private/Dashboard";
import type { RouteConfig } from "../types/routes";

export const privateRoutes: RouteConfig[] = [
  {
    id: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    exact: true,
  },
];
