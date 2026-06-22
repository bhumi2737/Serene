import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import MoodPage from "./pages/MoodPage";
import Dashboard from "./pages/Dashboard";
import JournalPage from "./pages/JournalPage";
import ChatPage from "./pages/ChatPage";
import GratitudePage from "./pages/GratitudePage";
import RequireAuth from "./components/RequireAuth";
import JournalNewPage from "./pages/JournalNewPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
            <Route path="/gratitude" element={<GratitudePage />} />
          <Route path="/journal/new" element={<JournalNewPage />} />
        <Route path="/journal" element={<JournalPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/mood" element={<MoodPage />} />
    </Routes>
  );
}

export default App;
