import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const CommentForm = ({ onSubmit }: { onSubmit: (comment: string) => void }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Nuevo Comentario"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Agregar
      </Button>
    </Box>
  );
};

export default CommentForm;
