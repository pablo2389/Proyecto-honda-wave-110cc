import React, { useEffect, useState } from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import Menu from '../components/Menu';
import ImageUpload from '../components/ImageUpload';
import Image from 'next/image';  // Importa el componente Image de Next.js

const Home = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localImages: string[] = [];

    // ✅ Generamos del 1 al 15, excluyendo 5 y 9
    for (let i = 1; i <= 15; i++) {
      if (i === 5 || i === 9) continue;  // Omite las imágenes moto5.png y moto9.png
      localImages.push(`/images/moto${i}.png`);
    }

    setImages(localImages);
    setLoading(false);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Menu />

      <Container
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom>
          Blog de Motos 110cc
        </Typography>

        <Typography variant="h5" gutterBottom>
          Dejá la imagen de tu 110 acá
        </Typography>

        <ImageUpload />

        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : (
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {images.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Moto ${index + 1}`}
                width={200}  // Ajusta el tamaño de la imagen
                height={200} // Ajusta el tamaño de la imagen
                style={{ borderRadius: '10px' }}
                priority={index === 0} // Solo la primera imagen tiene prioridad
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
