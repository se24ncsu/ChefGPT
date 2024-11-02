import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tag from '../Tag';

describe('Tag Component', () => {
    test('renders the Tag component with children', () => {
        render(<Tag>Sample Tag</Tag>);
        const tagElement = screen.getByText(/Sample Tag/i);
        expect(tagElement).toBeInTheDocument();
    });

});
