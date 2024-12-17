import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import PowerChart from '../components/PowerChart';
import ImageSlider from '../components/ImageSlider';
import ImageUpload from '../components/ImageUpload';
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';

interface Comment {
  text: string;
}

const App = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [validImages, setValidImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/comments')
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []));
  }, []);

  useEffect(() => {
    const images = [
      'moto1.png', 'moto2.png', 'moto3.png', 'moto4.png',
      'moto6.png', 'moto7.png', 'moto8.png', 'moto10.png',
      'moto11.png', 'moto12.png', 'moto13.png', 'moto14.png', 'moto15.png',
    ];
    const validImages = images.map((img) => `/images/${img}`);
    setValidImages(validImages);
  }, []);

  const addComment = (comment: string) => {
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    }).then(() => {
      setComments((prev) => [...prev, { text: comment }]);
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Head>
        <title>Blog 110cc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1 style={{ textAlign: 'center', fontSize: '4rem' }}>Blog de las 110cc</h1>
        <ImageSlider validImages={validImages} />
        <PowerChart />
        <ImageUpload />
        <CommentForm onSubmit={addComment} />
        <Comments comments={comments} />
      </Container>
    </Box>
  );
};

export default App;
