import React from 'react';

export default function Header({ isAuthenticated, search, onSearchChange }) {
  return (
    <header className="landing-header">
      <div className="menu-btn">---</div>
      <div className="search-wrap">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
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
        )}
      </div>
    </header>
  );
}
