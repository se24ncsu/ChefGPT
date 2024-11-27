/* istanbul ignore file */
import React, { useState } from "react";
import Nav from "./components/Navbar.js";
import Login from "./components/Login.js";
import BookMarksRecipeList from "./components/BookMarksRecipeList.js";
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword, doSignOut } from "./firebase/auth";
import SearchBlock from "./components/SearchBlock.js";
import { useAuth, AuthProvider } from "./contexts/authContext/index";
import ShoppingCart from "./components/ShoppingCart.js";
import MealPlan from "./components/MealPlan.js";
import Profile from "./components/Profile.js";

const App = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState("search"); // 'search', 'bookmarks', or 'cart'

  const toggleLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };

  const handleSignup = async (email, password) => {
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      setShowLoginModal(false);
      setActiveSection("profile"); // Show profile page after signup
      alert("Successfully Signed up!");
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/network-request-failed') {
        alert("Network error, please try again later.");
      } else {
        alert(err.message);
      }
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await doSignInWithEmailAndPassword(email, password);
      setShowLoginModal(false);
      alert("Successfully logged in!");
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/network-request-failed') {
        alert("Network error, please try again later.");
      } else {
        alert(err.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await doSignOut();
      alert("Logged out successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to log out");
    }
  };

  const handleShowBookmarks = () => {
    setActiveSection("bookmarks");
  };

  const handleShowCart = () => {
    setActiveSection("cart");
  };

  const handleMealplanning = () => {
    setActiveSection("mealplan");
  }

  const handleShowProfile = () => {
    setActiveSection("profile");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "bookmarks":
        return <BookMarksRecipeList />;
      case "cart":
        return <ShoppingCart />;
      case "mealplan":
        return <MealPlan />
      case "profile":
        return <Profile setActiveSection={setActiveSection} />;
      default:
        return <SearchBlock />;
    }
  };

  return (
    <div>
      <Nav
        handleLogout={handleLogout}
        currentUser={currentUser}
        toggleLoginModal={toggleLoginModal}
        userLoggedIn={userLoggedIn}
        handleBookMarks={handleShowBookmarks}
        handleCart={handleShowCart}
        handleMealplanning={handleMealplanning}
        handleProfile={handleShowProfile}
      />
      {showLoginModal && (
        <Login
          handleSignup={handleSignup}
          handleLogin={handleLogin}
          toggleLoginModal={toggleLoginModal}
        />
      )}
      {renderContent()}
    </div>
  );
};

const AppWithProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProvider;
