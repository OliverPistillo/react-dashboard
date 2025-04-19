// src/components/projects/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Chip, Avatar, OutlinedInput, Checkbox, ListItemText, Paper, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { itIT } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, updateProject } from '../../store/slices/projectSlice';

const ProjectForm = ({ initialData = null, mode = 'create', onSuccess = () => {} }) => {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.team);
  const { loading } = useSelector((state) => state.projects);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning',
    priority: 'media',
    startDate: null,
    endDate: null,
    client: '',
    budget: '',
    members: [],
    tags: []
  });
  const [errors, setErrors] = useState({});
  const [tag, setTag] = useState('');
  
  // Inizializza il form con i dati esistenti se in modalità edit
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        status: initialData.status || 'planning',
        priority: initialData.priority || 'media',
        startDate: initialData.startDate ? new Date(initialData.startDate) : null,
        endDate: initialData.endDate ? new Date(initialData.endDate) : null,
        client: initialData.client || '',
        budget: initialData.budget?.toString() || '',
        members: initialData.members || [],
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }
    
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'La data di fine deve essere successiva alla data di inizio';
    }
    
    if (formData.budget && isNaN(Number(formData.budget))) {
      newErrors.budget = 'Il budget deve essere un numero';
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
    
    // Prepara i dati per l'invio
    const projectData = {
      ...formData,
      budget: formData.budget ? Number(formData.budget) : null
    };
    
    try {
      if (mode === 'create') {
        await dispatch(createProject(projectData)).unwrap();
      } else {
        await dispatch(updateProject({ 
          projectId: initialData.id, 
          projectData 
        })).unwrap();
      }
      
      onSuccess();
    } catch (error) {
      console.error('Errore durante il salvataggio del progetto:', error);
    }
  };

  return (
    <Box component={Paper} p={3} sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Nome */}
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Nome progetto"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
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
          
          {/* Cliente & Budget */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="client"
              label="Cliente"
              fullWidth
              value={formData.client}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              name="budget"
              label="Budget"
              fullWidth
              value={formData.budget}
              onChange={handleChange}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              error={!!errors.budget}
              helperText={errors.budget}
            />
          </Grid>
          
          {/* Stato & Priorità */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Stato</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Stato"
              >
                <MenuItem value="planning">In pianificazione</MenuItem>
                <MenuItem value="active">Attivo</MenuItem>
                <MenuItem value="onHold">In attesa</MenuItem>
                <MenuItem value="complete">Completato</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
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
                label="Data fine"
                value={formData.endDate}
                onChange={(date) => handleDateChange('endDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!errors.endDate,
                    helperText: errors.endDate
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          {/* Membri */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Membri del team</InputLabel>
              <Select
                multiple
                name="members"
                value={formData.members}
                onChange={handleChange}
                input={<OutlinedInput label="Membri del team" />}
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
                    <Checkbox checked={formData.members.indexOf(member.id) > -1} />
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
                {mode === 'create' ? 'Crea' : 'Aggiorna'} progetto
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProjectForm;