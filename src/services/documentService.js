// src/services/documentService.js
import api from './api';
import { mockDocuments } from '../data/mockData';

// Per ora utilizziamo dati mock, in futuro saranno sostituiti con chiamate API reali
const documentService = {
  getAllDocuments: async () => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDocuments);
      }, 800);
    });
    
    // Implementazione reale
    // return api.get('/documents');
  },
  
  getDocumentById: async (documentId) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const document = mockDocuments.find(d => d.id === documentId);
        if (document) {
          resolve(document);
        } else {
          reject({ message: 'Documento non trovato' });
        }
      }, 500);
    });
    
    // Implementazione reale
    // return api.get(`/documents/${documentId}`);
  },
  
  getProjectDocuments: async (projectId) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        const projectDocuments = mockDocuments.filter(d => d.projectId === projectId);
        resolve(projectDocuments);
      }, 800);
    });
    
    // Implementazione reale
    // return api.get(`/projects/${projectId}/documents`);
  },
  
  createDocument: async (documentData) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDocument = {
          id: `doc${mockDocuments.length + 1}`,
          ...documentData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resolve(newDocument);
      }, 800);
    });
    
    // Implementazione reale
    // return api.post('/documents', documentData);
  },
  
  updateDocument: async (documentId, documentData) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const documentIndex = mockDocuments.findIndex(d => d.id === documentId);
        if (documentIndex !== -1) {
          const updatedDocument = {
            ...mockDocuments[documentIndex],
            ...documentData,
            updatedAt: new Date().toISOString()
          };
          resolve(updatedDocument);
        } else {
          reject({ message: 'Documento non trovato' });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.put(`/documents/${documentId}`, documentData);
  },
  
  deleteDocument: async (documentId) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const documentIndex = mockDocuments.findIndex(d => d.id === documentId);
        if (documentIndex !== -1) {
          resolve({ message: 'Documento eliminato con successo' });
        } else {
          reject({ message: 'Documento non trovato' });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.delete(`/documents/${documentId}`);
  },
  
  shareDocument: async (documentId, users) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Documento condiviso con successo' });
      }, 500);
    });
    
    // Implementazione reale
    // return api.post(`/documents/${documentId}/share`, { users });
  },
  
  getDocumentVersion: async (documentId, versionId) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const document = mockDocuments.find(d => d.id === documentId);
        if (document) {
          // In una implementazione reale, qui recupereremmo una versione specifica
          resolve({
            ...document,
            version: versionId,
            createdAt: new Date(Date.now() - 86400000).toISOString() // Un giorno fa
          });
        } else {
          reject({ message: 'Versione del documento non trovata' });
        }
      }, 500);
    });
    
    // Implementazione reale
    // return api.get(`/documents/${documentId}/versions/${versionId}`);
  },
  
  getDocumentVersions: async (documentId) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const document = mockDocuments.find(d => d.id === documentId);
        if (document) {
          // Genera alcune versioni fittizie
          const versions = [
            {
              id: 'v3',
              documentId: documentId,
              createdAt: new Date().toISOString(),
              createdBy: document.lastModifiedBy,
              createdByName: 'Utente corrente',
            },
            {
              id: 'v2',
              documentId: documentId,
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              createdBy: document.lastModifiedBy,
              createdByName: 'Utente corrente',
            },
            {
              id: 'v1',
              documentId: documentId,
              createdAt: new Date(Date.now() - 172800000).toISOString(),
              createdBy: document.createdBy,
              createdByName: 'Creatore originale',
            }
          ];
          resolve(versions);
        } else {
          reject({ message: 'Documento non trovato' });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.get(`/documents/${documentId}/versions`);
  },
  
  exportDocument: async (documentId, format = 'pdf') => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const document = mockDocuments.find(d => d.id === documentId);
        if (document) {
          resolve({
            message: `Documento esportato in formato ${format}`,
            downloadUrl: `#export-document-${documentId}-${format}` // URL fittizio
          });
        } else {
          reject({ message: 'Documento non trovato' });
        }
      }, 1000);
    });
    
    // Implementazione reale
    // return api.get(`/documents/${documentId}/export`, { 
    //   params: { format },
    //   responseType: 'blob'
    // });
  },
  
  importDocument: async (file, projectId = null) => {
    // Simula una chiamata API
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDocument = {
          id: `doc${mockDocuments.length + 1}`,
          title: file.name.replace(/\.[^/.]+$/, ""), // Rimuove l'estensione
          content: '<p>Contenuto importato</p>',
          createdAt: new Date().toISOString(),
          createdBy: 'user1', // Utente corrente
          lastModified: new Date().toISOString(),
          lastModifiedBy: 'user1', // Utente corrente
          projectId: projectId,
          tags: ['importato'],
          status: 'draft'
        };
        resolve(newDocument);
      }, 1200);
    });
    
    // Implementazione reale
    // const formData = new FormData();
    // formData.append('file', file);
    // if (projectId) {
    //   formData.append('projectId', projectId);
    // }
    // return api.post('/documents/import', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
  },
  
  addComment: async (documentId, comment) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const document = mockDocuments.find(d => d.id === documentId);
        if (document) {
          const newComment = {
            id: `comment${Date.now()}`,
            content: comment.content,
            createdAt: new Date().toISOString(),
            createdBy: comment.userId || 'user1',
            userName: comment.userName || 'Utente corrente',
            userAvatar: comment.userAvatar || null
          };
          resolve(newComment);
        } else {
          reject({ message: 'Documento non trovato' });
        }
      }, 500);
    });
    
    // Implementazione reale
    // return api.post(`/documents/${documentId}/comments`, comment);
  },
  
  getComments: async (documentId) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const document = mockDocuments.find(d => d.id === documentId);
        if (document) {
          // Genera alcuni commenti fittizi
          const comments = [
            {
              id: 'comment1',
              content: 'Questo documento è molto chiaro!',
              createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 ora fa
              createdBy: 'user2',
              userName: 'Laura Rossi',
              userAvatar: '/assets/avatars/avatar2.jpg'
            },
            {
              id: 'comment2',
              content: 'Dobbiamo aggiungere più dettagli nella sezione 3.',
              createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 ore fa
              createdBy: 'user1',
              userName: 'Marco Bianchi',
              userAvatar: '/assets/avatars/avatar1.jpg'
            }
          ];
          resolve(comments);
        } else {
          reject({ message: 'Documento non trovato' });
        }
      }, 800);
    });
    
    // Implementazione reale
    // return api.get(`/documents/${documentId}/comments`);
  },
  
  updateDocumentStatus: async (documentId, status) => {
    // Simula una chiamata API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const documentIndex = mockDocuments.findIndex(d => d.id === documentId);
        if (documentIndex !== -1) {
          const updatedDocument = {
            ...mockDocuments[documentIndex],
            status,
            lastModified: new Date().toISOString()
          };
          resolve(updatedDocument);
        } else {
          reject({ message: 'Documento non trovato' });
        }
      }, 500);
    });
    
    // Implementazione reale
    // return api.patch(`/documents/${documentId}/status`, { status });
  }
};

export default documentService;