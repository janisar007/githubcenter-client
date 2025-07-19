import { Link, useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

export const Header = () => {
    const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

    const handleSignOut = async () => {
    // Clear localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("email");

    // Sign out with Clerk
    await signOut();

    console.log("asdfdsfsf")
    
    // Navigate to sign-in page
    navigate("/signin");
  };
    console.log("eeeeeeeeeeeee")

  return (
    <header className="bg-cgray-first shadow-sm border-b-2">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <nav className="flex space-x-4">
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/home" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSignOut}
            className="red-button p-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};