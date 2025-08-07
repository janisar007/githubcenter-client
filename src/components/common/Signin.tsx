import { apiService } from "@/api/apiService";
import { SignIn } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAndStoreUser = async () => {
      if (isSignedIn && user) {

        // const existingId = localStorage.getItem("userId");
        // if (!existingId) {
        //   try {
        //     const userInfo = await apiService.getUserInfo(
        //       user.id,
        //       user.emailAddresses[0]?.emailAddress
        //     );
            // console.log(userInfo);
            // if (userInfo?.data?._id) {
            //   localStorage.setItem("userId", userInfo.data._id);
            //   localStorage.setItem("email", userInfo.data.email);
            //   // sessionStorage.setItem("userId", userInfo.data._id);
            //   // sessionStorage.setItem("email", userInfo.data.email);
            // }
        //   } catch (error: any) {
        //     console.error("Failed to fetch user info:", error);
        //   }
        // }

        navigate(`/landing`, { replace: true });
      }
    };

    fetchAndStoreUser();
  }, [isSignedIn, user, navigate]);

  return <SignIn path="/signin" routing="path" />;
}
