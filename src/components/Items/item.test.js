import { render, screen } from '@testing-library/react';
import { Items } from './Items';

test('renders Items and check Fecha text', () => {
    const toma = { 
       date: '12/12/2021', 
       time: '12:12', 
       tit: 'izquierdo', 
       action: 'empieza', 
       id: 'SD8F97G6SDF' 
    };
    const index = jest.mock();
    const handleDelete = jest.fn();

    render(<Items toma={toma} key={index} handleDelete={handleDelete} />);
    const dateTitle = screen.getByText(/Fecha/i);
    expect(dateTitle).toBeInTheDocument();
});
