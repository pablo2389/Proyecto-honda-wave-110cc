import React, { useState } from 'react';
import { Box, CssBaseline, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Menu from '../components/Menu';  // Asegúrate de que este componente esté importado correctamente
import HomeButton from '../components/HomeButton';  // Importa el componente de HomeButton para redirigir
import Comments from '../components/Comments';  // Importa el componente de comentarios

const Home = () => {
  const [comment, setComment] = useState<string>(''); // Estado para el comentario
  const [comments, setComments] = useState<any[]>([]); // Estado para los comentarios guardados
  const [loading, setLoading] = useState<boolean>(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value); // Actualiza el comentario en el estado
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment) {
      alert('Por favor, escribe un comentario.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/comments', { comment });  // Enviar el comentario
      alert('Comentario publicado!');
      setComment('');  // Limpiar el campo de texto después de enviar el comentario
      setComments((prevComments) => [response.data.data, ...prevComments]);  // Agregar el nuevo comentario a la lista
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
      <Menu />  {/* Componente de navegación */}

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

        {/* Formulario para enviar comentario */}
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
              backgroundColor: '#1976d2',
              color: 'white',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            disabled={loading || !comment}
          >
            {loading ? 'Cargando...' : 'Enviar Comentario'}
          </Button>
        </form>

        {/* Visualizar los comentarios */}
        <div style={{ marginTop: '30px', width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Comentarios:
          </Typography>
          <Comments comments={comments} /> {/* Componente que muestra los comentarios */}
        </div>

        {/* Botón para redirigir al inicio */}
        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <HomeButton /> {/* Componente del botón de inicio */}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
