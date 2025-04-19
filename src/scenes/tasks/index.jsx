// src/scenes/tasks/index.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme, Grid, Tabs, Tab, InputBase, IconButton, Menu, MenuItem, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewKanbanIcon from '@mui/icons-material/ViewModule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { fetchTasks } from '../../store/slices/taskSlice';
import { fetchProjects } from '../../store/slices/projectSlice';
import { setTaskModal } from '../../store/slices/uiSlice';
import KanbanBoard from '../../components/tasks/KanbanBoard';
import TaskCalendar from '../../components/calendar/TaskCalendar';
import DataTable from '../../components/common/DataTable';

const Tasks = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { tasks, loading } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);
  const { currentUser } = useSelector((state) => state.auth);
  
  const [view, setView] = useState('table'); // 'table', 'kanban', 'calendar'
  const [tabValue, setTabValue] = useState(0); // 0 = Tutte, 1 = Assegnate a me, 2 = In scadenza
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    project: 'all'
  });
  const [sort, setSort] = useState('dueDate');
  
  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchProjects());
  }, [dispatch]);
  
  // Gestione filtri
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
    handleFilterClose();
  };
  
  // Gestione ordinamento
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  
  const handleSortClose = () => {
    setSortAnchorEl(null);
  };
  
  const handleSortChange = (value) => {
    setSort(value);
    handleSortClose();
  };
  
  // Gestione cambio tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Gestione nuova task
  const handleNewTask = () => {
    dispatch(setTaskModal({ open: true }));
  };
  
  // Filtra e ordina le task
  const filteredTasks = tasks
    .filter(task => {
      // Filtra per tab
      if (tabValue === 1 && (!task.assignees || !task.assignees.some(assignee => assignee.id === currentUser?.id))) {
        return false;
      }
      
      if (tabValue === 2) {
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays > 7 || task.status === 'complete') {
          return false;
        }
      }
      
      // Filtra per stato
      if (filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }
      
      // Filtra per priorità
      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }
      
      // Filtra per progetto
      if (filters.project !== 'all' && task.projectId !== filters.project) {
        return false;
      }
      
      // Filtra per termine di ricerca
      if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Ordinamento
      switch (sort) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'dueDate':
          return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
        case 'priority':
          const priorityOrder = { alta: 0, media: 1, bassa: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'status':
          const statusOrder = { todo: 0, inProgress: 1, review: 2, complete: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });
  
  // Colonne per la vista tabella
  const columns = [
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
      field: 'projectId', 
      headerName: 'Progetto', 
      flex: 1.5,
      renderCell: (params) => {
        const project = projects.find(p => p.id === params.value);
        return project ? project.name : '-';
      }
    },
    { 
      field: 'dueDate', 
      headerName: 'Scadenza', 
      flex: 1, 
      renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString('it-IT') : '-'
    }
  ];

  return (
    <Box>
      {/* Intestazione */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Attività
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewTask}
        >
          Nuova Attività
        </Button>
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Tutte le attività" />
          <Tab label="Assegnate a me" />
          <Tab label="In scadenza" />
        </Tabs>
      </Box>
      
      {/* Filtri e ricerca */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Box 
          display="flex" 
          bgcolor={theme.palette.background.paper}
          borderRadius="4px"
          border={`1px solid ${theme.palette.divider}`}
          width={{ xs: '100%', sm: '300px' }}
        >
          <InputBase 
            sx={{ ml: 2, flex: 1 }} 
            placeholder="Cerca attività..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
        
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            size="small"
          >
            Filtri
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={handleSortClick}
            size="small"
          >
            Ordina
          </Button>
          
          <Button
            variant={view === 'table' ? 'contained' : 'outlined'}
            onClick={() => setView('table')}
            size="small"
            startIcon={<ViewListIcon />}
          >
            Lista
          </Button>
          
          <Button
            variant={view === 'kanban' ? 'contained' : 'outlined'}
            onClick={() => setView('kanban')}
            size="small"
            startIcon={<ViewKanbanIcon />}
          >
            Kanban
          </Button>
          
          <Button
            variant={view === 'calendar' ? 'contained' : 'outlined'}
            onClick={() => setView('calendar')}
            size="small"
            startIcon={<CalendarMonthIcon />}
          >
            Calendario
          </Button>
        </Box>
      </Box>
      
      {/* Menu filtri */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem>
          <Typography variant="subtitle2" fontWeight="bold">
            Stato
          </Typography>
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('status', 'all')}
          selected={filters.status === 'all'}
        >
          Tutti
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('status', 'todo')}
          selected={filters.status === 'todo'}
        >
          Da fare
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('status', 'inProgress')}
          selected={filters.status === 'inProgress'}
        >
          In corso
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('status', 'review')}
          selected={filters.status === 'review'}
        >
          In revisione
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('status', 'complete')}
          selected={filters.status === 'complete'}
        >
          Completati
        </MenuItem>
        
        <Divider sx={{ my: 1 }} />
        
        <MenuItem>
          <Typography variant="subtitle2" fontWeight="bold">
            Priorità
          </Typography>
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('priority', 'all')}
          selected={filters.priority === 'all'}
        >
          Tutte
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('priority', 'alta')}
          selected={filters.priority === 'alta'}
        >
          Alta
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('priority', 'media')}
          selected={filters.priority === 'media'}
        >
          Media
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('priority', 'bassa')}
          selected={filters.priority === 'bassa'}
        >
          Bassa
        </MenuItem>
        
        <Divider sx={{ my: 1 }} />
        
        <MenuItem>
          <Typography variant="subtitle2" fontWeight="bold">
            Progetto
          </Typography>
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('project', 'all')}
          selected={filters.project === 'all'}
        >
          Tutti
        </MenuItem>
        {projects.map(project => (
          <MenuItem 
            key={project.id}
            onClick={() => handleFilterChange('project', project.id)}
            selected={filters.project === project.id}
          >
            {project.name}
          </MenuItem>
        ))}
      </Menu>
      
      {/* Menu ordinamento */}
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
      >
        <MenuItem 
          onClick={() => handleSortChange('title')}
          selected={sort === 'title'}
        >
          Titolo
        </MenuItem>
        <MenuItem 
          onClick={() => handleSortChange('dueDate')}
          selected={sort === 'dueDate'}
        >
          Scadenza
        </MenuItem>
        <MenuItem 
          onClick={() => handleSortChange('priority')}
          selected={sort === 'priority'}
        >
          Priorità
        </MenuItem>
        <MenuItem 
          onClick={() => handleSortChange('status')}
          selected={sort === 'status'}
        >
          Stato
        </MenuItem>
      </Menu>
      
      {/* Contenuto principale */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <Typography>Caricamento attività...</Typography>
        </Box>
      ) : (
        <>
          {view === 'table' && (
            <DataTable
              rows={filteredTasks}
              columns={columns}
              loading={loading}
              onRowClick={(params) => navigate(`/tasks/${params.id}`)}
              getRowId={(row) => row.id}
            />
          )}
          
          {view === 'kanban' && (
            <Box height="calc(100vh - 300px)" minHeight="500px">
              <KanbanBoard tasks={filteredTasks} />
            </Box>
          )}
          
          {view === 'calendar' && (
            <Box height="calc(100vh - 300px)" minHeight="500px">
              <TaskCalendar tasks={filteredTasks} />
            </Box>
          )}
          
          {filteredTasks.length === 0 && (
            <Box width="100%" textAlign="center" py={5}>
              <Typography variant="body1" color="text.secondary">
                Nessuna attività trovata con i filtri applicati.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Tasks;