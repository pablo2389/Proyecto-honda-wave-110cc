import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Menu from '../components/Menu';  // Componente de navegación global
import PowerChart from '../components/PowerChart';  // Componente del gráfico
import ImageSlider from '../components/ImageSlider';  // Componente del slider
import '../styles/globals.css';  // Asegúrate de que este archivo esté importado
import { AppProps } from 'next/app'; // Importa AppProps desde Next.js

const App = ({ Component, pageProps }: AppProps) => {  // Asigna el tipo a los props
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Menu /> {/* Componente de navegación */}

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
        {/* Título con el texto actualizado */}
        <h1 className="neon-text" style={{ fontSize: '4rem', marginBottom: '10px' }}>
       El Blog de las 110cc {/* Aquí se cambió el texto */}
        </h1>

        <div style={{ marginTop: '10px' }}>
          <ImageSlider /> {/* Componente del slider */}
        </div>

        <PowerChart /> {/* Componente del gráfico */}
      </Box>
    </Box>
  );
};

export default App;
