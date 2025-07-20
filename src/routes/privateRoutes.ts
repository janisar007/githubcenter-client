import Dashboard from "@/pages/private/Dashboard/Dashboard";
// import Home from "@/pages/private/Home";
import type { RouteConfig } from "../types/routes";
import MainTabLayout from "@/layouts/MainTabLayout";
import Configures from "@/pages/private/Configures/Configures";

export const privateRoutes: RouteConfig[] = [

  // Actual pages
  {
    id: "dashboard",
    path: "dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    id: "configures",
    path: "configures",
    component: Configures,
    exact: true,
  },



  // Testing or Reference Pages

  {
    id: "mainlayout", // it has full sidebar 
    path: "config",
    component: MainTabLayout,
    exact: true,
  },
];
