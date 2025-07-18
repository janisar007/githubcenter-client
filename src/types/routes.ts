
// types/routes.ts
export interface RouteConfig {
  id: string;
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}
