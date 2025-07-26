import React from "react";
import { FcGoogle } from "react-icons/fc";

const WelcomePage = () => {
  const handleGoogleLogin = () => {
    // Placeholder – integrate with Firebase or OAuth here
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-xl w-full text-center">
        <img
          src="/school-logo.png"
          alt="School Logo"
          className="mx-auto mb-4 w-20 h-20"
        />
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Welcome to Future A/L Academy
        </h1>
        <p className="text-gray-600 mb-6">
          Register for your A/L streams and connect with expert teachers in
          Science, Maths, Commerce, and Technology.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-300 rounded-xl bg-white hover:shadow-md transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
        </button>

        <p className="mt-6 text-sm text-gray-400">
          Admin & Teacher logins available on the dashboard page.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
