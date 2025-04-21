import { render, screen } from '@testing-library/react';
import Menu from './Menu';

describe('Menu component', () => {
  it('renders correctly', () => {
    render(<Menu />);
    expect(screen.getByText(/inicio/i)).toBeInTheDocument();
  });
});
