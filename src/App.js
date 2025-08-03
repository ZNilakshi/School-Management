// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/home";
import ServicePage from "./pages/service"; 
import LoginSuccess from "./pages/landing"; 
import Dashboard from "./pages/dashboard"; 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;