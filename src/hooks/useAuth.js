// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout, fetchUserData } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [initialized, setInitialized] = useState(false);
  
  // Inizializza l'autenticazione all'avvio dell'app
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Verifica se l'utente è già autenticato
        if (!isAuthenticated && localStorage.getItem('token')) {
          await dispatch(fetchUserData()).unwrap();
        }
      } catch (error) {
        console.error('Errore durante l\'inizializzazione dell\'autenticazione:', error);
      } finally {
        setInitialized(true);
      }
    };
    
    initAuth();
  }, [dispatch, isAuthenticated]);
  
  // Funzione per effettuare il login
  const handleLogin = useCallback(async (credentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);
  
  // Funzione per effettuare la registrazione
  const handleRegister = useCallback(async (userData) => {
    try {
      await dispatch(register(userData)).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);
  
  // Funzione per effettuare il logout
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  
  return {
    currentUser,
    isAuthenticated,
    loading,
    error,
    initialized,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  };
};