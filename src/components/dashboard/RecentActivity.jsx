// src/components/dashboard/RecentActivity.jsx
import React from 'react';
import { Box, Typography, Avatar, Divider, useTheme, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { format, formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DoneIcon from '@mui/icons-material/Done';
import ArticleIcon from '@mui/icons-material/Article';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const RecentActivity = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { notifications } = useSelector((state) => state.ui);
  
  // Genera attività fittizie basate sulle notifiche
  const recentActivities = notifications
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5); // Solo le prime 5
  
  // Determina l'icona in base al tipo di attività
  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment_added':
        return <CommentIcon fontSize="small" />;
      case 'task_assigned':
        return <AssignmentIcon fontSize="small" />;
      case 'task_completed':
        return <DoneIcon fontSize="small" />;
      case 'document_updated':
        return <ArticleIcon fontSize="small" />;
      default:
        return <CommentIcon fontSize="small" />;
    }
  };
  
  // Determina il colore dell'icona in base al tipo di attività
  const getActivityIconColor = (type) => {
    switch (type) {
      case 'comment_added':
        return theme.palette.info.main;
      case 'task_assigned':
        return theme.palette.warning.main;
      case 'task_completed':
        return theme.palette.success.main;
      case 'document_updated':
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Attività Recenti
        </Typography>
        
        <IconButton 
          size="small" 
          onClick={() => navigate('/notifications')}
        >
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Box>
      
      <Box sx={{ mt: 1 }}>
        {recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              {index > 0 && <Divider sx={{ my: 1.5 }} />}
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  '&:hover': { 
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: 1
                  },
                  p: 0.5
                }}
                onClick={() => navigate(activity.link)}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    mr: 1.5,
                    bgcolor: getActivityIconColor(activity.type)
                  }}
                >
                  {getActivityIcon(activity.type)}
                </Avatar>
                
                <Box>
                  <Typography variant="body2">
                    {activity.message}
                  </Typography>
                  
                  <Typography variant="caption" color="text.secondary">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true, locale: it })}
                  </Typography>
                </Box>
              </Box>
            </React.Fragment>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Nessuna attività recente
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RecentActivity;