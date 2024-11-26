
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from '../components/UserProfile';
import recipeDB from '../apis/recipeDB';

jest.mock('../apis/recipeDB');

describe('UserProfile Component', () => {
    const mockHandleProfileView = jest.fn();
    const mockUser = { userName: 'testUser' };

    beforeEach(() => {
        recipeDB.get.mockResolvedValue({
            data: {
                bookmarks: [
                    { id: 1, title: 'Recipe 1' },
                    { id: 2, title: 'Recipe 2' }
                ]
            }
        });
    });

    test('renders UserProfile component', async () => {
        render(<UserProfile user={mockUser} handleProfileView={mockHandleProfileView} />);

        expect(screen.getByText(`Saved Recipes for ${mockUser.userName}`)).toBeInTheDocument();
        expect(screen.getByText('Go to HomePage')).toBeInTheDocument();

        const button = screen.getByText('Go to HomePage');
        fireEvent.click(button);
        expect(mockHandleProfileView).toHaveBeenCalled();
    });

    test('displays bookmarks after fetching', async () => {
        render(<UserProfile user={mockUser} handleProfileView={mockHandleProfileView} />);

        expect(await screen.findByText('Recipe 1')).toBeInTheDocument();
        expect(await screen.findByText('Recipe 2')).toBeInTheDocument();
    });
});