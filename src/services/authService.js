// src/services/authService.js
import api from './api';
import { mockUsers } from '../data/mockData';

// Per ora utilizziamo dati mock, in futuro saranno sostituiti con chiamate API reali
const authService = {
  login: async (credentials) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Trova un utente che corrisponde alle credenziali
        const user = mockUsers.find(u => u.email === credentials.email);
        
        if (user && credentials.password === 'password') { // Semplice controllo per il mock
          const token = 'mock-jwt-token';
          localStorage.setItem('token', token);
          resolve({ user, token });
        } else {
          reject({ message: 'Credenziali non valide' });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.post('/auth/login', credentials);
  },
  
  register: async (userData) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Controlla se l'email è già in uso
        const existingUser = mockUsers.find(u => u.email === userData.email);
        
        if (existingUser) {
          reject({ message: 'Email già in uso' });
        } else {
          const newUser = {
            id: `user${mockUsers.length + 1}`,
            name: userData.name,
            email: userData.email,
            role: userData.role || 'Utente',
            avatar: null,
            joinDate: new Date().toISOString()
          };
          
          const token = 'mock-jwt-token';
          localStorage.setItem('token', token);
          resolve({ user: newUser, token });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.post('/auth/register', userData);
  },
  
  getUserData: async () => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ritorna un utente mock (il primo dell'array)
        resolve(mockUsers[0]);
      }, 500);
    });
    
    // Implementazione reale
    // return api.get('/auth/me');
  },
  
  updateProfile: async (userData) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Finge di aggiornare l'utente e ritorna i dati aggiornati
        resolve({ ...mockUsers[0], ...userData });
      }, 800);
    });
    
    // Implementazione reale
    // return api.put('/auth/profile', userData);
  },
  
  logout: () => {
    localStorage.removeItem('token');
    
    // Implementazione reale
    // return api.post('/auth/logout');
  },
  
  forgotPassword: async (email) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Se l\'indirizzo email è registrato, riceverai istruzioni per reimpostare la password.' });
      }, 800);
    });
    
    // Implementazione reale
    // return api.post('/auth/forgot-password', { email });
  },
  
  resetPassword: async (token, newPassword) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Password reimpostata con successo' });
      }, 800);
    });
    
    // Implementazione reale
    // return api.post('/auth/reset-password', { token, newPassword });
  }
};

export default authService;