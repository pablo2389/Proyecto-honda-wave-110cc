import React from 'react';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface CommentsProps {
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => (
  <div>
    {comments.map(({ id, text, author }) => (
      <div key={id}>
        <p><strong>{author}</strong>: {text}</p>
      </div>
    ))}
  </div>
);

export default Comments;
