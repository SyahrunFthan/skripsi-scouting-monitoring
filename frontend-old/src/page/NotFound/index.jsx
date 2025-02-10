import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl font-semibold text-gray-800 md:text-3xl">
          Oops! Page not found.
        </p>
        <p className="mt-4 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500 focus:ring focus:ring-blue-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
