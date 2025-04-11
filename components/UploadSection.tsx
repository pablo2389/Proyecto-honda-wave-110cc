import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const UploadSection = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!title || !image) return alert('Agrega un título y una imagen');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    setLoading(true);
    try {
      await axios.post('/api/upload', formData); // Cambia la ruta según tu API
      setTitle('');
      setImage(null);
      alert('Imagen subida correctamente');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al subir la imagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6">Subir imagen personalizada</Typography>
      <TextField
        label="Título"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ my: 2 }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleImageUpload}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Subiendo...' : 'Subir imagen'}
      </Button>
    </Box>
  );
};

export default UploadSection;
