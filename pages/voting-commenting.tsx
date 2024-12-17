// VotingAndCommentingPage.tsx
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import CommentForm from '../components/CommentForm';  // Componente de Formulario de Comentarios
import Comments from '../components/Comments';      // Componente para mostrar los comentarios

const VotingAndCommentingPage = () => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, text: 'Me encanta la Honda Wave, es increíble!', author: 'Juan' },
    { id: 2, text: '¡Es la mejor moto de su categoría!', author: 'Maria' },
  ]);

  // Función para manejar el clic en "Votar por la Honda Wave"
  const handleVoteClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/vote', { vote: 'Honda Wave' });
      alert(`Voto registrado: ${response.data.message}`);
    } catch (error) {
      console.error('Error al registrar el voto:', error);
      alert('Hubo un problema al registrar tu voto.');
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un comentario
  const addComment = (newComment: { text: string, author: string }) => {
    setComments((prevComments) => [
      ...prevComments,
      { id: prevComments.length + 1, ...newComment },
    ]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <h1>Blog de las Motos 110cc</h1>
      
      {/* Sección de votos */}
      <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVoteClick}
          sx={{ margin: 1 }}
          disabled={loading}
        >
          {loading ? 'Registrando Voto...' : 'Votar por la Honda Wave'}
        </Button>
      </Box>

      {/* Formulario de comentarios */}
      <CommentForm addComment={addComment} /> {/* Pasando la función 'addComment' */}

      {/* Sección de comentarios */}
      <Comments comments={comments} /> {/* Pasando 'comments' al componente Comments */}
    </Box>
  );
};

export default VotingAndCommentingPage;
