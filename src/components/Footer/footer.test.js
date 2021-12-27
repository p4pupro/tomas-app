import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

test('renders Footer component and check Tomas baby by text', () => {
  render(<Footer />);
  const footerTitle = screen.getByText(/Tomas baby by/i);
  expect(footerTitle).toBeInTheDocument();
});