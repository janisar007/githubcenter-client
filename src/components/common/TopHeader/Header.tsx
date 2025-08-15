// import { Link, useNavigate } from "react-router-dom";
import { 
  // useClerk,
   UserButton } from "@clerk/clerk-react";
import { LuChevronsUpDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Logout } from "../Logout";


export const Header = () => {
  // const { signOut } = useClerk();
  const navigate = useNavigate();


  return (
    <header className="bg-vol-50 shadow-sm border-b-2 flex items-center px-2 lg:px-4 py-[0.65rem]">

     
      <div className="">
            <img
            onClick={() => navigate("/landing")}
              src="/final_gc_logo_inverted_removebg.png"
              className="cursor-pointer lg:h-12 lg:w-24 lg:ml-7 h-8 w-16 bg-vol-50 rounded-sm lg:rounded-lg border"
            />
          </div>

      {/* <div className="ml-4 h-[75px] w-[75px] flex items-center">
        <img src="/final_gc_logo_inverted_removebg.png" alt="loading" className="h-[30px] w-[220px] cursor-pointer" onClick={() => navigate("/landing")} />
      </div> */}
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
          {/* <Logout/> */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};
