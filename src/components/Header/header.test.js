import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders title of header', () => {
    render(<Header />);
    const title = screen.getByText(/Baby Dan/i);
    expect(title).toBeInTheDocument();
});


test('renders licks buttons', () => {
    render(<Header />);
    const buttons = screen.getAllByRole('a');
    expect(buttons).toHaveLength(5);
});

  