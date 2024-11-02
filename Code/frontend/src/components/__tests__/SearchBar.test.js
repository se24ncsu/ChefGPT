import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
import '@testing-library/jest-dom/extend-expect';

describe('SearchBar Component', () => {
    let onChangeMock;
    let onIngredientAddedMock;

    beforeEach(() => {
        onChangeMock = jest.fn();
        onIngredientAddedMock = jest.fn();
        render(<SearchBar onChange={onChangeMock} onIngredientAdded={onIngredientAddedMock} />);
    });

    test('calls onIngredientAdded when pressing Enter key', () => {
        const input = screen.getByPlaceholderText('Add ingredients or search by name');

        fireEvent.change(input, { target: { value: 'orange' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(onIngredientAddedMock).toHaveBeenCalledWith('orange', ['orange']);
    });


});
