import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./NavBar.css"; // Import the CSS file for additional styles

const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-indigo-600 text-2xl font-bold hover:text-indigo-400 transition duration-300"
        >
          Job Board
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className="nav-link text-gray-700 px-3 py-2 rounded-lg transition duration-300"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="nav-link text-gray-700 px-3 py-2 rounded-lg transition duration-300"
              >
                My Profile
              </Link>
              <button
                onClick={logout}
                className="text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-full transition duration-300 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="nav-link text-gray-700 px-3 py-2 rounded-lg transition duration-300"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-full transition duration-300 shadow-md"
              >
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
