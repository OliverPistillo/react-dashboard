// src/components/calendar/TaskCalendar.jsx
import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import itLocale from '@fullcalendar/core/locales/it';
import { useNavigate } from 'react-router-dom';
import { setTaskModal } from '../../store/slices/uiSlice';

const statusColors = {
  todo: '#e0e0e0',
  inProgress: '#bbdefb',
  review: '#fff9c4',
  complete: '#c8e6c9'
};

const TaskCalendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.tasks);
  const { projects, currentProject } = useSelector((state) => state.projects);
  const { currentUser } = useSelector((state) => state.auth);
  
  const [filter, setFilter] = useState('all');
  const [events, setEvents] = useState([]);
  
  // Prepara gli eventi del calendario dai task
  useEffect(() => {
    const filteredTasks = tasks.filter(task => {
      if (filter === 'assigned') {
        return task.assignees?.some(assignee => assignee.id === currentUser.id);
      } else if (filter === 'project' && currentProject) {
        return task.projectId === currentProject.id;
      }
      return true;
    });
    
    const calendarEvents = filteredTasks.map(task => {
      const project = projects.find(p => p.id === task.projectId);
      
      return {
        id: task.id,
        title: task.title,
        start: task.startDate || task.dueDate,
        end: task.dueDate,
        allDay: true,
        backgroundColor: statusColors[task.status] || '#9e9e9e',
        borderColor: statusColors[task.status] || '#9e9e9e',
        textColor: task.status === 'inProgress' ? '#000000' : '#000000',
        extendedProps: {
          description: task.description,
          status: task.status,
          projectName: project?.name || 'Nessun progetto'
        }
      };
    });
    
    setEvents(calendarEvents);
  }, [tasks, filter, currentProject, currentUser, projects]);
  
  // Gestisce il click su un evento del calendario
  const handleEventClick = (info) => {
    navigate(`/tasks/${info.event.id}`);
  };
  
  // Gestisce il click su una data per creare un nuovo task
  const handleDateClick = (info) => {
    dispatch(setTaskModal({
      open: true,
      taskData: {
        startDate: info.dateStr,
        dueDate: info.dateStr,
        projectId: currentProject?.id
      }
    }));
  };
  
  // Gestisce il cambio di filtro
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Typography variant="h5" fontWeight="bold">
          Calendario Attività
        </Typography>
        
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filtro</InputLabel>
          <Select
            value={filter}
            onChange={handleFilterChange}
            label="Filtro"
          >
            <MenuItem value="all">Tutte le attività</MenuItem>
            <MenuItem value="assigned">Assegnate a me</MenuItem>
            {currentProject && (
              <MenuItem value="project">Progetto corrente</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      
      <Paper sx={{ p: 2, flexGrow: 1, overflow: 'hidden' }}>
        <Box sx={{ height: '100%' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,listWeek'
            }}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            locale={itLocale}
            height="100%"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            eventContent={(eventInfo) => {
              return (
                <Box sx={{ 
                  p: 0.5, 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '0.85rem',
                  lineHeight: 1.2
                }}>
                  <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold' }}>
                    {eventInfo.event.title}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    {eventInfo.event.extendedProps.projectName}
                  </Typography>
                </Box>
              );
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskCalendar;