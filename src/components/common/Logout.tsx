import { useClerk } from "@clerk/clerk-react";
import { Button } from "../ui/button";

export const Logout = () => {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({ redirectUrl: "/signin" }); // Logs the user out
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};