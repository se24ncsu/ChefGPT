import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeLoading from '../RecipeLoading';

jest.mock("@chakra-ui/react", () => {
    return {
        Box: ({ children, ...props }) => <div {...props}>{children}</div>,
        Text: ({ children }) => <span>{children}</span>,
        Wrap: ({ children }) => <div>{children}</div>,
        Center: ({ children }) => <div style={{ textAlign: 'center' }}>{children}</div>,
        SkeletonCircle: () => <div data-testid="skeleton-circle">Skeleton Circle</div>,
        SkeletonText: ({ noOfLines }) => (
            <div data-testid="skeleton-text">
                {[...Array(noOfLines)].map((_, i) => (
                    <span key={i}>Skeleton Text Line</span>
                ))}
            </div>
        ),
    };
});

describe('RecipeLoading Component', () => {
    it('renders the correct number of loading boxes', () => {
        render(<RecipeLoading />);
        
        const skeletonBoxes = screen.getAllByTestId('skeleton-circle');
        expect(skeletonBoxes.length).toBe(4);
    });

    it('renders skeleton circles and skeleton text in each box', () => {
        render(<RecipeLoading />);
        
        const skeletonCircles = screen.getAllByTestId("skeleton-circle");
        expect(skeletonCircles.length).toBe(4);

        const skeletonTexts = screen.getAllByTestId("skeleton-text");
        expect(skeletonTexts.length).toBe(4);

        skeletonTexts.forEach(skeletonText => {
            //expect(skeletonText.querySelectorAll('span').length).toBe(6); 
            expect(screen.querySelectorAll('span').length).toBe(6); 
        });
    });

    it('renders skeleton text', () => {
        render(<RecipeLoading />);

        const skeletonTexts = screen.getAllByTestId("skeleton-text");
        expect(skeletonTexts.length).toBe(4);

    });

    it('renders skeleton text in each box', () => {
        render(<RecipeLoading />);

        const skeletonTexts = screen.getAllByTestId("skeleton-text");
        expect(skeletonTexts.length).toBe(4);

        skeletonTexts.forEach(skeletonText => {
            //expect(skeletonText.querySelectorAll('span').length).toBe(6); 
            expect(screen.querySelectorAll('span').length).toBe(6); 
        });
    });
});
