import { render, screen, fireEvent } from '@testing-library/react';
import BookMarksRecipeCard from '../BookMarksRecipeCard';
import '@testing-library/jest-dom';

// Mocking RecipeImage
jest.mock('../RecipeImage', () => {
    return ({ name, height, width }) => <img alt={name} height={height} width={width} />;
});

// Mocking Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Card: ({ children, ...props }) => <div {...props}>{children}</div>,
    CardHeader: ({ children }) => <div>{children}</div>,
    Heading: ({ children }) => <h1>{children}</h1>,
    CardBody: ({ children }) => <div>{children}</div>,
}));

describe("BookMarksRecipeCard Component", () => {
    const sampleRecipe = {
        recipeName: "Spaghetti Bolognese",
    };
    const mockHandler = jest.fn();

    test("renders recipe name", () => {
        render(<BookMarksRecipeCard recipe={sampleRecipe} handler={mockHandler} />);
        const recipeNameElement = screen.getByText("Spaghetti Bolognese");
        expect(recipeNameElement).toBeInTheDocument();
        expect(recipeNameElement).toHaveTextContent("Spaghetti Bolognese");
    });

    test("renders RecipeImage component", () => {
        render(<BookMarksRecipeCard recipe={sampleRecipe} handler={mockHandler} />);
        const recipeImage = screen.getByRole("img");
        expect(recipeImage).toBeInTheDocument();
    });

    test("calls handler function with recipe data when card is clicked", () => {
        render(<BookMarksRecipeCard recipe={sampleRecipe} handler={mockHandler} />);
        const cardElement = screen.getByTestId("recipeCard");
        fireEvent.click(cardElement);
        expect(mockHandler).toHaveBeenCalledTimes(1);
        expect(mockHandler).toHaveBeenCalledWith(sampleRecipe);
    });

    test("renders RecipeImage with correct props", () => {
        render(<BookMarksRecipeCard recipe={sampleRecipe} handler={mockHandler} />);
        const recipeImage = screen.getByRole("img");
        expect(recipeImage).toHaveAttribute("alt", sampleRecipe.recipeName);
        expect(recipeImage).toHaveAttribute("height", "300");
        expect(recipeImage).toHaveAttribute("width", "200");
    });

 
});
