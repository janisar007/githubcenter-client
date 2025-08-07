import { Navigate, Outlet
  
  // , useNavigate 
} from "react-router-dom";
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const HeaderLayout = () => {
  const { user } = useUser();

  const { username } = useParams();
  if (!user) return null;
  const un = user.username || user.id; // fallback if no username

  if (username !== un) {
    return <Navigate to={`/${un}/dashboard`} replace />;
  }
  



  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderLayout;
