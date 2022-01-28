import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

test('renders Footer component and check Tomas baby by text', () => {
  render(<Footer />);
  const footerTitle = screen.getByText(/Baby Dan by @p4pupro/i);
  expect(footerTitle).toBeInTheDocument();
});