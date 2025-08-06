import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineMenuAlt4 } from "react-icons/hi";


export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const clerkId = user?.id;
  const navigate = useNavigate();

  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    // Clear localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("email");

    // Sign out with Clerk
    await signOut({ redirectUrl: "/landing" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b h-[4.2rem] md:h-auto flex ">
      <div className="flex items-center w-full justify-between ">
        <nav className="px-2 lg:px-4 py-4 flex items-center gap-3 lg:gap-5 lg:ml-7">
          <div className="">
            <img
              src="final_gc_logo_inverted_removebg.png"
              className="lg:h-12 lg:w-24 h-8 w-16 bg-vol-50 rounded-sm lg:rounded-lg"
            />
          </div>
          <ul className="lg:ml-6 gap-2 lg:gap-4 text-cgray-dtext font-sans font-medium text-[0.5rem] lg:text-sm hidden md:flex">
            <li>
              <a href="#services" className="hover:text-vol-300">
                Services
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-vol-300">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-vol-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-vol-300">
                About
              </a>
            </li>
          </ul>
        </nav>

        <div className="mr-4 flex items-center gap-3 ">
          {isSignedIn ? (
            <button
              className="text-[12px] lg:text-sm hover:bg-gray-100 rounded-sm px-2 py-1 cursor-pointer font-medium"
              onClick={handleSignOut}
            >
              {" "}
              Sign out
            </button>
          ) : (
            <button
              className="text-[12px] lg:text-sm hover:bg-gray-100 rounded-sm px-2 py-1 cursor-pointer font-medium"
              onClick={() => navigate(`/signin`, { replace: true })}
            >
              {" "}
              Sign in
            </button>
          )}

          {isSignedIn ? (
            <button
              className="px-[12px] lg:px-[12px] py-[4px] lg:py-[7px] rounded-[6px] lg:rounded-[8px] font-semibold text-[10px] lg:text-[12px] text-white border border-[#141414] cursor-pointer transition-all duration-200 ease-in shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.5)] hover:bg-none"
              style={{
                background: "linear-gradient(to bottom, #2b2b2b, #1c1c1c)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to bottom, #3a3a3a, #2a2a2a)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to bottom, #2b2b2b, #1c1c1c)";
              }}
              onClick={() =>
                navigate(`/${clerkId}/dashboard`, { replace: true })
              }
            >
              Dashboard
            </button>
          ) : (
            <button
              className="px-[6px] lg:px-[12px] py-[4px] lg:py-[7px] rounded-[5px] lg:rounded-[8px] font-semibold text-[6px] lg:text-[12px] text-white border border-[#141414] cursor-pointer transition-all duration-200 ease-in shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.5)] hover:bg-none"
              style={{
                background: "linear-gradient(to bottom, #2b2b2b, #1c1c1c)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to bottom, #3a3a3a, #2a2a2a)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to bottom, #2b2b2b, #1c1c1c)";
              }}
            >
              Start Exploring
            </button>
          )}

          {/* Hamburger menu */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <HiOutlineMenuAlt4 className="text-xl" />
          </button>
        </div>
      </div>

      {/* Slide-out menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-full backdrop-blur-sm bg-white/80 shadow-lg z-40 transform transition-transform duration-100 ease-in-out ${
          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col">

            
          <div className="flex justify-between bg-cgray-first py-[1.11rem] items-center">

            <div className=" ml-2">
            <img
              src="final_gc_logo_inverted_removebg.png"
              className="lg:h-12 lg:w-24 h-8 w-16 bg-vol-50 rounded-sm lg:rounded-lg"
            />
          </div>
            <div className="mr-4 flex items-center gap-3 ">
              {isSignedIn ? (
                <button
                  className="text-[12px] lg:text-sm hover:bg-gray-100 rounded-sm px-2 py-1 cursor-pointer font-medium"
                  onClick={handleSignOut}
                >
                  {" "}
                  Sign out
                </button>
              ) : (
                <button
                  className="text-[12px] lg:text-sm hover:bg-gray-100 rounded-sm px-2 py-1 cursor-pointer font-medium"
                  onClick={() => navigate(`/signin`, { replace: true })}
                >
                  {" "}
                  Sign in
                </button>
              )}

              {isSignedIn ? (
                <button
                  className="px-[12px] lg:px-[12px] py-[4px] lg:py-[7px] rounded-[6px] lg:rounded-[8px] font-semibold text-[10px] lg:text-[12px] text-white border border-[#141414] cursor-pointer transition-all duration-200 ease-in shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.5)] hover:bg-none"
                  style={{
                    background: "linear-gradient(to bottom, #2b2b2b, #1c1c1c)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #3a3a3a, #2a2a2a)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #2b2b2b, #1c1c1c)";
                  }}
                  onClick={() =>
                    navigate(`/${clerkId}/dashboard`, { replace: true })
                  }
                >
                  Dashboard
                </button>
              ) : (
                <button
                  className="px-[6px] lg:px-[12px] py-[4px] lg:py-[7px] rounded-[5px] lg:rounded-[8px] font-semibold text-[6px] lg:text-[12px] text-white border border-[#141414] cursor-pointer transition-all duration-200 ease-in shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.5)] hover:bg-none"
                  style={{
                    background: "linear-gradient(to bottom, #2b2b2b, #1c1c1c)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #3a3a3a, #2a2a2a)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #2b2b2b, #1c1c1c)";
                  }}
                >
                  Start Exploring
                </button>
              )}

              <button
              onClick={() => setMenuOpen(false)}
              className="mt-2 mr-1 mb-2 cursor-pointer"
            >
              <RxCross2 />
            </button>
            </div>
            
          </div>

          <div className="flex flex-col p-4 gap-4 text-gray-800 font-semibold text-lg">
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services
            </a>

            <div className="border-b-[0.1rem] border-gray-100" />

            <a href="#pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </a>

            <div className="border-b-[0.1rem] border-gray-100" />

            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>

            <div className="border-b-[0.1rem] border-gray-100" />

            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
