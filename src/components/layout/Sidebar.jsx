// src/components/layout/Sidebar.jsx
import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  Avatar,
  Tooltip
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Dashboard as DashboardIcon,
  Today as TodayIcon,
  Assignment as AssignmentIcon,
  Folder as FolderIcon,
  Group as GroupIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Description as DescriptionIcon,
  ChevronLeft as ChevronLeftIcon,
  Article as ArticleIcon,
  QuestionAnswer as QuestionAnswerIcon
} from '@mui/icons-material';

// Definizione degli elementi della sidebar
const sidebarItems = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { title: 'Progetti', icon: <FolderIcon />, path: '/projects' },
  { title: 'Attività', icon: <AssignmentIcon />, path: '/tasks' },
  { title: 'Calendario', icon: <TodayIcon />, path: '/calendar' },
  { title: 'Documenti', icon: <DescriptionIcon />, path: '/documents' },
  { title: 'Team', icon: <GroupIcon />, path: '/team' },
  { title: 'Reports', icon: <BarChartIcon />, path: '/reports' },
  { title: 'Impostazioni', icon: <SettingsIcon />, path: '/settings' }
];

const Sidebar = ({ isNonMobile, drawerWidth, isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);
  
  // Determina se un item è attivo in base al path corrente
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo e titolo */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <Box display="flex" alignItems="center">
          <ArticleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main}>
            ProjectFlow
          </Typography>
        </Box>
        {isNonMobile && (
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider />
      
      {/* Profilo utente */}
      <Box p={2} display="flex" alignItems="center">
        <Avatar 
          src={currentUser?.avatar} 
          alt={currentUser?.name}
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {currentUser?.name || 'Utente'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser?.role || 'Ruolo non specificato'}
          </Typography>
        </Box>
      </Box>
      
      <Divider />
      
      {/* Lista menu principale */}
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {sidebarItems.map((item) => (
          <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: isSidebarOpen ? 'initial' : 'center',
                px: 2.5,
                borderRadius: '8px',
                mx: 1,
                my: 0.5,
                backgroundColor: isActive(item.path) 
                  ? theme.palette.primary.main + '1A' // 10% di opacità
                  : 'transparent'
              }}
            >
              <Tooltip title={!isSidebarOpen ? item.title : ''} placement="right">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isSidebarOpen ? 2 : 'auto',
                    justifyContent: 'center',
                    color: isActive(item.path) 
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              <ListItemText 
                primary={item.title} 
                sx={{ 
                  opacity: isSidebarOpen ? 1 : 0,
                  color: isActive(item.path) 
                    ? theme.palette.primary.main
                    : theme.palette.text.primary
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      {/* Supporto */}
      <Box p={2}>
        <ListItemButton
          onClick={() => navigate('/help')}
          sx={{
            borderRadius: '8px',
            height: 48
          }}
        >
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText primary="Supporto" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: drawerWidth },
        flexShrink: { lg: 0 }
      }}
    >
      {isNonMobile ? (
        <Drawer
          variant="permanent"
          open={isSidebarOpen}
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
              }),
              width: isSidebarOpen ? drawerWidth : '80px',
              overflowX: 'hidden'
            }
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;