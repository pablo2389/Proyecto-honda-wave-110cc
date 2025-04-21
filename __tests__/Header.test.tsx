import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header'; // Asegurate que esta ruta sea la correcta

describe('Header component', () => {
  it('muestra el texto correctamente', () => {
    render(<Header />);
    expect(screen.getByText('Bienvenido a mi sitio')).toBeInTheDocument();
  });
});
