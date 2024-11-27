import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../Profile';
import { useAuth } from '../../contexts/authContext';
import { getProfile, saveProfile } from '../../firebase/auth';

jest.mock('../../contexts/authContext');
jest.mock('../../firebase/auth');

const mockUser = { uid: '123' };

describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useAuth.mockReturnValue({ currentUser: mockUser });
    getProfile.mockResolvedValue({
      age: '25',
      gender: 'male',
      height: '180',
      weight: '75',
      dietType: 'gym_diet',
      macros: [
        { name: 'Carbs', value: '200' },
        { name: 'Protein', value: '150' },
      ],
    });
  });

  test('renders Profile component', async () => {
    render(<Profile setActiveSection={jest.fn()} />);

    // Wait for the component to fetch and render data
    await waitFor(() => {
      expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    });
  });

  test('renders Profile component gender', async () => {
    render(<Profile setActiveSection={jest.fn()} />);

    // Wait for the component to fetch and render data
    await waitFor(() => {
      expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    });
  });

  test('loads and displays age', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByLabelText(/age/i)).toHaveValue(25);
    });
  });

  test('loads and displays gender', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByLabelText(/gender/i)).toHaveValue('male');
    });
  });

  test('loads and displays height', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByLabelText(/height/i)).toHaveValue('180');
    });
  });

  test('loads and displays weight', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByLabelText(/weight/i)).toHaveValue('75');
    });
  });

  test('loads and displays diet type', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByLabelText(/type of diet/i)).toHaveValue('gym_diet');
    });
  });

  test('loads and displays macro names', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getAllByPlaceholderText(/macro name/i)).toHaveLength(2);
    });
  });

  test('loads and displays macro values', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getAllByPlaceholderText(/macro value/i)).toHaveLength(2);
    });
  });

  test('allows editing and saving profile data', async () => {
    render(<Profile setActiveSection={jest.fn()} />);

    // Wait for data to load
    await waitFor(() => expect(screen.getByLabelText(/age/i)).toBeInTheDocument());

    // Simulate changes in the form
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '185' } });
    fireEvent.change(screen.getByLabelText(/weight/i), { target: { value: '80' } });

    // Save the profile
    fireEvent.click(screen.getByText(/save/i));

    // Verify `saveProfile` is called with the updated data
    await waitFor(() => {
      expect(saveProfile).toHaveBeenCalledWith(mockUser.uid, expect.objectContaining({
        age: '30',
        height: '185',
        weight: '80',
      }));
    });
  });

  test('allows adding and removing macro fields', async () => {
    render(<Profile setActiveSection={jest.fn()} />);

    // Wait for data to load
    await waitFor(() => expect(screen.getByLabelText(/age/i)).toBeInTheDocument());

    // Add a new macro
    fireEvent.click(screen.getByText(/add macro/i));
    expect(screen.getAllByPlaceholderText(/macro name/i)).toHaveLength(3);
    expect(screen.getAllByPlaceholderText(/macro value/i)).toHaveLength(3);

    // Remove a macro
    const deleteButtons = screen.getAllByLabelText(/remove macro/i);
    fireEvent.click(deleteButtons[0]); // Remove the first macro

    // Verify one less macro field is rendered
    expect(screen.getAllByPlaceholderText(/macro name/i)).toHaveLength(2);
    expect(screen.getAllByPlaceholderText(/macro value/i)).toHaveLength(2);
  });

  test('handles navigation back to home', async () => {
    const mockSetActiveSection = jest.fn();
    render(<Profile setActiveSection={mockSetActiveSection} />);

    // Wait for data to load
    await waitFor(() => expect(screen.getByLabelText(/age/i)).toBeInTheDocument());

    // Simulate clicking the "Home" button
    fireEvent.click(screen.getByText(/home/i));

    // Verify navigation callback is triggered
    expect(mockSetActiveSection).toHaveBeenCalledWith('search');
  });

  test('renders Save button', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getByText(/save/i)).toBeInTheDocument());
  });

  test('renders Home button', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getByText(/home/i)).toBeInTheDocument());
  });

  test('age input accepts input', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getByLabelText(/age/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '28' } });
    expect(screen.getByLabelText(/age/i)).toHaveValue(28);
  });

  test('height input accepts input', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getByLabelText(/height/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '190' } });
    expect(screen.getByLabelText(/height/i)).toHaveValue('190');
  });

  test('weight input accepts input', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getByLabelText(/weight/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/weight/i), { target: { value: '85' } });
    expect(screen.getByLabelText(/weight/i)).toHaveValue('85');
  });

  test('gender dropdown allows selection', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getByLabelText(/gender/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/gender/i), { target: { value: 'female' } });
    expect(screen.getByLabelText(/gender/i)).toHaveValue('female');
  });

  test('diet type dropdown allows selection', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getByLabelText(/type of diet/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/type of diet/i), { target: { value: 'keto_diet' } });
    expect(screen.getByLabelText(/type of diet/i)).toHaveValue('keto_diet');
  });

  test('macro name input accepts input', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getAllByPlaceholderText(/macro name/i)).toHaveLength(2));
    fireEvent.change(screen.getAllByPlaceholderText(/macro name/i)[0], { target: { value: 'Fats' } });
    expect(screen.getAllByPlaceholderText(/macro name/i)[0]).toHaveValue('Fats');
  });

  test('macro value input accepts input', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getAllByPlaceholderText(/macro value/i)).toHaveLength(2));
    fireEvent.change(screen.getAllByPlaceholderText(/macro value/i)[0], { target: { value: '100' } });
    expect(screen.getAllByPlaceholderText(/macro value/i)[0]).toHaveValue('100');
  });

  test('renders loading state initially', () => {
    render(<Profile setActiveSection={jest.fn()} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
