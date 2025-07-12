// import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export interface NavItem {
  id: string;
  name: string;
  icon?: any; // Using Lucide icons which are included with shadcn/ui
  component: ComponentType<any>;
  path: string;
  showInSidebar: boolean;
}

export interface NavListItemProps {
  item: NavItem;
  open: boolean;
  active?: boolean;
  onClick: () => void;
}