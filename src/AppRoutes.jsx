// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/layout/Layout';

// Importazioni lazy per migliorare le performance
const Dashboard = React.lazy(() => import('./scenes/dashboard'));
const Projects = React.lazy(() => import('./scenes/projects'));
const ProjectDetails = React.lazy(() => import('./scenes/projects/ProjectDetails'));
const Tasks = React.lazy(() => import('./scenes/tasks'));
const TaskDetail = React.lazy(() => import('./scenes/tasks/TaskDetail')); // Nome file corretto
const Calendar = React.lazy(() => import('./scenes/calendar'));
const Documents = React.lazy(() => import('./scenes/documents'));
const DocumentEditor = React.lazy(() => import('./scenes/documents/DocumentEditor'));
const Team = React.lazy(() => import('./scenes/team'));
const Reports = React.lazy(() => import('./scenes/reports'));
const Settings = React.lazy(() => import('./scenes/settings'));
const Login = React.lazy(() => import('./scenes/auth/Login'));
const Register = React.lazy(() => import('./scenes/auth/Register'));
const NotFound = React.lazy(() => import('./scenes/NotFound'));

// Componente di fallback durante il caricamento
const Fallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    Caricamento...
  </div>
);

// Route protetta che verifica l'autenticazione
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  return (
    <React.Suspense fallback={<Fallback />}>
      <Routes>
        {/* Route pubbliche */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/" /> : <Register />
        } />
        
        {/* Route protette all'interno del layout principale */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<TaskDetail />} /> {/* Componente rinominato */}
          <Route path="calendar" element={<Calendar />} />
          <Route path="documents" element={<Documents />} />
          <Route path="documents/:id" element={<DocumentEditor />} />
          <Route path="team" element={<Team />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Route non trovata */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;