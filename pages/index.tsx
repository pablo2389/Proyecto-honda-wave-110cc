// pages/index.tsx
import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Menu from '../components/Menu'; // Componente de navegación

const Home = () => {
  const [comment, setComment] = useState<string>(''); // Estado para el comentario
  const [comments, setComments] = useState<any[]>([]); // Estado para los comentarios guardados
  const [loading, setLoading] = useState<boolean>(false);

  // Maneja el cambio de texto en el campo del comentario
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // Maneja el envío del formulario
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment) {
      alert('Por favor, escribe un comentario.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/comments', { comment });
      alert('Comentario publicado!');
      setComment(''); // Limpiar el campo de texto

      // Actualizar la lista de comentarios
      setComments((prevComments) => [response.data.data, ...prevComments]);
    } catch (error) {
      console.error('Error al publicar el comentario:', error);
      alert('Hubo un error al publicar el comentario.');
    } finally {
      setLoading(false);
    }
  };

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

        <div style={{ marginTop: '20px', width: '100%' }}>
          <Typography variant="h5">Deja tu comentario:</Typography>
          <form onSubmit={handleCommentSubmit} style={{ marginTop: '10px', width: '100%' }}>
            <TextField
              label="Escribe tu comentario..."
              variant="outlined"
              fullWidth
              value={comment}
              onChange={handleCommentChange}
              multiline
              rows={4}
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{
                marginTop: '10px',
                padding: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#1976d2',  // Azul llamativo
                color: 'white',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              disabled={loading || !comment}
            >
              {loading ? 'Cargando...' : 'Enviar Comentario'}
            </Button>
          </form>
        </div>

        {/* Mostrar los comentarios */}
        <div style={{ marginTop: '30px', width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Comentarios:
          </Typography>
          {comments.length === 0 ? (
            <Typography>No hay comentarios aún.</Typography>
          ) : (
            comments.map((comment, index) => (
              <Box key={index} sx={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                <Typography variant="body1">{comment.comment}</Typography>
                <Typography variant="caption" color="textSecondary" sx={{ marginTop: '5px' }}>
                  Publicado el {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              </Box>
            ))
          )}
        </div>
      </Box>
    </Box>
  );
};

export default Home;
