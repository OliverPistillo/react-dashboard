// src/components/tasks/KanbanBoard.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskCard from './TaskCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskStatus } from '../../store/slices/taskSlice';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { currentProject } = useSelector((state) => state.projects);
  
  // Definizione delle colonne del kanban
  const columns = [
    { id: 'todo', title: 'To Do', color: '#e0e0e0' },
    { id: 'inProgress', title: 'In Progress', color: '#bbdefb' },
    { id: 'review', title: 'Review', color: '#fff9c4' },
    { id: 'complete', title: 'Complete', color: '#c8e6c9' }
  ];

  // Filtra task per il progetto corrente
  const projectTasks = currentProject ? 
    tasks.filter(task => task.projectId === currentProject.id) : 
    tasks;

  // Raggruppa task per stato
  const getTasksByStatus = (status) => {
    return projectTasks.filter(task => task.status === status);
  };

  // Gestisce lo spostamento delle carte
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    // Se non c'è destinazione o se la destinazione è la stessa della sorgente
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    // Aggiorna lo stato del task
    dispatch(updateTaskStatus({
      taskId: draggableId,
      newStatus: destination.droppableId
    }));
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 180px)', overflowX: 'auto', p: 1 }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {columns.map(column => (
          <Box 
            key={column.id}
            sx={{ 
              minWidth: 280, 
              width: 280, 
              mx: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paper 
              sx={{ 
                p: 1, 
                mb: 1, 
                backgroundColor: column.color,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {column.title} ({getTasksByStatus(column.id).length})
              </Typography>
              <IconButton size="small">
                <AddIcon />
              </IconButton>
            </Paper>
            
            <Droppable droppableId={column.id}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ 
                    flex: 1,
                    backgroundColor: 'background.default',
                    borderRadius: 1,
                    overflowY: 'auto',
                    p: 1
                  }}
                >
                  {getTasksByStatus(column.id).map((task, index) => (
                    <Draggable 
                      key={task.id} 
                      draggableId={task.id} 
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ mb: 1 }}
                        >
                          <TaskCard task={task} />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        ))}
      </DragDropContext>
    </Box>
  );
};

export default KanbanBoard;
