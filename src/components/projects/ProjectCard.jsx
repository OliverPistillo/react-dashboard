// src/components/projects/ProjectCard.jsx
import React from 'react';
import { Box, Card, CardContent, Typography, Chip, LinearProgress, Avatar, AvatarGroup, Tooltip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { format, isPast, isToday, addDays, differenceInDays } from 'date-fns';
import { it } from 'date-fns/locale';

const ProjectCard = ({ project }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Determina il colore dello stato del progetto
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return theme.palette.primary.main;
      case 'complete': return theme.palette.success.main;
      case 'planning': return theme.palette.info.main;
      case 'onHold': return theme.palette.warning.main;
      default: return theme.palette.grey[500];
    }
  };
  
  // Ottieni una stringa leggibile per la scadenza
  const getDeadlineString = (endDate) => {
    const date = new Date(endDate);
    if (isPast(date) && !isToday(date)) {
      return `Scaduto il ${format(date, 'd MMM yyyy', { locale: it })}`;
    } else if (isToday(date)) {
      return 'Scade oggi';
    } else {
      const daysLeft = differenceInDays(date, new Date());
      if (daysLeft <= 7) {
        return `Scade tra ${daysLeft} giorni`;
      } else {
        return `Scade il ${format(date, 'd MMM yyyy', { locale: it })}`;
      }
    }
  };
  
  // Determina il colore della scadenza in base all'urgenza
  const getDeadlineColor = (endDate) => {
    const date = new Date(endDate);
    if (isPast(date) && !isToday(date)) {
      return theme.palette.error.main;
    } else if (isToday(date)) {
      return theme.palette.error.main;
    } else {
      const daysLeft = differenceInDays(date, new Date());
      if (daysLeft <= 3) {
        return theme.palette.error.main;
      } else if (daysLeft <= 7) {
        return theme.palette.warning.main;
      } else {
        return theme.palette.success.main;
      }
    }
  };
  
  // Gestisce il click sulla card
  const handleCardClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4]
        }
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Chip
            label={project.status}
            size="small"
            sx={{
              bgcolor: getStatusColor(project.status),
              color: 'white'
            }}
          />
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
          {project.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2, 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {project.description}
        </Typography>
        
        <Box sx={{ mb: 1.5 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="body2" color="text.secondary">
              Progresso
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{ 
              height: 6, 
              borderRadius: 1,
              bgcolor: theme.palette.background.default
            }}
          />
        </Box>
        
        <Box display="flex" alignItems="center" mt={1.5}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: getDeadlineColor(project.endDate),
              fontWeight: 'medium'
            }}
          >
            {getDeadlineString(project.endDate)}
          </Typography>
        </Box>
        
        <Box flexGrow={1} />
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Cliente: {project.client || 'N/A'}
            </Typography>
          </Box>
          
          <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24 } }}>
            {project.members?.map(memberId => (
              <Tooltip key={memberId} title="Nome membro">
                <Avatar src="/placeholder-avatar.jpg" />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;