import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";


import HeaderLayout from "@/components/common/TopHeader/HeaderLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { useUser } from "@clerk/clerk-react";
import PrivateLayout from "@/layouts/PrivateLayout";

export const AppRoutes = () => {
    
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        {publicRoutes.map(({ id, path, component: Component }) => (
          <Route key={id} path={path} element={<Component />} />
        ))}
      </Route>

      {/* Private Pages with dynamic username */}
      <Route
        path=":username"
        element={
          <PrivateLayout>
            <HeaderLayout />
          </PrivateLayout>
        }
      >
        {privateRoutes.map(({ id, path, component: Component }) => (
          <Route key={id} path={path} element={<Component />} />
        ))}
      </Route>

      {/* Redirect root to /{username}/dashboard */}
      <Route
        path="/"
        element={
          <RedirectToUserDashboard />
        }
      />

      {/* Fallback */}
      <Route path="*" element={<RedirectToUserDashboard  />} />
    </Routes>
  );
};

export const RedirectToUserDashboard = () => {
  const { user } = useUser();
  if (!user) return <Navigate to={`/landing`} replace />;



  const un = user.id; // fallback if no username

  return <Navigate to={`/${un}/dashboard`} replace />;
};
