// src/App.jsx
import React, { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { fetchUserData } from './store/slices/authSlice';
import { fetchProjects } from './store/slices/projectSlice';
import { fetchTasks } from './store/slices/taskSlice';
import { fetchTeamMembers } from './store/slices/teamSlice';
import { fetchDocuments } from './store/slices/documentSlice';
import AppRoutes from './AppRoutes';
import { ColorModeContext, useMode } from './theme';
import TaskModal from './components/tasks/TaskModal';
import Notifications from './components/common/Notifications';
import LoadingScreen from './components/common/LoadingScreen';

const App = () => {
  const dispatch = useDispatch();
  const [theme, colorMode] = useMode();
  const { isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);
  const { loading: projectsLoading } = useSelector((state) => state.projects);
  const { loading: tasksLoading } = useSelector((state) => state.tasks);
  
  // Carica i dati iniziali dell'applicazione
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserData());
      dispatch(fetchProjects());
      dispatch(fetchTasks());
      dispatch(fetchTeamMembers());
      dispatch(fetchDocuments());
    }
  }, [dispatch, isAuthenticated]);
  
  // Mostra schermata di caricamento durante l'inizializzazione dell'app
  const isInitialLoading = authLoading || projectsLoading || tasksLoading;
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <BrowserRouter>
            <CssBaseline />
            {isInitialLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <AppRoutes />
                <TaskModal />
                <Notifications />
              </>
            )}
          </BrowserRouter>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;