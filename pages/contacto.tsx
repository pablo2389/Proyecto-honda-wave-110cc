import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Contacto = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Contacto
      </Typography>
      <Typography variant="body1" gutterBottom>
        Si querés comunicarte con nosotros, completá el siguiente formulario o escribinos por WhatsApp.
      </Typography>

      <Box component="form" sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Mensaje" variant="outlined" fullWidth multiline rows={4} />
        <Button variant="contained" color="primary">Enviar</Button>
      </Box>
    </Container>
  );
};

export default Contacto;
 