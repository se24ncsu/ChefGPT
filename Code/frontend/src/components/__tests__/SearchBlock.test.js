import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBlock from '../SearchBlock';
import { useAuth } from '../../contexts/authContext/index';
import axios from 'axios';
import jsPDF from 'jspdf';

jest.setTimeout(20000);

jest.mock('axios');
jest.mock('jspdf');
jest.mock('../../contexts/authContext/index', () => ({
    useAuth: jest.fn(),
}));
jest.mock('../../service/firestoreService', () => ({
    bookmarkRecipe: jest.fn(),
    unbookmarkRecipe: jest.fn(),
    isRecipeBookmarked: jest.fn(),
}));

describe('SearchBlock Component', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ userLoggedIn: true });
        axios.post.mockResolvedValue({
            data: {
                recipes: [
                    { name: 'Pasta', ingredients: ['Tomato', 'Basil'], tags: ['Italian'], time: '30 minutes' },
                    { name: 'Salad', ingredients: ['Lettuce', 'Carrot'], tags: ['Healthy'], time: '10 minutes' }
                ],
                ingredients: ['Tomato', 'Basil']
            }
        });
        jsPDF.mockImplementation(() => ({
            save: jest.fn(),
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<SearchBlock />);
        expect(screen.getByPlaceholderText(/Add ingredients or search by name/i)).toBeInTheDocument();
    });
});
