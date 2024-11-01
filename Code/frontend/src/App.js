import React, { useState } from "react";
import Nav from "./components/Navbar.js";
import Login from "./components/Login.js";
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword, doSignOut } from "./firebase/auth";
import SearchBlock from "./components/SearchBlock.js";
import { useAuth, AuthProvider } from "./contexts/authContext/index";

const App = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(prev => !prev);
  };

  const handleSignup = async (email, password) => {
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      setShowLoginModal(false);
      alert("Successfully Signed up!");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await doSignInWithEmailAndPassword(email, password);
      setShowLoginModal(false);
      alert("Successfully logged in!");
    } catch (err) {
      console.log(err);
      alert(err.message);
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

  return (
    <div>
      <Nav
        handleLogout={handleLogout}
        currentUser={currentUser}
        toggleLoginModal={toggleLoginModal}
        userLoggedIn={userLoggedIn}
      />
      {showLoginModal && (
        <Login handleSignup={handleSignup} handleLogin={handleLogin} toggleLoginModal={toggleLoginModal} />
      )}
      <SearchBlock />
    </div>
  );
};

const AppWithProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProvider;