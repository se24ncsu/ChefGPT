import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShoppingListModal from '../ShoppingListModal';

describe('ShoppingListModal', () => {
  const mockShoppingList = [
    { id: 1, name: 'Apples', checked: false },
    { id: 2, name: 'Bananas', checked: true },
    { id: 3, name: 'Milk', checked: false },
  ];

  const mockOnClose = jest.fn();
  const mockOnCheckboxChange = jest.fn();

  beforeEach(() => {
    render(
      <ShoppingListModal
        shoppingList={mockShoppingList}
        onClose={mockOnClose}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );
  });

  test('renders the modal with the correct title', () => {
    expect(screen.getByText('Shopping List')).toBeInTheDocument();
  });

  test('displays all items in the shopping list', () => {
    mockShoppingList.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test('sorts items with unchecked items first', () => {
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Apples');
    expect(listItems[1]).toHaveTextContent('Milk');
    expect(listItems[2]).toHaveTextContent('Bananas');
  });

  
});