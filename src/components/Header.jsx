import React from 'react';
import logoImg from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, isAuthenticated, openAuthModal, logout, currentPage, setCurrentPage } = useAuth();

  return (
    <header className="wrap">
      <div className="header-row">
        <div
          className="logo"
          onClick={() => setCurrentPage('home')}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <img src={logoImg} alt="Learning Flow" />
          <div className="logo-text">LEARNING FLOW</div>
        </div>

        <div className="header-actions">
          <a
            className="li-link"
            href="https://www.linkedin.com/company/learningflow23/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="li-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
              </svg>
            </span>
            Follow Us
          </a>

          {!isAuthenticated ? (
            <button
              type="button"
              className="login-nav-btn"
              onClick={openAuthModal}
            >
              <svg viewBox="0 0 24 24" className="nav-user-icon" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Login / Sign Up</span>
            </button>
          ) : (
            <div className="user-nav-profile">
              <div
                className="user-greeting-badge"
                onClick={() => setCurrentPage(currentPage === 'authenticated' ? 'home' : 'authenticated')}
                title="Go to Dashboard"
                role="button"
                tabIndex={0}
              >
                <img
                  src={user?.picture || 'https://ui-avatars.com/api/?name=User'}
                  alt={user?.name}
                  className="user-avatar-img"
                />
                <span className="user-greeting-text">
                  Welcome back, <strong>{user?.name || 'Member'}</strong>
                </span>
              </div>

              <button
                type="button"
                className="nav-logout-btn"
                onClick={logout}
                title="Sign Out"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

