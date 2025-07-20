import React, { useState } from 'react';

interface CommentFormProps {
  addComment: (comment: { text: string; author: string }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ addComment }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !author) return;
    addComment({ text, author });
    setText('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tu nombre"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        placeholder="Tu comentario"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Enviar comentario</button>
    </form>
  );
};

export default CommentForm;
