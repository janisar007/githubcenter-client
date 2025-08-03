import { apiService } from "@/api/apiService";
import { SignIn } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {

  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSignedIn && user) {
  //     const username = user.username || user.id;
  //     navigate(`/${username}/dashboard`, { replace: true });
  //   }
  // }, [isSignedIn, user, navigate]);
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    console.log("Storage cleared on sign out");
  }, []);


  useEffect(() => {
    const fetchAndStoreUser = async () => {
      if (isSignedIn && user) {
        const username = user.id;

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

        // Redirect to user dashboard
        navigate(`/${username}/dashboard`, { replace: true });
      }
    };

    fetchAndStoreUser();
  }, [isSignedIn, user, navigate]);
  return <SignIn path="/signin" routing="path" />
}