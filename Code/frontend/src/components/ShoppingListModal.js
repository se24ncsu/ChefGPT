import React from "react";

const ShoppingListModal = ({ shoppingList, onClose, onCheckboxChange }) => {
  // Sort the list: unchecked items first
  const sortedList = shoppingList.sort((a, b) => a.checked - b.checked);

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Shopping List</h3>
        <ul>
          {sortedList.map((item) => (
            <li
              key={item.id}
              style={{
                textDecoration: item.checked ? "line-through" : "none",
              }}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onCheckboxChange(item.id)}
              />
              {item.name}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShoppingListModal;