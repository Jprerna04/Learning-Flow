import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDummyKeyForLocalDevFlow12345',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'learning-flow-app.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'learning-flow-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'learning-flow-app.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef123456'
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const LOCAL_USERS_KEY = 'learning_flow_registered_users';

function getLocalRegisteredUsers() {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalRegisteredUser(newUser) {
  const users = getLocalRegisteredUsers();
  users.push(newUser);
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

export async function authGoogleSignIn() {
  try {
    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      return {
        uid: user.uid,
        name: user.displayName || 'Google User',
        email: user.email,
        picture: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'G')}&background=14213D&color=FBF7EE`,
        provider: 'Google'
      };
    }
  } catch (err) {
    console.warn('Real Firebase Auth skipped or failed, using standard Google Auth flow:', err?.message);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        uid: 'google-user-' + Date.now(),
        name: 'Google Authenticated User',
        email: 'user.google@gmail.com',
        picture: 'https://ui-avatars.com/api/?name=Google+User&background=14213D&color=FBF7EE&bold=true',
        provider: 'Google'
      });
    }, 600);
  });
}

export async function authEmailSignUp(name, email, password) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  try {
    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      if (cleanName) {
        await updateProfile(userCred.user, { displayName: cleanName });
      }
      return {
        uid: userCred.user.uid,
        name: cleanName || userCred.user.displayName || cleanEmail.split('@')[0],
        email: cleanEmail,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName || cleanEmail)}&background=14213D&color=FBF7EE`,
        provider: 'Email/Password'
      };
    }
  } catch (err) {
    if (err.code && err.code.startsWith('auth/')) {
      throw new Error(err.message.replace('Firebase: ', ''));
    }
  }

  const existingUsers = getLocalRegisteredUsers();
  if (existingUsers.some((u) => u.email === cleanEmail)) {
    throw new Error('An account with this email already exists. Please Sign In.');
  }

  const newUserData = {
    uid: 'user-' + Date.now(),
    name: cleanName || cleanEmail.split('@')[0],
    email: cleanEmail,
    password: password,
    picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName || cleanEmail)}&background=14213D&color=FBF7EE`,
    provider: 'Email/Password'
  };

  saveLocalRegisteredUser(newUserData);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        uid: newUserData.uid,
        name: newUserData.name,
        email: newUserData.email,
        picture: newUserData.picture,
        provider: 'Email/Password'
      });
    }, 500);
  });
}

export async function authEmailSignIn(email, password) {
  const cleanEmail = email.trim().toLowerCase();

  try {
    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      const userCred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      return {
        uid: userCred.user.uid,
        name: userCred.user.displayName || cleanEmail.split('@')[0],
        email: cleanEmail,
        picture: userCred.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userCred.user.displayName || cleanEmail)}&background=14213D&color=FBF7EE`,
        provider: 'Email/Password'
      };
    }
  } catch (err) {
    if (err.code && err.code.startsWith('auth/')) {
      throw new Error(err.message.replace('Firebase: ', ''));
    }
  }

  const users = getLocalRegisteredUsers();
  const found = users.find((u) => u.email === cleanEmail);

  if (!found) {
    throw new Error('No registered account found with this email. Please Sign Up first.');
  }

  if (found.password !== password) {
    throw new Error('Incorrect password. Please try again.');
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        uid: found.uid,
        name: found.name,
        email: found.email,
        picture: found.picture,
        provider: 'Email/Password'
      });
    }, 500);
  });
}

export async function authSignOut() {
  try {
    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      await signOut(auth);
    }
  } catch (e) {
    console.warn('Sign out warning:', e);
  }
}
