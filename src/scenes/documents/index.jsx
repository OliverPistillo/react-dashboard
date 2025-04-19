// src/scenes/documents/index.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme, Grid, Card, CardContent, InputBase, IconButton, Menu, MenuItem, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionIcon from '@mui/icons-material/Description';
import { fetchDocuments } from '../../store/slices/documentSlice';
import { fetchProjects } from '../../store/slices/projectSlice';
import DataTable from '../../components/common/DataTable';

const Documents = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { documents, loading } = useSelector((state) => state.documents);
  const { projects } = useSelector((state) => state.projects);
  
  const [view, setView] = useState('grid'); // 'grid' o 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    project: 'all'
  });
  const [sort, setSort] = useState('lastModified');
  
  useEffect(() => {
    dispatch(fetchDocuments());
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
  
  // Filtra e ordina i documenti
  const filteredDocuments = documents
    .filter(document => {
      // Filtra per stato
      if (filters.status !== 'all' && document.status !== filters.status) {
        return false;
      }
      
      // Filtra per progetto
      if (filters.project !== 'all' && document.projectId !== filters.project) {
        return false;
      }
      
      // Filtra per termine di ricerca
      if (searchTerm && !document.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Ordinamento
      switch (sort) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'lastModified':
          return new Date(b.lastModified) - new Date(a.lastModified);
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
  
  // Colonne per la vista tabella
  const columns = [
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
      field: 'projectId', 
      headerName: 'Progetto', 
      flex: 1.5,
      renderCell: (params) => {
        const project = projects.find(p => p.id === params.value);
        return project ? project.name : '-';
      }
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
  
  // Renderizza una card per il documento
  const renderDocumentCard = (document) => {
    const project = projects.find(p => p.id === document.projectId);
    
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
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[4]
          }
        }}
        onClick={() => navigate(`/documents/${document.id}`)}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box 
              display="flex" 
              alignItems="center" 
              bgcolor={theme.palette.background.default}
              p={1}
              borderRadius={1}
            >
              <DescriptionIcon color="primary" />
            </Box>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Typography variant="h6" component="div" noWrap gutterBottom>
            {document.title}
          </Typography>
          
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Chip 
              label={statusLabels[document.status] || document.status} 
              color={statusColors[document.status] || 'default'} 
              size="small" 
            />
            {project && (
              <Typography variant="caption" color="text.secondary">
                {project.name}
              </Typography>
            )}
          </Box>
          
          <Box flexGrow={1} />
          
          <Divider sx={{ my: 1 }} />
          
          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              Creato: {new Date(document.createdAt).toLocaleDateString('it-IT')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Modificato: {new Date(document.lastModified).toLocaleDateString('it-IT')}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      {/* Intestazione */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Documenti
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/documents/new')}
        >
          Nuovo Documento
        </Button>
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
            placeholder="Cerca documenti..." 
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
            variant={view === 'grid' ? 'contained' : 'outlined'}
            onClick={() => setView('grid')}
            size="small"
          >
            Grid
          </Button>
          
          <Button
            variant={view === 'table' ? 'contained' : 'outlined'}
            onClick={() => setView('table')}
            size="small"
          >
            Tabella
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
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
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
          onClick={() => handleFilterChange('status', 'draft')}
          selected={filters.status === 'draft'}
        >
          Bozza
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('status', 'review')}
          selected={filters.status === 'review'}
        >
          In revisione
        </MenuItem>
        <MenuItem 
          onClick={() => handleFilterChange('status', 'finalized')}
          selected={filters.status === 'finalized'}
        >
          Finalizzato
        </MenuItem>
        
        <Divider sx={{ my: 1 }} />
        
        <MenuItem>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
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
          onClick={() => handleSortChange('lastModified')}
          selected={sort === 'lastModified'}
        >
          Ultima modifica
        </MenuItem>
        <MenuItem 
          onClick={() => handleSortChange('createdAt')}
          selected={sort === 'createdAt'}
        >
          Data creazione
        </MenuItem>
      </Menu>
      
      {/* Contenuto principale */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <Typography>Caricamento documenti...</Typography>
        </Box>
      ) : (
        <>
          {view === 'grid' ? (
            <Grid container spacing={3}>
              {filteredDocuments.map((document) => (
                <Grid item key={document.id} xs={12} sm={6} md={4} lg={3}>
                  {renderDocumentCard(document)}
                </Grid>
              ))}
              
              {filteredDocuments.length === 0 && (
                <Box width="100%" textAlign="center" py={5}>
                  <Typography variant="body1" color="text.secondary">
                    Nessun documento trovato con i filtri applicati.
                  </Typography>
                </Box>
              )}
            </Grid>
          ) : (
            <DataTable
              rows={filteredDocuments}
              columns={columns}
              loading={loading}
              onRowClick={(params) => navigate(`/documents/${params.id}`)}
              getRowId={(row) => row.id}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Documents;