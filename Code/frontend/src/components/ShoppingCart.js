import React, { useState, useEffect } from "react";
import ShoppingListModal from "./ShoppingListModal";
import { fetchCartList } from '../service/firestoreService';

// Example fetchCartList that returns just names
const fetchCart = async () => {
  const list = await fetchCartList();
  return list;
};

const ShoppingCart = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Initialize shopping list
  useEffect(() => {
    const initializeShoppingList = async () => {
      const ingredientNames = await fetchCart();

      const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];

      // Merge the lists: preserved state for existing items, and add new items
      const mergedList = ingredientNames.map((name) => {
        const existingItem = savedList.find((item) => item.name === name);
        return existingItem || { id: name, name, checked: false };
      });

      setShoppingList(mergedList);
      localStorage.setItem("shoppingList", JSON.stringify(mergedList));
    };

    initializeShoppingList();
  }, []);

  // Handle checkbox toggle
  const handleCheckboxChange = (id) => {
    const updatedList = shoppingList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setShoppingList(updatedList);
    localStorage.setItem("shoppingList", JSON.stringify(updatedList));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <button onClick={() => setShowModal(true)}>View Shopping List</button>
      {showModal && (
        <ShoppingListModal
          shoppingList={shoppingList}
          onClose={() => setShowModal(false)}
          onCheckboxChange={handleCheckboxChange}
        />
      )}
    </div>
  );
};


export default ShoppingCart;