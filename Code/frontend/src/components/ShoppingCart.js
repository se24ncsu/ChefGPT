/* istanbul ignore file */
import React, { useState, useEffect } from "react";
import { fetchCartList } from '../service/firestoreService';
import styled from 'styled-components';

const ShoppingListContainer = styled.div`
  background-color: #f0f8ff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ShoppingListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${props => props.checked ? '#e6ffe6' : '#fff0f0'};
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.checked ? '#ccffcc' : '#ffe6e6'};
  }
`;

const ItemCheckbox = styled.input`
  margin-right: 10px;
`;

const ItemName = styled.span`
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
`;

const ShoppingCart = () => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const initializeShoppingList = async () => {
      const ingredientNames = await fetchCartList();
      const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
      const mergedList = ingredientNames.map((name) => {
        const existingItem = savedList.find((item) => item.name === name);
        return existingItem || { id: name, name, checked: false };
      });
      setShoppingList(mergedList);
      localStorage.setItem("shoppingList", JSON.stringify(mergedList));
    };
    initializeShoppingList();
  }, []);

  const handleCheckboxChange = (id) => {
    const updatedList = shoppingList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setShoppingList(updatedList);
    localStorage.setItem("shoppingList", JSON.stringify(updatedList));
  };

  const sortedList = shoppingList.sort((a, b) => a.checked - b.checked);

  return (
    <ShoppingListContainer>
      <h2>Shopping List</h2>
      <ul>
        {sortedList.map((item) => (
          <ShoppingListItem key={item.id} checked={item.checked}>
            <ItemCheckbox
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <ItemName checked={item.checked}>{item.name}</ItemName>
          </ShoppingListItem>
        ))}
      </ul>
    </ShoppingListContainer>
  );
};

export default ShoppingCart;