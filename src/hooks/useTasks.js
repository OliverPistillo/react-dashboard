// src/hooks/useTasks.js
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask, updateTaskStatus } from '../store/slices/taskSlice';

export const useTasks = (projectId = null) => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState([]);
  
  // Filtra i task per progetto se necessario
  useEffect(() => {
    if (projectId) {
      setFilteredTasks(tasks.filter(task => task.projectId === projectId));
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, projectId]);
  
  // Carica i task all'avvio
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  // Funzione per creare un nuovo task
  const handleCreateTask = useCallback(async (taskData) => {
    try {
      const result = await dispatch(createTask(taskData)).unwrap();
      return { success: true, task: result };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);
  
  // Funzione per aggiornare un task
  const handleUpdateTask = useCallback(async (taskId, taskData) => {
    try {
      const result = await dispatch(updateTask({ taskId, taskData })).unwrap();
      return { success: true, task: result };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);
  
  // Funzione per eliminare un task
  const handleDeleteTask = useCallback(async (taskId) => {
    try {
      await dispatch(deleteTask(taskId)).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);
  
  // Funzione per aggiornare lo stato di un task
  const handleUpdateStatus = useCallback(async (taskId, newStatus) => {
    try {
      await dispatch(updateTaskStatus({ taskId, newStatus })).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);
  
  // Ottieni task per stato
  const getTasksByStatus = useCallback((status) => {
    return filteredTasks.filter(task => task.status === status);
  }, [filteredTasks]);
  
  // Ottieni statistiche sui task
  const getTasksStats = useCallback(() => {
    const total = filteredTasks.length;
    const completed = filteredTasks.filter(task => task.status === 'complete').length;
    const inProgress = filteredTasks.filter(task => task.status === 'inProgress').length;
    const todo = filteredTasks.filter(task => task.status === 'todo').length;
    const review = filteredTasks.filter(task => task.status === 'review').length;
    
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      total,
      completed,
      inProgress,
      todo,
      review,
      completionPercentage
    };
  }, [filteredTasks]);
  
  return {
    tasks: filteredTasks,
    loading,
    error,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    updateTaskStatus: handleUpdateStatus,
    getTasksByStatus,
    getTasksStats
  };
};