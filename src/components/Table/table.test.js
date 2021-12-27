import { render, screen } from '@testing-library/react';
import { Table } from './Table';

test('renders Table component and check Historial text', () => {
  render(<Table />);
  const histoTitle = screen.getByText(/Historial/i);
  expect(histoTitle).toBeInTheDocument();
});