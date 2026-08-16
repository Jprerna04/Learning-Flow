import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authEmailSignIn, authEmailSignUp } from '../services/firebase';

export default function GoogleAuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogleUser } = useAuth();
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const resetFormState = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setShowPassword(false);
  };

  const handleSwitchTab = (mode) => {
    setAuthMode(mode);
    resetFormState();
  };

  // Email Sign In
  const handleEmailSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please provide both email address and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = await authEmailSignIn(email, password);
      loginWithGoogleUser(userData);
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Email Sign Up / Create Account
  const handleEmailSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please choose a password.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = await authEmailSignUp(name, email, password);
      loginWithGoogleUser(userData);
    } catch (err) {
      setErrorMsg(err.message || 'Account creation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={closeAuthModal}>
      <div
        className="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="modal-close-btn"
          onClick={closeAuthModal}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="auth-modal-header">
          <h2>Welcome to Learning Flow</h2>
          <p className="auth-modal-sub">
            {authMode === 'signin' ? 'Sign in to access your account' : 'Create your account to get started'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
            onClick={() => handleSwitchTab('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
            onClick={() => handleSwitchTab('signup')}
          >
            Create Account
          </button>
        </div>

        {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

        {authMode === 'signin' && (
          <form onSubmit={handleEmailSignInSubmit} className="auth-email-form">
            <div className="field-group">
              <label htmlFor="authEmail">Email Address</label>
              <input
                type="email"
                id="authEmail"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <div className="label-row">
                <label htmlFor="authPassword">Password</label>
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="authPassword"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-auth-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        )}

        {authMode === 'signup' && (
          <form onSubmit={handleEmailSignUpSubmit} className="auth-email-form">
            <div className="field-group">
              <label htmlFor="signupName">Full Name</label>
              <input
                type="text"
                id="signupName"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="signupEmail">Email Address</label>
              <input
                type="email"
                id="signupEmail"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <div className="label-row">
                <label htmlFor="signupPassword">Password</label>
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="signupPassword"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="signupConfirm">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="signupConfirm"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-auth-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        <div className="auth-modal-footer">
          <p>Protected by Learning Flow Security</p>
        </div>
      </div>
    </div>
  );
}
