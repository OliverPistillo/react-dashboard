/ src/components/layout/Topbar.jsx
import React, { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  Badge,
  Avatar,
  Divider,
  ListItemIcon,
  Tooltip,
  Button
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  NotificationsOutlined as NotificationsIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { ColorModeContext } from '../../theme';
import { setTaskModal } from '../../store/slices/uiSlice';

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colorMode = React.useContext(ColorModeContext);
  const { currentUser } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.ui);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };
  
  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  const handleNewTask = () => {
    dispatch(setTaskModal({ open: true }));
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: theme.palette.background.default,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Pulsante menu e campo di ricerca */}
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: theme.palette.background.paper,
              borderRadius: 1,
              p: '0.25rem 0.5rem',
              width: '300px',
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
            <InputBase 
              placeholder="Cerca..." 
              sx={{ ml: 1, flex: 1 }} 
            />
          </Box>
        </Box>
        
        {/* Azioni e profilo utente */}
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleNewTask}
            sx={{ 
              mr: 2, 
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark }
            }}
          >
            Nuova Attività
          </Button>
          
          <Tooltip title="Cambia tema">
            <IconButton onClick={colorMode.toggleColorMode} sx={{ mr: 1 }}>
              {theme.palette.mode === 'dark' ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Notifiche">
            <IconButton 
              onClick={handleNotificationsOpen}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Profilo">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              sx={{ ml: 1 }}
            >
              <Avatar 
                src={currentUser?.avatar} 
                alt={currentUser?.name}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      
      {/* Menu profilo */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 200
          }
        }}
      >
        <Box sx={{ py: 1, px: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {currentUser?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser?.email}
          </Typography>
        </Box>
        
        <Divider />
        
        <MenuItem onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profilo
        </MenuItem>
        
        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Impostazioni
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      
      {/* Menu notifiche */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320
          }
        }}
      >
        <Box sx={{ py: 1, px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Notifiche
          </Typography>
          {notifications.length > 0 && (
            <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>
              Segna tutte come lette
            </Typography>
          )}
        </Box>
        
        <Divider />
        
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem 
              key={notification.id}
              onClick={() => {
                handleNotificationsClose();
                // Naviga alla risorsa correlata
                if (notification.link) {
                  navigate(notification.link);
                }
              }}
              sx={{ 
                py: 1.5,
                px: 2,
                borderLeft: notification.read ? 'none' : `3px solid ${theme.palette.primary.main}`,
                bgcolor: notification.read ? 'transparent' : theme.palette.action.hover
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight={notification.read ? 'normal' : 'bold'}>
                  {notification.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.message}
                </Typography>
                <Typography 
                  variant="caption" 
                  display="block" 
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {new Date(notification.timestamp).toLocaleString('it-IT')}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Nessuna notifica
            </Typography>
          </Box>
        )}
      </Menu>
    </AppBar>
  );
};

export default Topbar;