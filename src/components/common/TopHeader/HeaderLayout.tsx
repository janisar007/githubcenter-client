import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { apiService } from "@/api/apiService";
import { useEffect } from "react";

const HeaderLayout = () => {
  const { user, isSignedIn } = useUser();

  const { username } = useParams();
  if (!user) return null;
  const un = user.username || user.id; // fallback if no username

  if (username !== un) {
    return <Navigate to={`/${un}/dashboard`} replace />;
  }
  
    // useEffect(() => {
    //   if (isSignedIn && user) {
    //     const username = user.username || user.id;
    //     navigate(`/${username}/dashboard`, { replace: true });
    //   }
    // }, [isSignedIn, user, navigate]);
  
  
    useEffect(() => {
      const fetchAndStoreUser = async () => {
        if (isSignedIn) {
          // Check if already stored
          const existingId = localStorage.getItem("userId");
          if (!existingId) {
            try {
              const userInfo = await apiService.getUserInfo(user.id, user.emailAddresses[0]?.emailAddress) // Your API call
              console.log(userInfo);
              if (userInfo?.data?._id) {
                localStorage.setItem("userId", userInfo.data._id);
                localStorage.setItem("email", userInfo.data.email);
                // localStorage.setItem("userInfo", JSON.stringify(userInfo)); // optional
              }
            } catch (error:any) {
              console.error("Failed to fetch user info:", error);
              throw new Error(error)
            }
          }
        }
      };
  
      fetchAndStoreUser();
    }, [isSignedIn]);
  



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
