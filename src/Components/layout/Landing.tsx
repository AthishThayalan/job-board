import React from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaUserShield, FaClipboardList } from "react-icons/fa";

const HomePage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl"></div>
        <div className="w-72 h-72 bg-indigo-400 opacity-20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative p-8 bg-white rounded-xl shadow-2xl max-w-3xl w-full backdrop-blur-lg bg-opacity-80">
        <h1 className="mb-6 text-5xl font-extrabold text-gray-800 text-center">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Welcome to Job Board
          </span>
        </h1>
        <p className="mb-6 text-lg text-gray-700 text-center">
          Connecting talent with opportunity. Find your dream job or hire top
          talent today!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <FaBriefcase className="w-12 h-12 mb-2 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-700">Find Jobs</h3>
            <p className="text-gray-600 text-sm text-center">
              Explore thousands of job listings tailored to your skills.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <FaUserShield className="w-12 h-12 mb-2 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-700">
              Secure Platform
            </h3>
            <p className="text-gray-600 text-sm text-center">
              Your information is safe with our secure platform.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <FaClipboardList className="w-12 h-12 mb-2 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-700">
              Easy Application
            </h3>
            <p className="text-gray-600 text-sm text-center">
              Apply to jobs in just a few clicks with a simple process.
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <Link to="/">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300">
              Home
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300">
              Register
            </button>
          </Link>
        </div>
      </div>

      <footer className="relative mt-10 text-gray-600 text-sm text-center">
        &copy; 2024 Athish is the goat. All Rights Reserved.
      </footer>
    </div>
  );
};

export default HomePage;
