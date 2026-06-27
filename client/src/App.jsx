import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import MoodPage from "./pages/MoodPage";
import Dashboard from "./pages/Dashboard";
import JournalPage from "./pages/JournalPage";
import ChatPage from "./pages/ChatPage";
import GratitudePage from "./pages/GratitudePage";
import InsightsPage from "./pages/InsightsPage";
import RequireAuth from "./components/RequireAuth";
import JournalNewPage from "./pages/JournalNewPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/gratitude" element={<GratitudePage />} />
      <Route path="/journal/new" element={<JournalNewPage />} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/mood" element={<MoodPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
