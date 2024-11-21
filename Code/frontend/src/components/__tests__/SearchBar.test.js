/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SearchBar from '../SearchBar';
import '@testing-library/jest-dom/extend-expect';

describe('SearchBar Component', () => {
    let onChangeMock;
    let onIngredientAddedMock;

    beforeEach(() => {
        onChangeMock = jest.fn();
        onIngredientAddedMock = jest.fn();
    });

    test('calls onIngredientAdded when pressing Enter key', () => {
        render(<SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />);
        const input = screen.getByPlaceholderText('Add ingredients or search by name');

        fireEvent.change(input, { target: { value: 'orange' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(onIngredientAddedMock).toHaveBeenCalledWith('orange', ['orange']);
    });
    
    test('Clears search bar after pressing enter', () => {
        render(<SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />);
        const input = screen.getByPlaceholderText('Add ingredients or search by name');

        fireEvent.change(input, { target: { value: 'orange' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(input.value).toBe(''); 
    });

    test('does not call onChange immediately on input change due to debounce', () => {
        render(<SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />);
        const input = screen.getByPlaceholderText('Add ingredients or search by name');
        fireEvent.change(input, { target: { value: 'pear' } });

        expect(onChangeMock).not.toHaveBeenCalled();
    });

});
