import React from 'react';

export default function SuccessState() {
  return (
    <div className="success-state" id="successState">
      <div className="check">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 13l4 4L19 7"
            stroke="#14213D"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3>You're 1 step ahead.</h3>
      <p>Stay tuned for more updates.</p>
      <a
        className="li-link-success"
        href="https://www.linkedin.com/company/learningflow23/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
        </svg>
        Follow Learning Flow on LinkedIn
      </a>
    </div>
  );
}
