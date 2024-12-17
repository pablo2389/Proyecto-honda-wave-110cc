import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Comments = ({ comments }: { comments: { text: string }[] }) => (
  <List>
    {comments.map((comment, index) => (
      <ListItem key={index}>
        <ListItemText primary={comment.text} />
      </ListItem>
    ))}
  </List>
);

export default Comments;
