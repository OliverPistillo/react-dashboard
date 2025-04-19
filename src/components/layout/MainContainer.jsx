import React from 'react';
import { Box, Paper } from '@mui/material';

export const MainContainer = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        height: 'calc(100vh - 64px)', // Altezza totale meno l'altezza della Topbar
        overflow: 'auto', // Permette lo scrolling quando il contenuto è troppo grande
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          minHeight: '100%',
          backgroundColor: 'transparent'
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default MainContainer;