// src/scenes/documents/[documentId].jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, IconButton, Button, Menu, MenuItem, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Tab, Tabs } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import HistoryIcon from '@mui/icons-material/History';
import { fetchDocuments, setCurrentDocument, deleteDocument } from '../../store/slices/documentSlice';
import { fetchProjects } from '../../store/slices/projectSlice';
import DocumentEditor from '../../components/documents/DocumentEditor';

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { documents, currentDocument, loading } = useSelector((state) => state.documents);
  const { projects } = useSelector((state) => state.projects);
  
  const [isEditing, setIsEditing] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  useEffect(() => {
    dispatch(fetchDocuments());
    dispatch(fetchProjects());
    
    // Se abbiamo già i documenti, impostiamo quello corrente
    if (documents.length > 0) {
      const document = documents.find(d => d.id === id);
      if (document) {
        dispatch(setCurrentDocument(document));
      }
    }
  }, [dispatch, id, documents.length]);
  
  // Se non abbiamo ancora il documento corrente ma abbiamo i documenti
  useEffect(() => {
    if (!currentDocument && documents.length > 0) {
      const document = documents.find(d => d.id === id);
      if (document) {
        dispatch(setCurrentDocument(document));
      }
    }
  }, [currentDocument, documents, id, dispatch]);
  
  // Gestione menu
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  // Gestione eliminazione documento
  const handleDeleteDocument = async () => {
    try {
      await dispatch(deleteDocument(id)).unwrap();
      navigate('/documents');
    } catch (error) {
      console.error('Errore durante l\'eliminazione del documento:', error);
    }
  };
  
  // Gestione cambio tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Se stiamo caricando o non abbiamo il documento corrente
  if (loading || !currentDocument) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <Typography>Caricamento documento...</Typography>
      </Box>
    );
  }
  
  // Trova il progetto del documento
  const project = projects.find(p => p.id === currentDocument.projectId);
  
  return (
    <Box>
      {/* Intestazione */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <IconButton sx={{ mr: 1 }} onClick={() => navigate('/documents')}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {currentDocument.title}
            </Typography>
            {project && (
              <Typography variant="body2" color="text.secondary">
                {project.name}
              </Typography>
            )}
          </Box>
        </Box>
        
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
          >
            Modifica
          </Button>
          
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              setShareDialogOpen(true);
              handleMenuClose();
            }}>
              <ShareIcon fontSize="small" sx={{ mr: 1 }} />
              Condividi
            </MenuItem>
            <MenuItem onClick={() => {
              setExportDialogOpen(true);
              handleMenuClose();
            }}>
              <CloudDownloadIcon fontSize="small" sx={{ mr: 1 }} />
              Esporta
            </MenuItem>
            <MenuItem onClick={() => {
              setVersionHistoryOpen(true);
              handleMenuClose();
            }}>
              <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
              Cronologia versioni
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {
              setDeleteDialogOpen(true);
              handleMenuClose();
            }} sx={{ color: 'error.main' }}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Elimina
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Documento" />
          <Tab label="Commenti" />
          <Tab label="Dettagli" />
        </Tabs>
      </Box>
      
      {/* Contenuto principale */}
      {tabValue === 0 && (
        <Box height="calc(100vh - 220px)" minHeight="500px">
          <DocumentEditor 
            documentId={id} 
            isEditing={isEditing} 
            onEditComplete={() => setIsEditing(false)}
          />
        </Box>
      )}
      
      {tabValue === 1 && (
        <Box p={3} bgcolor="background.paper" borderRadius={1}>
          <Typography variant="body2" color="text.secondary" align="center">
            La funzionalità commenti sarà disponibile in una versione futura.
          </Typography>
        </Box>
      )}
      
      {tabValue === 2 && (
        <Box p={3} bgcolor="background.paper" borderRadius={1}>
          <Typography variant="subtitle1" gutterBottom>
            Informazioni documento
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Creato da
              </Typography>
              <Typography variant="body2">
                {currentDocument.createdByName || 'Utente'}
              </Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Data creazione
              </Typography>
              <Typography variant="body2">
                {new Date(currentDocument.createdAt).toLocaleString('it-IT')}
              </Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Ultima modifica da
              </Typography>
              <Typography variant="body2">
                {currentDocument.lastModifiedByName || 'Utente'}
              </Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Data ultima modifica
              </Typography>
              <Typography variant="body2">
                {new Date(currentDocument.lastModified).toLocaleString('it-IT')}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 1 }} />
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Stato
              </Typography>
              <Typography variant="body2">
                {currentDocument.status === 'draft' && 'Bozza'}
                {currentDocument.status === 'review' && 'In revisione'}
                {currentDocument.status === 'finalized' && 'Finalizzato'}
              </Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Progetto
              </Typography>
              <Typography variant="body2">
                {project?.name || 'Nessun progetto'}
              </Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Tag
              </Typography>
              <Box display="flex" gap={0.5}>
                {currentDocument.tags && currentDocument.tags.length > 0 ? (
                  currentDocument.tags.map((tag, index) => (
                    <Typography key={index} variant="body2">
                      {tag}{index < currentDocument.tags.length - 1 ? ', ' : ''}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">Nessun tag</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      
      {/* Dialog per conferma eliminazione */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <Typography>
            Sei sicuro di voler eliminare questo documento? Questa azione non può essere annullata.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annulla</Button>
          <Button onClick={handleDeleteDocument} color="error" variant="contained">
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog per condivisione */}
      <Dialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Condividi documento</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" align="center" py={3}>
            La funzionalità di condivisione sarà disponibile in una versione futura.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>Chiudi</Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog per cronologia versioni */}
      <Dialog
        open={versionHistoryOpen}
        onClose={() => setVersionHistoryOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cronologia versioni</DialogTitle>
        <DialogContent>
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {/* Versioni fittizie per esempio */}
            <Box p={2} borderBottom={1} borderColor="divider">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2">Versione 3 (corrente)</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(currentDocument.lastModified).toLocaleString('it-IT')}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Modificato da: {currentDocument.lastModifiedByName || 'Utente'}
              </Typography>
            </Box>
            
            <Box p={2} borderBottom={1} borderColor="divider">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2">Versione 2</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(new Date(currentDocument.lastModified).getTime() - 86400000).toLocaleString('it-IT')}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Modificato da: {currentDocument.lastModifiedByName || 'Utente'}
              </Typography>
              <Button size="small" sx={{ mt: 1 }}>Ripristina</Button>
            </Box>
            
            <Box p={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2">Versione 1</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(currentDocument.createdAt).toLocaleString('it-IT')}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Creato da: {currentDocument.createdByName || 'Utente'}
              </Typography>
              <Button size="small" sx={{ mt: 1 }}>Ripristina</Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVersionHistoryOpen(false)}>Chiudi</Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog per esportazione */}
      <Dialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
      >
        <DialogTitle>Esporta documento</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Seleziona il formato di esportazione:
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Button variant="outlined" startIcon={<CloudDownloadIcon />}>
              PDF
            </Button>
            <Button variant="outlined" startIcon={<CloudDownloadIcon />}>
              DOCX
            </Button>
            <Button variant="outlined" startIcon={<CloudDownloadIcon />}>
              HTML
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Annulla</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentDetail;