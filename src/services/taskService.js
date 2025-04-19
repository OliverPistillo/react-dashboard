// src/services/taskService.js
import api from './api';
import { mockTasks } from '../data/mockData';

// Per ora utilizziamo dati mock, in futuro saranno sostituiti con chiamate API reali
const taskService = {
  getAllTasks: async () => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTasks);
      }, 800);
    });
    
    // Implementazione reale
    // return api.get('/tasks');
  },
  
  getTaskById: async (taskId) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = mockTasks.find(t => t.id === taskId);
        if (task) {
          resolve(task);
        } else {
          reject({ message: 'Task non trovato' });
        }
      }, 500);
    });
    
    // Implementazione reale
    // return api.get(`/tasks/${taskId}`);
  },
  
  getTasksByProjectId: async (projectId) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        const projectTasks = mockTasks.filter(t => t.projectId === projectId);
        resolve(projectTasks);
      }, 800);
    });
    
    // Implementazione reale
    // return api.get(`/projects/${projectId}/tasks`);
  },
  
  createTask: async (taskData) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          id: `task${mockTasks.length + 1}`,
          ...taskData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resolve(newTask);
      }, 800);
    });
    
    // Implementazione reale
    // return api.post('/tasks', taskData);
  },
  
  updateTask: async (taskId, taskData) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const taskIndex = mockTasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          const updatedTask = {
            ...mockTasks[taskIndex],
            ...taskData,
            updatedAt: new Date().toISOString()
          };
          resolve(updatedTask);
        } else {
          reject({ message: 'Task non trovato' });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.put(`/tasks/${taskId}`, taskData);
  },
  
  deleteTask: async (taskId) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const taskIndex = mockTasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          resolve({ message: 'Task eliminato con successo' });
        } else {
          reject({ message: 'Task non trovato' });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.delete(`/tasks/${taskId}`);
  },
  
  updateTaskStatus: async (taskId, status) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const taskIndex = mockTasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          const updatedTask = {
            ...mockTasks[taskIndex],
            status,
            updatedAt: new Date().toISOString()
          };
          resolve(updatedTask);
        } else {
          reject({ message: 'Task non trovato' });
        }
      }, 500);
    });
    
    // Implementazione reale
    // return api.patch(`/tasks/${taskId}/status`, { status });
  },
  
  addComment: async (taskId, comment) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const taskIndex = mockTasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          const newComment = {
            id: `comment${Date.now()}`,
            ...comment,
            createdAt: new Date().toISOString()
          };
          resolve(newComment);
        } else {
          reject({ message: 'Task non trovato' });
        }
      }, 500);
    });
    
    // Implementazione reale
    // return api.post(`/tasks/${taskId}/comments`, comment);
  },
  
  updateAssignees: async (taskId, assignees) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const taskIndex = mockTasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          resolve({ message: 'Assegnatari aggiornati con successo' });
        } else {
          reject({ message: 'Task non trovato' });
        }
      }, 500);
    });
    
    // Implementazione reale
    // return api.put(`/tasks/${taskId}/assignees`, { assignees });
  }
};

export default taskService;