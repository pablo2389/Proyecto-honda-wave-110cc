import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Blog de Motos 110cc
        </Typography>
        <Box>
          <Link href="/" style={{ margin: '0 8px', color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
            Inicio
          </Link>
          <Link href="/galeria" style={{ margin: '0 8px', color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
            Galería
          </Link>
          <Link href="/contacto" style={{ margin: '0 8px', color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
            Contacto
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
