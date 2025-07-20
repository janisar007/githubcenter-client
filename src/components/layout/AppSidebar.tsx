// components/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ShieldCheck,
  Lock,
  Globe,
  Settings2,
  KeyRound,
  Scale,
  BookText,
} from "lucide-react";

const authItems = [
  { title: "Email, phone, username", value: "email", icon: LayoutDashboard },
  { title: "SSO connections", value: "sso", icon: Globe },
  { title: "Web3", value: "web3", icon: Globe },
  { title: "Multi-factor", value: "mfa", icon: ShieldCheck },
  { title: "Restrictions", value: "restrictions", icon: Lock },
  { title: "Attack protection", value: "attack", icon: ShieldCheck },
];

const sessionItems = [
  { title: "Sessions", value: "sessions", icon: KeyRound },
  { title: "JWT templates", value: "jwt", icon: Settings2 },
];

const complianceItems = [{ title: "Legal", value: "legal", icon: Scale }];

const featureItems = [{ title: "Features", value: "features", icon: BookText }];

export function AppSidebar({
  variant = "inset",
  collapsible = "icon",
}: {
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  return (
    // <div className="h-64">

    <Sidebar
      variant={variant}
      collapsible={collapsible}
      className="w-64 border-r h-full"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>User & Authentication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton asChild>
                    <a
                      href={`#${item.value}`}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Session Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessionItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton asChild>
                    <a
                      href={`#${item.value}`}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Compliance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {complianceItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton asChild>
                    <a
                      href={`#${item.value}`}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Feature Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {featureItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton asChild>
                    <a
                      href={`#${item.value}`}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>

    // </div>
  );
}
