import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook

const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function

  return (
    <nav className="bg-indigo-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Job Board
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <button onClick={logout} className="text-white hover:text-gray-200">
              Logout
            </button>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-gray-200">
                Register
              </Link>
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
