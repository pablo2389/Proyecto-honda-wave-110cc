import React from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import Menu from '../components/Menu';
import HomeButton from '../components/HomeButton';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Menu />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 0,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Blog de Motos 110cc
        </Typography>

        <Typography variant="h5" gutterBottom>
          Dejá la imagen de tu 110 acá
        </Typography>

        {/* Acá podrías agregar <ImageUpload /> si querés que se suban imágenes desde esta vista */}

        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <HomeButton />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
