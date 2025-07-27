// pages/galeria.tsx
import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const imagenesDisponibles = [
  'moto1.png',
  'moto2.png',
  'moto3.png',
  'moto4.png',
  'moto6.png',
  'moto7.png',
  'moto8.png',
  'moto10.png',
  'moto11.png',
  'moto12.png',
  'moto13.png',
  'moto14.png',
  'moto15.png',
];

const Galeria = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Galería
      </Typography>
      <Typography variant="body1" gutterBottom>
        Próximamente vas a poder ver las fotos y detalles de motos modificadas, repuestos y más.
      </Typography>
      <Grid container spacing={2}>
        {imagenesDisponibles.map((img, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
              <CardMedia
                component="img"
                image={`/images/${img}`}
                alt={`Moto ${i + 1}`}
              />
              <CardContent>
                <Typography variant="body2">Moto {i + 1}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Galeria;
