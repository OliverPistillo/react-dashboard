// src/services/projectService.js
import api from './api';
import { mockProjects } from '../data/mockData';

// Per ora utilizziamo dati mock, in futuro saranno sostituiti con chiamate API reali
const projectService = {
  getAllProjects: async () => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProjects);
      }, 800);
    });
    
    // Implementazione reale
    // return api.get('/projects');
  },
  
  getProjectById: async (projectId) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const project = mockProjects.find(p => p.id === projectId);
        if (project) {
          resolve(project);
        } else {
          reject({ message: 'Progetto non trovato' });
        }
      }, 500);
    });
    
    // Implementazione reale
    // return api.get(`/projects/${projectId}`);
  },
  
  createProject: async (projectData) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProject = {
          id: `proj${mockProjects.length + 1}`,
          ...projectData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resolve(newProject);
      }, 800);
    });
    
    // Implementazione reale
    // return api.post('/projects', projectData);
  },
  
  updateProject: async (projectId, projectData) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const projectIndex = mockProjects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
          const updatedProject = {
            ...mockProjects[projectIndex],
            ...projectData,
            updatedAt: new Date().toISOString()
          };
          resolve(updatedProject);
        } else {
          reject({ message: 'Progetto non trovato' });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.put(`/projects/${projectId}`, projectData);
  },
  
  deleteProject: async (projectId) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const projectIndex = mockProjects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
          resolve({ message: 'Progetto eliminato con successo' });
        } else {
          reject({ message: 'Progetto non trovato' });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.delete(`/projects/${projectId}`);
  },
  
  getProjectTasks: async (projectId) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Questa sarà gestita dal servizio tasks
        resolve([]);
      }, 800);
    });
    
    // Implementazione reale
    // return api.get(`/projects/${projectId}/tasks`);
  },
  
  addMemberToProject: async (projectId, memberId) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Membro aggiunto con successo' });
      }, 500);
    });
    
    // Implementazione reale
    // return api.post(`/projects/${projectId}/members`, { memberId });
  },
  
  removeMemberFromProject: async (projectId, memberId) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Membro rimosso con successo' });
      }, 500);
    });
    
    // Implementazione reale
    // return api.delete(`/projects/${projectId}/members/${memberId}`);
  }
};

export default projectService;