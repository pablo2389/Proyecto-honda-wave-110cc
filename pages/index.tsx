// pages/index.tsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Container, CircularProgress, Grid, Card, CardMedia, CardContent,
} from '@mui/material';
import Image from 'next/image';

const Home = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localImages: string[] = [];
    for (let i = 1; i <= 15; i++) {
      if (i === 5 || i === 9) continue;
      localImages.push(`/images/moto${i}.png`);
    }
    setImages(localImages);
    setLoading(false);
  }, []);

  return (
    <>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom align="center">
          Blog de Motos 110cc
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          paragraph
          sx={{ mb: 6 }}
        >
          Dejá la imagen de tu 110 acá y disfrutá de la galería más completa.
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {images.map((url, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia>
                    <Image
                      src={url}
                      alt={`Moto ${index + 1}`}
                      width={350}
                      height={230}
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="subtitle1" align="center">
                      Moto {index + 1}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          mt: 'auto',
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Typography variant="body2">
          © 2025 Blog de Motos 110cc - Todos los derechos reservados
        </Typography>
      </Box>
    </>
  );
};

export default Home;
