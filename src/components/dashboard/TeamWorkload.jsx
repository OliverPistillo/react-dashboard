// src/components/dashboard/TeamWorkload.jsx
import React from 'react';
import { Box, Typography, Avatar, LinearProgress, Tooltip, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

const TeamWorkload = () => {
  const theme = useTheme();
  const { members } = useSelector((state) => state.team);
  const { tasks } = useSelector((state) => state.tasks);
  
  // Calcola il carico di lavoro per ogni membro del team
  const calculateWorkload = (memberId) => {
    const assignedTasks = tasks.filter(task => 
      task.assignees?.some(assignee => assignee.id === memberId) && 
      task.status !== 'complete'
    );
    
    // Semplice calcolo: ogni membro può gestire max 10 task contemporaneamente
    const workloadPercentage = Math.min(100, (assignedTasks.length / 10) * 100);
    
    return {
      taskCount: assignedTasks.length,
      percentage: workloadPercentage
    };
  };
  
  // Determina il colore in base al carico di lavoro
  const getWorkloadColor = (percentage) => {
    if (percentage >= 80) return theme.palette.error.main;
    if (percentage >= 50) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Carico di Lavoro Team
      </Typography>
      
      <Box sx={{ mt: 2, maxHeight: 260, overflow: 'auto' }}>
        {members.map((member) => {
          const workload = calculateWorkload(member.id);
          
          return (
            <Box 
              key={member.id} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2 
              }}
            >
              <Avatar 
                src={member.avatar} 
                alt={member.name}
                sx={{ width: 32, height: 32, mr: 1.5 }}
              />
              
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {member.name}
                  </Typography>
                  <Typography variant="caption">
                    {workload.taskCount} task
                  </Typography>
                </Box>
                
                <Tooltip 
                  title={`${Math.round(workload.percentage)}% di carico`}
                  placement="top"
                >
                  <LinearProgress
                    variant="determinate"
                    value={workload.percentage}
                    sx={{ 
                      height: 8, 
                      borderRadius: 1,
                      backgroundColor: theme.palette.action.hover,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getWorkloadColor(workload.percentage)
                      }
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TeamWorkload;