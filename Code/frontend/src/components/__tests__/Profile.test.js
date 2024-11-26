
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
    useAuth.mockReturnValue({ currentUser: mockUser });
    getProfile.mockResolvedValue({
      age: '25',
      gender: 'male',
      height: '180',
      weight: '75',
      dietType: 'gym_diet',
      macros: [{ name: 'Carbs', value: '200' }, { name: 'Protein', value: '150' }],
    });
  });

  test('renders Profile component', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getByLabelText(/age/i)).toBeInTheDocument());
  });

  test('loads and displays profile data', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByLabelText(/age/i).value).toBe('25');
      expect(screen.getByLabelText(/gender/i).value).toBe('male');
      expect(screen.getByLabelText(/height/i).value).toBe('180');
      expect(screen.getByLabelText(/weight/i).value).toBe('75');
      expect(screen.getByLabelText(/type of diet/i).value).toBe('gym_diet');
      expect(screen.getByPlaceholderText(/macro name/i).value).toBe('Carbs');
      expect(screen.getByPlaceholderText(/macro value/i).value).toBe('200');
    });
  });

  test('saves profile data', async () => {
    render(<Profile setActiveSection={jest.fn()} />);
    await waitFor(() => expect(screen.getByLabelText(/age/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '30' } });
    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(saveProfile).toHaveBeenCalledWith(mockUser.uid, expect.objectContaining({ age: '30' }));
    });
  });
});