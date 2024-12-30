import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/not-found.svg" ;
import { Button } from "./ui/button";

// Not Found component
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
      <Button>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
