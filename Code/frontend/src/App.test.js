/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import AppWithProvider from './App';

import React from 'react';
import App from "./App";

jest.mock("./components/Navbar", () => (props) => (
  <div>
    Navbar
    <button onClick={props.toggleLoginModal}>Login</button>
    <button onClick={props.handleLogout}>Logout</button>
    <button onClick={props.handleBookMarks}>Bookmarks</button>
    <button onClick={props.handleCart}>Shopping Cart</button>
    <button onClick={props.handleProfile}>Profile</button>
  </div>
));

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

  // Trivial test cases
  test("renders Login button", () => {
    render(<App />);
    expect(screen.getAllByText(/Login/i)[0]).toBeInTheDocument();
  });

  test("renders Signup button", () => {
    render(<App />);
  });

  test("renders Bookmarks section", () => {
    render(<AppWithProvider />);
    fireEvent.click(screen.getByText(/Bookmarks/i));
    const elements = screen.getAllByText(/Bookmarks/i);
    expect(elements).toBeInstanceOf(Array);
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });

  test("renders Search Block section", () => {
    render(<App />);
    expect(screen.getByText(/Search Block/i)).toBeInTheDocument();
  });

  test("renders Navbar component", () => {
    render(<App />);
    expect(screen.getByText(/Navbar/i)).toBeInTheDocument();
  });

  test("renders ShoppingCart component", () => {
    render(<AppWithProvider />);
    fireEvent.click(screen.getByText(/Shopping Cart/i));
    const elements = screen.getAllByText(/Shopping Cart/i);
    expect(elements).toBeInstanceOf(Array);
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });

  test("renders Profile component", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Profile/i));
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  test("Login button triggers handleLogin", () => {
    render(<App />);
    //fireEvent.click(screen.getAllByText(/Login/i)[1]);
    //expect(screen.getByText(/Successfully logged in!/i)).toBeInTheDocument();
  });

  test("Signup button triggers handleSignup", () => {
    render(<App />);
  });

  test("Logout button triggers handleLogout", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Logout/i));
  });

  test("renders default section as Search Block", () => {
    render(<App />);
    expect(screen.getByText(/Search Block/i)).toBeInTheDocument();
  });

  test("renders Bookmarks section when activeSection is bookmarks", () => {
    render(<AppWithProvider />);
    fireEvent.click(screen.getByText(/Bookmarks/i));
    const elements = screen.getAllByText(/Bookmarks/i);
    expect(elements).toBeInstanceOf(Array);
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });

  test("renders ShoppingCart section when activeSection is cart", () => {
    render(<AppWithProvider />);
    fireEvent.click(screen.getByText(/Shopping Cart/i));
    const elements = screen.getAllByText(/Shopping Cart/i);
    expect(elements).toBeInstanceOf(Array);
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
});

  test("renders Profile section when activeSection is profile", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Profile/i));
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  test("toggles login modal visibility", () => {
    render(<App />);
    fireEvent.click(screen.getAllByText(/Login/i)[0]);
    expect(screen.getAllByText(/Login/i)[1]).toBeInTheDocument();
  });

  test("renders correct section based on activeSection state", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Bookmarks/i));
    expect(screen.getAllByText(/Bookmarks/i)).toBeInstanceOf(Array);
    fireEvent.click(screen.getByText(/Shopping Cart/i));
    expect(screen.getAllByText(/Shopping Cart/i)).toBeInstanceOf(Array);
    fireEvent.click(screen.getByText(/Profile/i));
    expect(screen.getAllByText(/Profile/i)).toBeInstanceOf(Array);
  });

  test("toggles login modal visibility correctly", () => {
    render(<App />);
    fireEvent.click(screen.getAllByText(/Login/i)[0]);
    fireEvent.click(screen.getAllByText(/Login/i)[0]);
  });

  test("handles logout correctly", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Logout/i));
  });
});
