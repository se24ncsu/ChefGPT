/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Nav from '../Navbar';
import React from 'react';

jest.mock('@chakra-ui/react', () => {
    return {
        Box: ({ children, ...props }) => <div {...props}>{children}</div>,
        Flex: ({ children, ...props }) => <div {...props}>{children}</div>,
        Avatar: ({ dataTestId = 'mock-avatar', ...props }) => <div data-testid={dataTestId} {...props} />,
        Text: (props) => <span {...props}>{props.children}</span>,
        Button: ({ children, ...props }) => <button {...props}>{children}</button>,
        Menu: ({ children }) => <div>{children}</div>,
        MenuButton: ({ children }) => <button>{children}</button>,
        MenuList: ({ children }) => <div>{children}</div>,
        MenuItem: ({ children, onClick }) => <div onClick={onClick}>{children}</div>,
        MenuDivider: () => <hr />,
        Stack: ({ children, ...props }) => <div {...props}>{children}</div>,
        Center: ({ children, ...props }) => <div style={{ textAlign: 'center' }} {...props}>{children}</div>,
        Heading: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    };
});

describe('Navbar component', () => {
    const mockHandleBookMarks = jest.fn();
    const mockHandleLogout = jest.fn();
    const mockToggleLoginModal = jest.fn();

    test('renders logo and app name', () => {
        render(<Nav />);
        const logoImg = screen.getByRole('img');
        const appName = screen.getByText('CookSmart');

        expect(logoImg).toBeInTheDocument();
        expect(appName).toBeInTheDocument();
    });

    test('renders login button when user is not logged in', () => {
        render(<Nav toggleLoginModal={mockToggleLoginModal} userLoggedIn={false} />);
        const loginButton = screen.getByRole('button', { name: /login/i });

        expect(loginButton).toBeInTheDocument();
    });

    test('calls toggleLoginModal when login button is clicked', () => {
        render(<Nav toggleLoginModal={mockToggleLoginModal} userLoggedIn={false} />);
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);

        expect(mockToggleLoginModal).toHaveBeenCalledTimes(1);
    });

    test('displays user avatar and email when logged in', () => {
        render(
            <Nav
                userLoggedIn={true}
                currentUser={{ email: 'test@example.com' }}
                handleBookMarks={mockHandleBookMarks}
                handleLogout={mockHandleLogout}
            />
        );

        const avatar = screen.getAllByTestId('mock-avatar');
        fireEvent.click(avatar[0]);

        expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    test('calls handleBookMarks when Bookmarks menu item is clicked', () => {
        render(
            <Nav
                userLoggedIn={true}
                currentUser={{ email: 'test@example.com' }}
                handleBookMarks={mockHandleBookMarks}
                handleLogout={mockHandleLogout}
            />
        );

        fireEvent.click(screen.getAllByTestId('mock-avatar')[0]);
        const bookmarksItem = screen.getByText(/bookmarks/i);
        fireEvent.click(bookmarksItem);

        expect(mockHandleBookMarks).toHaveBeenCalledTimes(1);
    });

    test('calls handleLogout when Logout menu item is clicked', () => {
        render(
            <Nav
                userLoggedIn={true}
                currentUser={{ email: 'test@example.com' }}
                handleBookMarks={mockHandleBookMarks}
                handleLogout={mockHandleLogout}
            />
        );

        fireEvent.click(screen.getAllByTestId('mock-avatar')[0]);
        const logoutItem = screen.getByText(/logout/i);
        fireEvent.click(logoutItem);

        expect(mockHandleLogout).toHaveBeenCalledTimes(1);
    });
});
