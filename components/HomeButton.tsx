import React from 'react';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';

const HomeButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<HomeIcon />}
      onClick={handleClick}
      sx={{ padding: '10px 20px', marginTop: '10px' }}
    >
      Volver al Inicio
    </Button>
  );
};

export default HomeButton;
