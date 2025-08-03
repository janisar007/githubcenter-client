import { SignUp } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function Signup() {

  useEffect(() => {
      localStorage.clear();
      sessionStorage.clear();
      console.log("Storage cleared on sign out");
    }, []);

  return <SignUp redirectUrl="/" />;
}