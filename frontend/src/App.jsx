import React from 'react';
import LandingPage from './pages/LandingPage';

export default function App() {
  const isAuthenticated = true;
  return <LandingPage isAuthenticated={isAuthenticated} />;
}
