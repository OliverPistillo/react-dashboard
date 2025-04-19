// src/scenes/auth/register.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Link, InputAdornment, IconButton, CircularProgress, Alert, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../store/slices/authSlice';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // Gestisce il cambio nei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Pulisce gli errori precedenti
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    if (error) {
      dispatch(clearError());
    }
  };
  
  // Valida il form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Il nome è obbligatorio';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'L\'email è obbligatoria';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Email non valida';
    }
    
    if (!formData.password) {
      errors.password = 'La password è obbligatoria';
    } else if (formData.password.length < 6) {
      errors.password = 'La password deve essere di almeno 6 caratteri';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Le password non corrispondono';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Gestisce l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await dispatch(register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })).unwrap();
      
      navigate('/');
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
    }
  };
  
  // Funzione per mostrare/nascondere la password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
      p={2}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 500, 
          width: '100%',
          borderRadius: 2
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            ProjectFlow
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Crea un nuovo account
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Nome completo"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
                autoFocus
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="confirmPassword"
                label="Conferma password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
              />
            </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrati'}
          </Button>
          
          <Box textAlign="center">
            <Typography variant="body2">
              Hai già un account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                color="primary"
              >
                Accedi
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;