import React from 'react';
import { AppBar, Toolbar, Typography, Link, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Blog de Motos 110cc
        </Typography>
        <Box>
          <Link href="#" color="inherit" underline="none" sx={{ mx: 1 }}>
            Inicio
          </Link>
          <Link href="#" color="inherit" underline="none" sx={{ mx: 1 }}>
            Galería
          </Link>
          <Link href="#" color="inherit" underline="none" sx={{ mx: 1 }}>
            Contacto
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
