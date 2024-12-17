import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem } from '@mui/material';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener los mensajes
  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/chat');
      setMessages(response.data);
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
    }
  };

  // Llamada inicial para obtener los mensajes
  useEffect(() => {
    fetchMessages();

    // Polling: Cada 5 segundos, actualizamos los mensajes
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Función para enviar mensaje
  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      await axios.post('/api/chat', {
        text: message,
        user: 'Usuario', // Aquí puedes obtener el nombre del usuario autenticado
      });
      setMessage('');
      fetchMessages(); // Actualizar los mensajes después de enviar
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <Typography variant="h6">Chat en Vivo</Typography>
      
      {/* Mostrar mensajes */}
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index} sx={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <Typography variant="body2">
              <strong>{msg.user}:</strong> {msg.text}
            </Typography>
          </ListItem>
        ))}
      </List>
      
      {/* Formulario para enviar mensaje */}
      <TextField
        label="Escribe un mensaje..."
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ marginTop: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={sendMessage}
        disabled={loading}
        sx={{ marginTop: '10px' }}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </Button>
    </Box>
  );
};

export default Chat;
