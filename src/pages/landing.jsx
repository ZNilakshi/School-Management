import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // 1. Extract token from URL if your backend sends it as a query param
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
          localStorage.setItem("accessToken", token);
        }

        // 2. Verify the user (using the token from localStorage)
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          
          }
        );

        // 3. If successful, store user data and redirect
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/dashboard"); 
        } else {
          throw new Error("No user data received");
        }
      } catch (err) {
        setError("Login failed. Redirecting...");
        console.error("Login error:", err);
        setTimeout(() => navigate("/"), 2000); // Redirect after showing error
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Logging you in...</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>Please wait while we authenticate your account.</p>
        )}
      </div>
    </div>
  );
};

export default LoginSuccess;