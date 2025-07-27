import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from '../components/navbar';
import '../styles/globals.css';

const theme = createTheme({
  palette: { mode: 'dark' },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar /> {/* Navbar solo aquí */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
