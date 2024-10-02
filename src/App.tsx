import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/authentication/LoginPage";
import RegisterForm from "./Components/authentication/RegisterForm";
import LandingPage from "./Components/layout/Landing";
import HomePage from "./Components/layout/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
