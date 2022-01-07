import {  opositeTit, capitalize } from './utils';

describe('Run all test of Utils', () => {

    test('opositeTit should return "Derecha" when "izquierdo" is passed', () => {
        const tit = 'izquierdo';
        const result = opositeTit(tit);
        expect(result).toBe('Derecho');
    });

    test('opositeTit should return "Izquierdo" when "derecho" is passed', () => {
        const tit = 'derecho';
        const result = opositeTit(tit);
        expect(result).toBe('Izquierdo');
    });

    test('opositeTit should return undefined when undefined is passed', () => { 
        const tit = undefined;
        const result = opositeTit(tit);
        expect(result).toBe(undefined);
    });

    test('opositeTit should return undefined when null is passed', () => {
        const tit = null;
        const result = opositeTit(tit);
        expect(result).toBe(undefined);
    });
        
    test('capitalize should return "Pecho" when "pecho" is passed', () => {
        const text = 'pecho';
        const result = capitalize(text);
        expect(result).toBe('Pecho');
    });
    
    test('capitalize should return undefined when undefined is passed', () => {
        const text = undefined;
        const result = capitalize(text);
        expect(result).toBe(undefined);
    });
});