import Dashboard from "@/pages/private/Dashboard/Dashboard";
// import Home from "@/pages/private/Home";
import type { RouteConfig } from "../types/routes";
import MainTabLayout from "@/layouts/MainTabLayout";

export const privateRoutes: RouteConfig[] = [
  {
    id: "dashboard",
    path: "dashboard",
    component: Dashboard,
    exact: true,
  },

  {
    id: "mainlayout",
    path: "config",
    component: MainTabLayout,
    exact: true,
  },
];
