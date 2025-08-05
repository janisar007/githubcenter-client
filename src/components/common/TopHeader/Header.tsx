// import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { LuChevronsUpDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


export const Header = () => {
  // const { signOut } = useClerk();
  const navigate = useNavigate();

  // const handleSignOut = async () => {
  //   // Clear localStorage
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("email");

  //   // Sign out with Clerk
  //   await signOut();

  //   // Navigate to sign-in page
  //   navigate("/signin");
  // };

  return (
    <header className="bg-vol-50 shadow-sm border-b-2 flex items-center">
      <div className="ml-4 h-[75px] w-[75px] flex items-center">
        <img src="/final_gc_logo_inverted_removebg.png" alt="loading" className="h-[30px] w-[220px] cursor-pointer" onClick={() => navigate("/landing")} />
      </div>
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <nav className="flex space-x-4">
          
          <div className="text-cgray-dtext hover hover:bg-white px-2 py-[0.22rem] hover:rounded-sm hover:border hover:text-gray-800 hover:border-gray-300 border border-vol-50 cursor-pointer flex justify-between gap-2 items-center text-sm hover:shadow-xs">
            <span className="font-medium">
              Personal workspace

            </span>
            <LuChevronsUpDown className="text-cgray-ntext"/>
          </div>
        </nav>
        <div className="flex items-center space-x-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};
