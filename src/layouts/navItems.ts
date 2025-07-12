import type { NavItem } from "../types/layout";
import Dashboard from "@/pages/private/Dashboard";  
import  YourPost  from "../pages/private/YourPost/index"; 
import  NewPost  from "../pages/private/AddNewPost/index";
import { FaTachometerAlt, FaUsers } from "react-icons/fa";
import { SingleFeedPost } from "@/pages/private/SingleFeedPost/SingleFeedPost";

export const navItems: NavItem[] = [
  // Sidebar pages
  {
    id: "dashboard",
    name: "Dashboard",
    icon: FaTachometerAlt,
    path: "/dashboard",
    showInSidebar: true,
    component: Dashboard,
  },
  {
    id: "yourpost",
    name: "You Posts",
    icon: FaUsers,
    component: YourPost,
    path: "/youpost",
    showInSidebar: true,
  },





  // Private pages not in sidebar

  {
    id: "newPost",
    name: "New Post",
    // icon: PeopleIcon,
    component: NewPost,
    path: "/newpost",
    showInSidebar: false,
  },

  {
    id: "singleFeedPost",
    name: "Single Feed Post",
    // icon: PeopleIcon,
    component: SingleFeedPost,
    path: "/singleFeedPost",
    showInSidebar: false,
  },

];