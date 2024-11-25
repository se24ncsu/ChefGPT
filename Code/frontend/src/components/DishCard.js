// import React, { useState, useEffect } from "react";
// import ShoppingListModal from "./ShoppingListModal";

// const DishCard = ({ dish, onRemove }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [shoppingList, setShoppingList] = useState([]);

//   // Fetch shopping list from localStorage or initialize it
//   useEffect(() => {
//     const savedList = localStorage.getItem(`shoppingList-${dish.id}`);
//     if (savedList) {
//       setShoppingList(JSON.parse(savedList));
//     } else {
//       setShoppingList(dish.ingredients.map((item) => ({ name: item, checked: false })));
//     }
//   }, [dish.id, dish.ingredients]);

//   // Save shopping list to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem(`shoppingList-${dish.id}`, JSON.stringify(shoppingList));
//   }, [shoppingList, dish.id]);

//   const toggleModal = () => setShowModal((prev) => !prev);

//   const handleCheckboxChange = (index) => {
//     const updatedList = [...shoppingList];
//     updatedList[index].checked = !updatedList[index].checked;
//     setShoppingList(updatedList);
//   };

//   return (
//     <div className="dish-card">
//       <img src={dish.image} alt={dish.name} className="dish-image" />
//       <div className="dish-details">
//         <h3>{dish.name}</h3>
//         <p>{dish.description}</p>
//         <p>Price: ${dish.price}</p>
//         <button onClick={toggleModal}>View Shopping List</button>
//         <button onClick={() => onRemove(dish.id)}>Remove</button>
//       </div>
//       {showModal && (
//         <ShoppingListModal
//           shoppingList={shoppingList}
//           onClose={toggleModal}
//           onCheckboxChange={handleCheckboxChange}
//         />
//       )}
//     </div>
//   );
// };

// export default DishCard;