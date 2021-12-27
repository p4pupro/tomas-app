import { formatDate } from './utils';

test('formatDate with wrong parameter date', () => {
    const date = '';
    const result = formatDate(date);
    expect(result).toBe(null);
});

test('formatDate with valid parameter date', () => {
    const date = '2021-12-24';
    const result = formatDate(date);
    expect(result).toBe('24/12/2021');
});