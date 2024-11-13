/**
 * @jest-environment jsdom
 */

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

    test('applies correct background color when selected is true', () => {
        render(<Tag selected={true}>Selected Tag</Tag>);
        const tagElement = screen.getByText(/Selected Tag/i);
        expect(tagElement).toHaveStyle({ background: '#ccc' });
    });

    test('applies correct background color when selected is false', () => {
        render(<Tag selected={false}>Not Selected Tag</Tag>);
        const tagElement = screen.getByText(/Not Selected Tag/i);
        expect(tagElement).toHaveStyle({ background: '#eee' });
    });

    test('applies correct inline styles', () => {
        render(<Tag>Styled Tag</Tag>);
        const tagElement = screen.getByText(/Styled Tag/i);
        expect(tagElement).toHaveStyle({
            padding: '5px',
            fontSize: '12px',
            margin: '2px',
            borderRadius: '5px'
        });
    });
});
