// pages/_app.tsx

import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import '../styles/globals.css'; // estilos globales
import 'slick-carousel/slick/slick.css'; // slick-carousel styles
import 'slick-carousel/slick/slick-theme.css';

const theme = createTheme({
  palette: {
    mode: 'dark', // modo oscuro para MUI
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reinicia estilos para Material UI */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
