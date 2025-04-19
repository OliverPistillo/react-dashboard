// src/components/dashboard/ProjectsOverview.jsx
import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  LinearProgress, 
  Grid, 
  Chip, 
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PieChart } from '@nivo/pie';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { differenceInDays, format, isPast } from 'date-fns';
import { it } from 'date-fns/locale';

const ProjectsOverview = () => {
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);
  
  // Filtra solo i progetti attivi
  const activeProjects = projects.filter(project => project.status === 'active');
  
  // Calcola le statistiche per il grafico a torta
  const calculateTasksStatusData = () => {
    const statusCount = { todo: 0, inProgress: 0, review: 0, complete: 0 };
    
    tasks.forEach(task => {
      if (statusCount[task.status] !== undefined) {
        statusCount[task.status]++;
      }
    });
    
    return Object.keys(statusCount).map(status => ({
      id: status,
      label: {
        todo: 'Da fare',
        inProgress: 'In corso',
        review: 'In revisione',
        complete: 'Completate'
      }[status],
      value: statusCount[status],
      color: {
        todo: '#e0e0e0',
        inProgress: '#64b5f6',
        review: '#fff176',
        complete: '#81c784'
      }[status]
    }));
  };
  
  // Calcola la percentuale di completamento di un progetto
  const calculateProjectProgress = (projectId) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    
    if (projectTasks.length === 0) return 0;
    
    const completedTasks = projectTasks.filter(task => task.status === 'complete');
    return Math.round((completedTasks.length / projectTasks.length) * 100);
  };
  // Calcola lo stato di urgenza del progetto
  const getProjectUrgency = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const daysLeft = differenceInDays(end, today);
    
    if (isPast(end)) return { label: 'Scaduto', color: 'error' };
    if (daysLeft <= 3) return { label: 'Critico', color: 'error' };
    if (daysLeft <= 7) return { label: 'Urgente', color: 'warning' };
    return { label: 'In tempo', color: 'success' };
  };
  
  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };
  
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Panoramica Progetti
        </Typography>
        <Tooltip title="Visualizza tutti i progetti">
          <IconButton size="small" onClick={() => navigate('/projects')}>
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Grid container spacing={2}>
        {/* Grafico stato task */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 220, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Stato Task
            </Typography>
            <Box sx={{ height: 180, position: 'relative' }}>
              <PieChart
                data={calculateTasksStatusData()}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                innerRadius={0.6}
                padAngle={0.5}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                legends={[
                  {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 12,
                    symbolShape: 'circle'
                  }
                ]}
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* Lista progetti attivi */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: 2, 
            height: 220, 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Progetti Attivi
            </Typography>
            
            {activeProjects.length > 0 ? (
              activeProjects.map((project, index) => {
                const progress = calculateProjectProgress(project.id);
                const urgency = getProjectUrgency(project.endDate);
                
                return (
                  <Box key={project.id} sx={{ mb: 1.5 }}>
                    {index > 0 && <Divider sx={{ my: 1.5 }} />}
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 0.5,
                        cursor: 'pointer'
                      }}
                      onClick={() => handleProjectClick(project.id)}
                    >
                      <Typography variant="body2" fontWeight="medium">
                        {project.name}
                      </Typography>
                      <Chip 
                        label={urgency.label}
                        color={urgency.color}
                        size="small"
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ flexGrow: 1, mr: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={progress} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 1,
                            backgroundColor: 'rgba(0,0,0,0.1)'
                          }} 
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {progress}%
                      </Typography>
                    </Box>
                    
                    <Typography variant="caption" color="text.secondary">
                      Scadenza: {format(new Date(project.endDate), 'd MMMM yyyy', { locale: it })}
                    </Typography>
                  </Box>
                );
              })
            ) : (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%' 
              }}>
                <Typography variant="body2" color="text.secondary">
                  Nessun progetto attivo
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectsOverview;