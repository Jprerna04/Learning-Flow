import React from 'react';
import logoImg from '../assets/logo.png';

export default function Header() {
  return (
    <header className="wrap">
      <div className="header-row">
        <div className="logo">
          <img src={logoImg} alt="Learning Flow" />
          <div className="logo-text">LEARNING FLOW</div>
        </div>
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
      </div>
    </header>
  );
}
