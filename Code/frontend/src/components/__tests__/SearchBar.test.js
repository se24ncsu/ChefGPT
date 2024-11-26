/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor} from '@testing-library/react';
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
  
    test('does not call onChange before debounce time', async () => {
      const { getByPlaceholderText } = render(
        <SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />
      );
  
      const input = getByPlaceholderText('Add ingredients or search by name');
  
      fireEvent.change(input, { target: { value: 'banana' } });
      await new Promise(resolve => setTimeout(resolve, 500)); // Less than debounce time
      expect(onChangeMock).not.toHaveBeenCalled();
    });
    
    test('calls onIngredientAdded when pressing Enter', () => {
      const { getByPlaceholderText } = render(
        <SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />
      );
  
      const input = getByPlaceholderText('Add ingredients or search by name');
  
      fireEvent.change(input, { target: { value: 'tomato' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  
      expect(onIngredientAddedMock).toHaveBeenCalledWith('tomato', ['tomato']);
      expect(input.value).toBe('');
    });
    
    test('calls onIngredientAdded when clicking add button', () => {
      const { getByPlaceholderText, getByTestId } = render(
        <SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />
      );
  
      const input = getByPlaceholderText('Add ingredients or search by name');
      const addButton = getByTestId('add-button');
  
      fireEvent.change(input, { target: { value: 'carrot' } });
      fireEvent.click(addButton);
  
      expect(onIngredientAddedMock).toHaveBeenCalledWith('carrot', ['carrot']);
      expect(input.value).toBe('');
    });
  
    test('handles multiple ingredients correctly', () => {
      const { getByPlaceholderText, getByTestId } = render(
        <SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />
      );
    
      const input = getByPlaceholderText('Add ingredients or search by name');
      const addButton = getByTestId('add-button');
    
      fireEvent.change(input, { target: { value: 'onion' } });
      fireEvent.click(addButton);
    
      fireEvent.change(input, { target: { value: 'pepper' } });
      fireEvent.click(addButton);
    
      expect(onIngredientAddedMock).toHaveBeenCalledTimes(2);
      expect(onIngredientAddedMock).toHaveBeenLastCalledWith('pepper', ['onion', 'pepper']);
    });

});
