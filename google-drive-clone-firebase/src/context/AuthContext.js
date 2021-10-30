import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  async function signup(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  }
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }
  async function logout() {
    return auth.signOut();
  }
  async function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  async function updateUserEmail(currentUser, email) {
    return updateEmail(currentUser, email);
  }
  async function updateUserPassword(currentUser, password) {
    return updatePassword(currentUser, password);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    forgotPassword,
    updateUserEmail,
    updateUserPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
