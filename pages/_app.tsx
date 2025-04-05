import { Box, Container, CssBaseline } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ImageSlider from '../components/ImageSlider';
import ImageUpload from '../components/ImageUpload';
import PowerChart from '../components/PowerChart';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const App = () => {
  const [validImages, setValidImages] = useState<string[]>([]);

  useEffect(() => {
    const images = [
      'moto1.png', 'moto2.png', 'moto3.png', 'moto4.png',
      'moto6.png', 'moto7.png', 'moto8.png', 'moto10.png',
      'moto11.png', 'moto12.png', 'moto13.png', 'moto14.png', 'moto15.png',
    ];
    const validImages = images.map((img) => `/images/${img}`); // Ruta desde /public
    setValidImages(validImages);
  }, []);
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Head>
        <title>Blog 110cc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1 style={{ textAlign: 'center', fontSize: '5rem' }}>Blog de las 110cc</h1>
        <ImageSlider validImages={validImages} />
        <PowerChart />
        <ImageUpload />
      </Container>
    </Box>
  );
};

export default App;
