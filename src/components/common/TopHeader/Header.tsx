import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import AccountPage from "./AccountPage";

export const Header = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    // Clear localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("email");

    // Sign out with Clerk
    await signOut();

    // Navigate to sign-in page
    navigate("/signin");
  };

  return (
    <header className="bg-vol-50 shadow-sm border-b-2 flex items-center">
      <div className="ml-4 h-[75px] w-[75px] flex items-center">
        <img src="/bblogogc.jpg" alt="loading" className="h-[40px] w-[40px]" />
      </div>
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <nav className="flex space-x-4">
          <Link to="/dashboard" className="text-vol-950 hover:text-vol-800">
            Dashboard
          </Link>
          <Link to="/home" className="text-vol-950 hover:text-vol-800">
            Home
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};
