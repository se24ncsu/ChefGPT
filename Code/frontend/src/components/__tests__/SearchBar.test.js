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

    test('renders input field with placeholder', () => {
      const { getByPlaceholderText } = render(
        <SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />
      );
  
      const input = getByPlaceholderText('Add ingredients or search by name');
      expect(input).toBeInTheDocument();
    });
  
    test('calls onChange after debounce time when typing', async () => {
      const { getByPlaceholderText } = render(
        <SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />
      );
  
      const input = getByPlaceholderText('Add ingredients or search by name');
  
      fireEvent.change(input, { target: { value: 'apple' } });
      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledWith('apple');
      }, { timeout: 1500 }); // Wait slightly longer than debounce time
    });
  
    test('does not call onChange before debounce time', async () => {
      const { getByPlaceholderText } = render(
        <SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />
      );
  
      const input = getByPlaceholderText('Add ingredients or search by name');
  
      fireEvent.change(input, { target: { value: 'banana' } });
      await new Promise(resolve => setTimeout(resolve, 500)); // Less than debounce time
      expect(onChangeMock).not.toHaveBeenCalled();
    });
  
  


});
