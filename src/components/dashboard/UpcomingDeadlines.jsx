// src/components/dashboard/UpcomingDeadlines.jsx
import React from 'react';
import { Box, Typography, Chip, Divider, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { format, differenceInDays, isPast } from 'date-fns';
import { it } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const UpcomingDeadlines = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);
  
  // Filtra task con scadenza futura e ancora non completati
  const upcomingTasks = [...tasks]
    .filter(task => task.status !== 'complete' && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5); // Mostra solo i primi 5
  
  // Determina lo stato di urgenza in base alla data di scadenza
  const getUrgencyStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysLeft = differenceInDays(due, today);
    
    if (isPast(due)) return { label: 'Scaduto', color: theme.palette.error.main };
    if (daysLeft <= 2) return { label: `${daysLeft} giorni`, color: theme.palette.error.main };
    if (daysLeft <= 5) return { label: `${daysLeft} giorni`, color: theme.palette.warning.main };
    return { label: `${daysLeft} giorni`, color: theme.palette.success.main };
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Scadenze Imminenti
      </Typography>
      
      <Box sx={{ mt: 1 }}>
        {upcomingTasks.length > 0 ? (
          upcomingTasks.map((task, index) => {
            const urgency = getUrgencyStatus(task.dueDate);
            const project = projects.find(p => p.id === task.projectId);
            
            return (
              <React.Fragment key={task.id}>
                {index > 0 && <Divider sx={{ my: 1.5 }} />}
                
                <Box 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { 
                      backgroundColor: theme.palette.action.hover,
                      borderRadius: 1
                    },
                    p: 0.5
                  }}
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="body2" fontWeight="medium">
                      {task.title}
                    </Typography>
                    <Chip 
                      label={urgency.label}
                      size="small"
                      sx={{ 
                        backgroundColor: urgency.color,
                        color: '#fff',
                        fontSize: '0.7rem',
                        height: 20
                      }}
                    />
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {project?.name || 'Nessun progetto'}
                  </Typography>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    Scadenza: {format(new Date(task.dueDate), 'd MMMM yyyy', { locale: it })}
                  </Typography>
                </Box>
              </React.Fragment>
            );
          })
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Nessuna scadenza imminente
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UpcomingDeadlines;