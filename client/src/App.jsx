import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import JournalPage from "./pages/JournalPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/journal" element={<JournalPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
    </Routes>
  );
}

export default App;
