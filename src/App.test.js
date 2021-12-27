import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App and check Teta text', () => {
  render(<App />);
  const tetaTitle = screen.getByText(/Teta/i);
  expect(tetaTitle).toBeInTheDocument();
});
