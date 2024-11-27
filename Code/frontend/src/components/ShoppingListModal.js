import React from "react";
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease-out;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StyledListItem = styled.li`
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

const StyledCheckbox = styled.input`
  margin-right: 10px;
`;

const StyledItemName = styled.span`
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
`;

const CloseButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4757;
  }
`;

const ShoppingListModal = ({ shoppingList, onClose, onCheckboxChange }) => {
  const sortedList = shoppingList.sort((a, b) => a.checked - b.checked);

  return (
    <StyledModal>
      <ModalContent>
        <h2>Your Shopping List</h2>
        <StyledList>
          {sortedList.map((item) => (
            <StyledListItem key={item.id} checked={item.checked}>
              <StyledCheckbox
                type="checkbox"
                checked={item.checked}
                onChange={() => onCheckboxChange(item.id)}
              />
              <StyledItemName checked={item.checked}>{item.name}</StyledItemName>
            </StyledListItem>
          ))}
        </StyledList>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </StyledModal>
  );
};

export default ShoppingListModal;