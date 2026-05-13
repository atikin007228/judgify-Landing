import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
<<<<<<< HEAD
import CompetitionPage from "./pages/CompetitionPage"
=======
import CompetitionPage from "./pages/CompetitionPage";
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/competitions/:id" element={<CompetitionPage />} />
      </Routes>
    </BrowserRouter>
  );
}