// components/Voting.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Typography } from '@mui/material';

const Voting = () => {
  const [voted, setVoted] = useState(false); // Para saber si ya se votó
  const [vote, setVote] = useState<string>('');

  const handleVote = async (chosenVote: string) => {
    try {
      // Llamada al backend para registrar el voto
      const response = await axios.post('/api/vote', { vote: chosenVote });
      setVoted(true); // Marcar que el usuario ya votó
      setVote(chosenVote); // Guardar el voto
      alert(response.data.message); // Mensaje de éxito
    } catch (error) {
      console.error('Error al registrar el voto:', error);
      alert('Hubo un error al registrar tu voto.');
    }
  };

  return (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Vota por tu motocicleta 110cc favorita
      </Typography>

      {voted ? (
        <Typography variant="h6" sx={{ color: 'green' }}>
          ¡Gracias por votar! Tu voto fue por: {vote}
        </Typography>
      ) : (
        <div>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleVote('Honda Wave')}
            sx={{ margin: 1 }}
          >
            Votar por Honda Wave
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => handleVote('Competidor A')}
            sx={{ margin: 1 }}
          >
            Votar por Competidor A
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => handleVote('Competidor B')}
            sx={{ margin: 1 }}
          >
            Votar por Competidor B
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Voting;
