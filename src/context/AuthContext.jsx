import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'learning_flow_auth_user';
const PAGE_KEY = 'learning_flow_current_page';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const savedPage = localStorage.getItem(PAGE_KEY);
      return savedPage || 'home';
    } catch (e) {
      return 'home';
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(PAGE_KEY, currentPage);
  }, [currentPage]);

  const loginWithGoogleUser = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    setCurrentPage('authenticated');
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('home');
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PAGE_KEY);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        currentPage,
        setCurrentPage,
        loginWithGoogleUser,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
