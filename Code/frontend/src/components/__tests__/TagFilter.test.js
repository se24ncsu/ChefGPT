/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TagFilter from "../TagFilter"; 

jest.mock('@chakra-ui/react', () => {
    return {
        Box: ({ children, ...props }) => <div {...props}>{children}</div>,
        Wrap: ({ children, ...props }) => <div {...props}>{children}</div>,
        WrapItem: ({ children, ...props }) => <div {...props}>{children}</div>,
        Button: ({ children, ...props }) => <button {...props}>{children}</button>,
    };
});

describe("TagFilter Component", () => {
    const mockFilterRecipesByTag = jest.fn();
    
    const renderComponent = (tags = []) => {
        render(<TagFilter tags={tags} filterRecipesByTag={mockFilterRecipesByTag} />);
    };

    beforeEach(() => {
        mockFilterRecipesByTag.mockClear(); // Reset the mock before each test
    });

    test("renders tags correctly", () => {
        const tags = ["Vegetarian", "Gluten-Free", "Dessert"];
        renderComponent(tags);

        // Check if all tags are rendered
        tags.forEach(tag => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    test("calls filterRecipesByTag when a tag is clicked", () => {
        const tags = ["Vegetarian", "Gluten-Free"];
        renderComponent(tags);

        const vegetarianButton = screen.getByText("Vegetarian");
        fireEvent.click(vegetarianButton);

        // Check if the mock function was called with the correct argument
        expect(mockFilterRecipesByTag).toHaveBeenCalledTimes(1);
        expect(mockFilterRecipesByTag).toHaveBeenCalledWith("Vegetarian");
    });

    test("does not crash when no tags are provided", () => {
        renderComponent([]);
        expect(screen.queryByRole("button")).toBeNull(); // No buttons should be rendered
    });
});
