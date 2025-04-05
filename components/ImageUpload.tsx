import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      alert('Imagen subida exitosamente');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Subí la imagen de tu moto acá
      </Typography>
      <input type="file" onChange={handleImageChange} />
      <Button variant="contained" onClick={handleUpload} sx={{ mt: 2 }}>
        Subir Imagen
      </Button>
    </Box>
  );
};

export default ImageUpload;
