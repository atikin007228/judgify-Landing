<<<<<<< HEAD
import React from 'react';
import LandingPage from './pages/LandingPage';

export default function App() {
  const isAuthenticated = true;
  return <LandingPage isAuthenticated={isAuthenticated} />;
}
=======
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
>>>>>>> 262b48c57091b92905204c03decba36efb600002
