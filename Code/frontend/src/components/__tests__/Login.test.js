import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Login from "../Login";

// Mock props
const mockHandleLogin = jest.fn();
const mockHandleSignup = jest.fn();
const mockToggleLoginModal = jest.fn();

jest.mock("@chakra-ui/react", () => {
    return {
        Modal: ({ children }) => <div>{children}</div>,
        ModalOverlay: ({ children }) => <div>{children}</div>,
        ModalContent: ({ children }) => <div>{children}</div>,
        ModalHeader: ({ children }) => <div>{children}</div>,
        ModalCloseButton: () => <button>Close</button>,
        ModalBody: ({ children }) => <div>{children}</div>,
        ModalFooter: ({ children }) => <div>{children}</div>,
        FormControl: ({ children }) => <div>{children}</div>,
        FormLabel: ({ children }) => <label>{children}</label>,
        Input: (props) => <input {...props} />,
        Button: ({ children, ...props }) => <button {...props}>{children}</button>,
    };
});

afterEach(() => {
    cleanup();
});

test("should render the user name input element", () => {
    render(<Login handleLogin={mockHandleLogin} handleSignup={mockHandleSignup} />);
    const userNameInput = screen.getByPlaceholderText('User name');
    expect(userNameInput).toBeInTheDocument();
});

test("should render the password input element", () => {
    render(<Login handleLogin={mockHandleLogin} handleSignup={mockHandleSignup} />);
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
});

test("Login button calls handleLogin on click", () => {
    render(<Login handleLogin={mockHandleLogin} handleSignup={mockHandleSignup} toggleLoginModal={mockToggleLoginModal} />);

    fireEvent.change(screen.getByPlaceholderText('User name'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    expect(mockHandleLogin).toHaveBeenCalledWith('testuser', 'password123');
    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
});

test("Signup button calls handleSignup on click", () => {
    render(<Login handleLogin={mockHandleLogin} handleSignup={mockHandleSignup} toggleLoginModal={mockToggleLoginModal} />);

    fireEvent.change(screen.getByPlaceholderText('User name'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    const signupButton = screen.getByText('Sign up');
    fireEvent.click(signupButton);

    expect(mockHandleSignup).toHaveBeenCalledWith('testuser', 'password123');
    expect(mockHandleSignup).toHaveBeenCalledTimes(1);
});