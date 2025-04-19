// src/scenes/projects/[projectId].jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Divider,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { fetchProjects, setCurrentProject, deleteProject } from '../../store/slices/projectSlice';
import { fetchTasks } from '../../store/slices/taskSlice';
import { fetchTeamMembers } from '../../store/slices/teamSlice';
import { fetchProjectDocuments } from '../../store/slices/documentSlice';
import KanbanBoard from '../../components/tasks/KanbanBoard';
import GanttChart from '../../components/tasks/gantt/GanttChart';
import DataTable from '../../components/common/DataTable';
import ProjectForm from '../../components/projects/ProjectForm';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { projects, currentProject, loading: projectLoading } = useSelector((state) => state.projects);
  const { tasks, loading: tasksLoading } = useSelector((state) => state.tasks);
  const { members } = useSelector((state) => state.team);
  const { documents } = useSelector((state) => state.documents);
  
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Recupera i dati del progetto
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
    dispatch(fetchTeamMembers());
    
    // Se abbiamo già i progetti, impostiamo quello corrente
    if (projects.length > 0) {
      const project = projects.find(p => p.id === id);
      if (project) {
        dispatch(setCurrentProject(project));
      }
    }
    
    // Carica i documenti del progetto
    dispatch(fetchProjectDocuments(id));
  }, [dispatch, id, projects.length]);
  
  // Se non abbiamo ancora il progetto corrente ma abbiamo i progetti
  useEffect(() => {
    if (!currentProject && projects.length > 0) {
      const project = projects.find(p => p.id === id);
      if (project) {
        dispatch(setCurrentProject(project));
      }
    }
  }, [currentProject, projects, id, dispatch]);
  
  // Filtra i task di questo progetto
  const projectTasks = tasks.filter(task => task.projectId === id);
  
  // Filtra i documenti di questo progetto
  const projectDocuments = documents.filter(doc => doc.projectId === id);
  
  // Gestisce il cambio di tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Apre il menu delle opzioni
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  // Chiude il menu delle opzioni
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  // Gestisce l'apertura del dialog di modifica
  const handleEditOpen = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };
  
  // Gestisce l'apertura del dialog di eliminazione
  const handleDeleteOpen = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };
  
  // Gestisce l'eliminazione del progetto
  const handleDeleteProject = async () => {
    try {
      await dispatch(deleteProject(id)).unwrap();
      navigate('/projects');
    } catch (error) {
      console.error('Errore durante l\'eliminazione del progetto:', error);
    }
  };
  
  // Se stiamo caricando o non abbiamo il progetto corrente
  if (projectLoading || !currentProject) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <Typography>Caricamento progetto...</Typography>
      </Box>
    );
  }
  
  // Calcola la percentuale di completamento
  const completedTasks = projectTasks.filter(task => task.status === 'complete').length;
  const progress = projectTasks.length > 0 
    ? Math.round((completedTasks / projectTasks.length) * 100) 
    : 0;
  
  // Trova i membri del team assegnati al progetto
  const projectMembers = members.filter(member => 
    currentProject.members && currentProject.members.includes(member.id)
  );
  
  // Colonne per la tabella dei task
  const taskColumns = [
    { field: 'title', headerName: 'Titolo', flex: 2 },
    { 
      field: 'status', 
      headerName: 'Stato', 
      flex: 1,
      renderCell: (params) => {
        const statusColors = {
          todo: 'default',
          inProgress: 'primary',
          review: 'warning',
          complete: 'success'
        };
        const statusLabels = {
          todo: 'Da fare',
          inProgress: 'In corso',
          review: 'In revisione',
          complete: 'Completato'
        };
        return (
          <Chip 
            label={statusLabels[params.value] || params.value} 
            color={statusColors[params.value] || 'default'} 
            size="small" 
          />
        );
      }
    },
    { 
      field: 'priority', 
      headerName: 'Priorità', 
      flex: 1,
      renderCell: (params) => {
        const priorityColors = {
          alta: 'error',
          media: 'warning',
          bassa: 'success'
        };
        return (
          <Chip 
            label={params.value} 
            color={priorityColors[params.value] || 'default'} 
            size="small" 
          />
        );
      }
    },
    { 
      field: 'dueDate', 
      headerName: 'Scadenza', 
      flex: 1, 
      renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString('it-IT') : '-'
    },
    { 
      field: 'assignees', 
      headerName: 'Assegnati', 
      flex: 1,
      renderCell: (params) => (
        <AvatarGroup max={3}>
          {params.value?.map(user => (
            <Avatar 
              key={user.id} 
              src={user.avatar} 
              alt={user.name}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
      )
    }
  ];
  
  // Colonne per la tabella dei documenti
  const documentColumns = [
    { field: 'title', headerName: 'Titolo', flex: 2 },
    { 
      field: 'createdAt', 
      headerName: 'Data creazione', 
      flex: 1, 
      renderCell: (params) => new Date(params.value).toLocaleDateString('it-IT')
    },
    { 
      field: 'lastModified', 
      headerName: 'Ultima modifica', 
      flex: 1, 
      renderCell: (params) => new Date(params.value).toLocaleDateString('it-IT')
    },
    { 
      field: 'status', 
      headerName: 'Stato', 
      flex: 1,
      renderCell: (params) => {
        const statusColors = {
          draft: 'default',
          review: 'warning',
          finalized: 'success'
        };
        const statusLabels = {
          draft: 'Bozza',
          review: 'In revisione',
          finalized: 'Finalizzato'
        };
        return (
          <Chip 
            label={statusLabels[params.value] || params.value} 
            color={statusColors[params.value] || 'default'} 
            size="small" 
          />
        );
      }
    }
  ];

  return (
    <Box>
      {/* Intestazione */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton 
          sx={{ mr: 1 }}
          onClick={() => navigate('/projects')}
        >
          <ArrowBackIcon />
        </IconButton>
        
        <Box flexGrow={1}>
          <Typography variant="h4" fontWeight="bold">
            {currentProject.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentProject.description}
          </Typography>
        </Box>
        
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditOpen}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Modifica
          </MenuItem>
          <MenuItem onClick={handleDeleteOpen}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Elimina
          </MenuItem>
        </Menu>
      </Box>
      
      {/* Informazioni riepilogative */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Stato
                  </Typography>
                  <Chip 
                    label={currentProject.status} 
                    color={
                      currentProject.status === 'active' ? 'primary' :
                      currentProject.status === 'complete' ? 'success' :
                      currentProject.status === 'planning' ? 'info' : 'default'
                    }
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Priorità
                  </Typography>
                  <Chip 
                    label={currentProject.priority} 
                    color={
                      currentProject.priority === 'alta' ? 'error' :
                      currentProject.priority === 'media' ? 'warning' : 'success'
                    }
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Data inizio
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {new Date(currentProject.startDate).toLocaleDateString('it-IT')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Data fine
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {new Date(currentProject.endDate).toLocaleDateString('it-IT')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Progresso
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Box flex={1} mr={2}>
                      <LinearProgress 
                        variant="determinate" 
                        value={progress} 
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                    <Typography variant="body2" fontWeight="bold">
                      {progress}%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Team
                </Typography>
                <Button
                  startIcon={<PersonAddIcon />}
                  size="small"
                >
                  Aggiungi
                </Button>
              </Box>
              
              {projectMembers.length > 0 ? (
                projectMembers.map((member) => (
                  <Box 
                    key={member.id}
                    display="flex"
                    alignItems="center"
                    mb={1}
                    p={1}
                    borderRadius={1}
                    sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                  >
                    <Avatar 
                      src={member.avatar} 
                      alt={member.name}
                      sx={{ width: 32, height: 32, mr: 1.5 }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {member.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" align="center">
                  Nessun membro assegnato
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Kanban" />
          <Tab label="Gantt" />
          <Tab label="Lista Task" />
          <Tab label="Documenti" />
        </Tabs>
      </Box>
      
      {/* Contenuto tab */}
      <Box mb={3}>
        {tabValue === 0 && (
          <Box height="calc(100vh - 400px)" minHeight="500px">
            <KanbanBoard />
          </Box>
        )}
        
        {tabValue === 1 && (
          <Box height="calc(100vh - 400px)" minHeight="500px">
            <GanttChart />
          </Box>
        )}
        
        {tabValue === 2 && (
          <Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate(`/tasks/new?projectId=${id}`)}
              >
                Nuova Attività
              </Button>
            </Box>
            
            <DataTable
              rows={projectTasks}
              columns={taskColumns}
              loading={tasksLoading}
              onRowClick={(params) => navigate(`/tasks/${params.id}`)}
              getRowId={(row) => row.id}
            />
          </Box>
        )}
        
        {tabValue === 3 && (
          <Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate(`/documents/new?projectId=${id}`)}
              >
                Nuovo Documento
              </Button>
            </Box>
            
            <DataTable
              rows={projectDocuments}
              columns={documentColumns}
              loading={false}
              onRowClick={(params) => navigate(`/documents/${params.id}`)}
              getRowId={(row) => row.id}
            />
          </Box>
        )}
      </Box>
      
      {/* Dialog per modifica progetto */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Modifica Progetto</DialogTitle>
        <DialogContent>
          <ProjectForm 
            initialData={currentProject} 
            mode="edit"
            onSuccess={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Dialog per conferma eliminazione */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <Typography>
            Sei sicuro di voler eliminare questo progetto? Questa azione non può essere annullata.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annulla</Button>
          <Button onClick={handleDeleteProject} color="error" variant="contained">
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectDetails;