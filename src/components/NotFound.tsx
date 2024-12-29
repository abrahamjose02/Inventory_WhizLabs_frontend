import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/not-found.svg" ;

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
      <img src={notFoundImage} alt="Page not found" className="w-64 h-auto" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
