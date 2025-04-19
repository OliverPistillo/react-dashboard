// src/components/tasks/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Chip, Avatar, OutlinedInput, Checkbox, ListItemText, FormHelperText, IconButton, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { itIT } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../../store/slices/taskSlice';
import CloseIcon from '@mui/icons-material/Close';

const TaskForm = ({ initialData = null, mode = 'create', onSuccess = () => {} }) => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { members } = useSelector((state) => state.team);
  const { loading } = useSelector((state) => state.tasks);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'media',
    projectId: '',
    startDate: null,
    dueDate: null,
    assignees: [],
    tags: []
  });
  const [errors, setErrors] = useState({});
  const [tag, setTag] = useState('');
  
  // Inizializza il form con i dati esistenti se in modalità edit
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'todo',
        priority: initialData.priority || 'media',
        projectId: initialData.projectId || '',
        startDate: initialData.startDate ? new Date(initialData.startDate) : null,
        dueDate: initialData.dueDate ? new Date(initialData.dueDate) : null,
        assignees: initialData.assignees?.map(a => a.id) || [],
        tags: initialData.tags || []
      });
    }
  }, [initialData, mode]);
  
  // Gestisce il cambio dei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Pulisce l'errore per il campo modificato
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Gestisce il cambio delle date
  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date
    });
    
    // Pulisce l'errore per il campo modificato
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Gestisce l'aggiunta di un tag
  const handleAddTag = () => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag.trim()]
      });
      setTag('');
    }
  };
  
  // Gestisce la rimozione di un tag
  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tagToRemove)
    });
  };
  
  // Valida il form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Il titolo è obbligatorio';
    }
    
    if (!formData.projectId) {
      newErrors.projectId = 'Seleziona un progetto';
    }
    
    if (formData.startDate && formData.dueDate && formData.startDate > formData.dueDate) {
      newErrors.dueDate = 'La data di scadenza deve essere successiva alla data di inizio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Gestisce l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (mode === 'create') {
        await dispatch(createTask(formData)).unwrap();
      } else {
        await dispatch(updateTask({ 
          taskId: initialData.id, 
          taskData: formData 
        })).unwrap();
      }
      
      onSuccess();
    } catch (error) {
      console.error('Errore durante il salvataggio del task:', error);
    }
  };

  return (
    <Box component={Paper} p={3} sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Titolo */}
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Titolo"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          
          {/* Descrizione */}
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Descrizione"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          
          {/* Progetto */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.projectId}>
              <InputLabel>Progetto</InputLabel>
              <Select
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
                label="Progetto"
              >
                <MenuItem value="">
                  <em>Seleziona un progetto</em>
                </MenuItem>
                {projects.map(project => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.projectId && <FormHelperText>{errors.projectId}</FormHelperText>}
            </FormControl>
          </Grid>
          
          {/* Stato */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Stato</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Stato"
              >
                <MenuItem value="todo">Da fare</MenuItem>
                <MenuItem value="inProgress">In corso</MenuItem>
                <MenuItem value="review">In revisione</MenuItem>
                <MenuItem value="complete">Completato</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* Date */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={itIT}>
              <DatePicker
                label="Data inizio"
                value={formData.startDate}
                onChange={(date) => handleDateChange('startDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined'
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={itIT}>
              <DatePicker
                label="Data scadenza"
                value={formData.dueDate}
                onChange={(date) => handleDateChange('dueDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!errors.dueDate,
                    helperText: errors.dueDate
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          {/* Priorità */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Priorità</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                label="Priorità"
              >
                <MenuItem value="bassa">Bassa</MenuItem>
                <MenuItem value="media">Media</MenuItem>
                <MenuItem value="alta">Alta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* Assegnati */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Assegnati</InputLabel>
              <Select
                multiple
                name="assignees"
                value={formData.assignees}
                onChange={handleChange}
                input={<OutlinedInput label="Assegnati" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const member = members.find(m => m.id === value);
                      return (
                        <Chip 
                          key={value} 
                          label={member?.name || value} 
                          avatar={member?.avatar ? <Avatar src={member.avatar} /> : null}
                          size="small"
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    <Checkbox checked={formData.assignees.indexOf(member.id) > -1} />
                    <ListItemText primary={member.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Tag */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Tag
            </Typography>
            <Box display="flex" gap={1} mb={1}>
              <TextField
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Aggiungi tag"
                size="small"
                fullWidth
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                variant="outlined"
                onClick={handleAddTag}
                disabled={!tag.trim()}
              >
                Aggiungi
              </Button>
            </Box>
            
            <Box display="flex" flexWrap="wrap" gap={1}>
              {formData.tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                />
              ))}
            </Box>
          </Grid>
          
          {/* Pulsanti */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              <Button 
                variant="outlined"
                onClick={onSuccess}
              >
                Annulla
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
              >
                {mode === 'create' ? 'Crea' : 'Aggiorna'} attività
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TaskForm;