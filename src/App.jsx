import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthenticatedPage from './pages/AuthenticatedPage';
import GoogleAuthModal from './components/GoogleAuthModal';

function MainRouter() {
  const { currentPage } = useAuth();

  return (
    <>
      <GoogleAuthModal />
      {currentPage === 'authenticated' ? <AuthenticatedPage /> : <HomePage />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}
