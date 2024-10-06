import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Components/authentication/LoginPage";
import RegisterForm from "./Components/authentication/RegisterForm";
import LandingPage from "./Components/layout/Landing";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
