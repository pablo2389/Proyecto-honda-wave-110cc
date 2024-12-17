import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const HomeButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');  // Redirige al usuario a la página principal
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      sx={{ padding: '10px 20px', marginTop: '10px' }}
    >
      Volver al Inicio
    </Button>
  );
};

export default HomeButton;
