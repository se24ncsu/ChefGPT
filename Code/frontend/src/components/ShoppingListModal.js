import React from "react";

const ShoppingListModal = ({ shoppingList, onClose, onCheckboxChange }) => {
  // Sort the list: unchecked items first
  const sortedList = shoppingList.sort((a, b) => a.checked - b.checked);

  return (
    <div className="modal" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" data-testid="modal-container">
      <div className="modal-content">
        <h3 id="modal-title">Shopping List</h3>
        <div id="modal-description" className="sr-only">List of shopping items</div>
        {sortedList.length === 0 ? (
          <p>No items in the shopping list</p>
        ) : (
          <ul>
            {sortedList.map((item) => (
              <li
                key={item.id}
                data-key={item.id}
                style={{
                  textDecoration: item.checked ? 'line-through' : 'none',
                  wordWrap: 'break-word'
                }}
              >
                <label htmlFor={`checkbox-${item.id}`}>
                  <input
                    id={`checkbox-${item.id}`}
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => onCheckboxChange(item.id)}
                  />
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShoppingListModal;