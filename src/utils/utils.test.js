import {  opositeTit, capitalize } from './utils';

describe('Run all test of Utils', () => {

    test('opositeTit should return "Derecha" when "izquierda" is passed', () => {
        const tit = 'izquierda';
        const result = opositeTit(tit);
        expect(result).toBe('Derecha');
    });

    test('opositeTit should return "Izquierda" when "derecha" is passed', () => {
        const tit = 'derecha';
        const result = opositeTit(tit);
        expect(result).toBe('Izquierda');
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
        
    test('capitalize should return "Teta" when "teta" is passed', () => {
        const text = 'teta';
        const result = capitalize(text);
        expect(result).toBe('Teta');
    });
    
    test('capitalize should return undefined when undefined is passed', () => {
        const text = undefined;
        const result = capitalize(text);
        expect(result).toBe(undefined);
    });
});