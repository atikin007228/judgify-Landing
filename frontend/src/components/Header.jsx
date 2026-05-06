<<<<<<< HEAD
import React from 'react';

export default function Header({ isAuthenticated, search, onSearchChange }) {
  return (
    <header className="landing-header">
      <div className="menu-btn">---</div>
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header({
  search,
  onSearchChange,
  onOpenSignUp,
  onOpenSignIn,
}) {
  const { user, logout } = useAuth();
  const isAuthenticated = Boolean(user);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="landing-header">
      <div className="menu-btn">---</div>

>>>>>>> 262b48c57091b92905204c03decba36efb600002
      <div className="search-wrap">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
<<<<<<< HEAD
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="header-actions">
        <button className="lang-btn">🌐 en</button>
        {isAuthenticated ? (
          <button className="profile-btn">👤</button>
        ) : (
          <>
            <button className="auth-btn">Sign Up</button>
            <button className="auth-btn">Log In</button>
          </>
=======
          value={search || ""}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      <div className="header-actions">
        <button className="lang-btn">🌐 en</button>

        {!isAuthenticated ? (
          <div className="auth-actions-group">
            <button className="auth-btn" onClick={onOpenSignUp}>
              Sign Up
            </button>
            <button className="auth-btn" onClick={onOpenSignIn}>
              Sign In
            </button>
          </div>
        ) : (
          <div className="avatar-menu-wrapper">
            <button
              className="profile-btn"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {user?.displayName?.[0] || "👤"}
            </button>

            {menuOpen && (
              <div className="account-dropdown">
                <Link to="/profile">Profile</Link>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
>>>>>>> 262b48c57091b92905204c03decba36efb600002
        )}
      </div>
    </header>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 262b48c57091b92905204c03decba36efb600002
