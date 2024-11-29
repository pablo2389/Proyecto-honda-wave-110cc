// components/CommentForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment) {
      alert('Por favor escribe un comentario');
      return;
    }

    setLoading(true);

    // Crear un objeto con los datos que vamos a enviar al backend
    const formData = new FormData();
    formData.append('comment', comment);
    if (image) {
      formData.append('image', image);
    }

    try {
      // Enviar los datos al backend para que se almacenen
      const response = await axios.post('/api/comments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Resetear el formulario
      setComment('');
      setImage(null);

      alert('Comentario publicado exitosamente');
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      alert('Hubo un error al publicar el comentario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Deja tu comentario o anécdota sobre la Honda Wave 110cc</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Escribe aquí tu comentario o anécdota"
          rows={4}
          required
        />
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Publicando...' : 'Publicar Comentario'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
