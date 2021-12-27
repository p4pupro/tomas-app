import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders title of header', () => {
    render(<Header />);
    const title = screen.getByText(/Tomas Baby - Registra sus tomas/i);
    expect(title).toBeInTheDocument();
});
  