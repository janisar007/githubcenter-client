import { useClerk } from "@clerk/clerk-react";
import { Button } from "../ui/button";

export const Logout = () => {

  const { signOut } = useClerk();
  
    const handleSignOut = async () => {
      // Clear localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
  
      // Sign out with Clerk
      await signOut({ redirectUrl: "/landing" });
    };
  

  return <button className="red-button" onClick={handleSignOut}>Log out</button>;
};