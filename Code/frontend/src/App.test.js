import { render, screen, fireEvent } from "@testing-library/react";

import React from 'react';
import App from "./App";

jest.mock("./components/Navbar", () => (props) => <div>Navbar</div>);
jest.mock("./components/Login", () => (props) => (
  <div>
    <button onClick={() => props.handleLogin("testuser", "password123")}>Login</button>
    <button onClick={() => props.handleSignup("testuser", "password123")}>Signup</button>
  </div>
));
jest.mock("./components/BookMarksRecipeList", () => () => <div>Bookmarks</div>);
jest.mock("./components/SearchBlock", () => () => <div>Search Block</div>);
jest.mock("./firebase/auth", () => ({
  doSignInWithEmailAndPassword: jest.fn(),
  doCreateUserWithEmailAndPassword: jest.fn(),
  doSignOut: jest.fn(),
}));
jest.mock("./contexts/authContext/index", () => ({
  useAuth: () => ({
    currentUser: null,
    userLoggedIn: false,
  }),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

describe("App component", () => {
  test("renders Navbar", () => {
    render(<App />);
    expect(screen.getByText(/Navbar/i)).toBeInTheDocument();
  });

  test("renders Search Block by default", () => {
    render(<App />);
    expect(screen.getByText(/Search Block/i)).toBeInTheDocument();
  });
});
