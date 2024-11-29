import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const HomeButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');  // Redirige a la página de inicio
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="secondary"  // Color alternativo para mayor contraste
      size="large"       // Tamaño grande
      style={{
        marginTop: '20px',  // Espacio superior para separarlo del contenido
        padding: '12px 24px', // Mayor tamaño del botón
        fontSize: '16px',    // Tamaño de la fuente
        fontWeight: 'bold',  // Negrita para destacar
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',  // Sombra para resaltar
      }}
    >
      Home
    </Button>
  );
};

export default HomeButton;
