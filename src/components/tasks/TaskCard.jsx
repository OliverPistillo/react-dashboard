// src/components/tasks/TaskCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Avatar, 
  AvatarGroup,
  IconButton,
  Tooltip,
  LinearProgress
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  
  // Determina il colore in base alla priorità
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'error';
      case 'media': return 'warning';
      case 'bassa': return 'success';
      default: return 'default';
    }
  };
  
  // Calcola la percentuale di completamento
  const calculateProgress = (completedSubtasks, totalSubtasks) => {
    if (totalSubtasks === 0) return 0;
    return (completedSubtasks / totalSubtasks) * 100;
  };
  
  const handleCardClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <Card 
      sx={{ 
        boxShadow: 2,
        '&:hover': {
          boxShadow: 4,
          cursor: 'pointer'
        },
        position: 'relative'
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ pb: 1 }}>
        {/* Titolo e priorità */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {task.title}
          </Typography>
          <Chip 
            label={task.priority} 
            color={getPriorityColor(task.priority)} 
            size="small"
          />
        </Box>
        
        {/* Descrizione */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {task.description}
        </Typography>
        
        {/* Tag */}
        <Box sx={{ mb: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {task.tags?.map(tag => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small" 
              variant="outlined" 
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
        </Box>
        
        {/* Barra di progresso */}
        {task.subtasks && (
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                {`${task.completedSubtasks}/${task.totalSubtasks} sottotask`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`${calculateProgress(task.completedSubtasks, task.totalSubtasks)}%`}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={calculateProgress(task.completedSubtasks, task.totalSubtasks)} 
              sx={{ height: 6, borderRadius: 1 }}
            />
          </Box>
        )}
        
        {/* Footer con data, allegati, commenti e assegnati */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1.5
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Scadenza">
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
                <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true, locale: it })}
                </Typography>
              </Box>
            </Tooltip>
            
            {task.attachments > 0 && (
              <Tooltip title={`${task.attachments} allegati`}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
                  <AttachmentIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    {task.attachments}
                  </Typography>
                </Box>
              </Tooltip>
            )}
            
            {task.comments > 0 && (
              <Tooltip title={`${task.comments} commenti`}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MessageIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    {task.comments}
                  </Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
          
          <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
            {task.assignees?.map(user => (
              <Tooltip key={user.id} title={user.name}>
                <Avatar src={user.avatar} alt={user.name} />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;