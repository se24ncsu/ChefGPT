import { bookmarkRecipe, unbookmarkRecipe, isRecipeBookmarked, fetchBookmarkedRecipes, fetchBookmarkedIngredients } from './firestoreService';
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, deleteDoc, getDoc, getDocs, query, where, collection } from "firebase/firestore";

// Mock Firebase imports
jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    setDoc: jest.fn(),
    deleteDoc: jest.fn(),
    getDoc: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
}));
jest.mock("../firebase/firebase", () => ({
    auth: { currentUser: { uid: "testUserId" } },
    db: {},
}));

describe("firestoreService", () => {
    const mockRecipe = {
        name: "Test Recipe",
        ingredients: ["ingredient1", "ingredient2"],
        time: 30,
        process: ["Step 1", "Step 2"],
    };
    const mockRecipeName = "Test Recipe";
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("bookmarkRecipe should set a new document with recipe data", async () => {
        const documentId = `${auth.currentUser.uid}_${mockRecipe.name}`;
        const bookmarkRef = { id: documentId };

        doc.mockReturnValue(bookmarkRef);

        await bookmarkRecipe(mockRecipe);

        expect(doc).toHaveBeenCalledWith(db, "bookmarks", documentId);
        expect(setDoc).toHaveBeenCalledWith(bookmarkRef, {
            userId: auth.currentUser.uid,
            recipeName: mockRecipe.name,
            ingredients: mockRecipe.ingredients,
            cookingTime: mockRecipe.time,
            steps: mockRecipe.process,
        });
    });

    test("unbookmarkRecipe should delete the recipe document", async () => {
        const documentId = `${auth.currentUser.uid}_${mockRecipeName}`;
        const bookmarkRef = { id: documentId };

        doc.mockReturnValue(bookmarkRef);

        await unbookmarkRecipe(mockRecipeName);

        expect(doc).toHaveBeenCalledWith(db, "bookmarks", documentId);
        expect(deleteDoc).toHaveBeenCalledWith(bookmarkRef);
    });

    test("isRecipeBookmarked should return true if the document exists", async () => {
        const documentId = `${auth.currentUser.uid}_${mockRecipeName}`;
        const bookmarkRef = { id: documentId };

        doc.mockReturnValue(bookmarkRef);
        getDoc.mockResolvedValue({ exists: () => true });

        const isBookmarked = await isRecipeBookmarked(mockRecipeName);

        expect(doc).toHaveBeenCalledWith(db, "bookmarks", documentId);
        expect(getDoc).toHaveBeenCalledWith(bookmarkRef);
        expect(isBookmarked).toBe(true);
    });

    test("isRecipeBookmarked should return false if the document does not exist", async () => {
        const documentId = `${auth.currentUser.uid}_${mockRecipeName}`;
        const bookmarkRef = { id: documentId };

        doc.mockReturnValue(bookmarkRef);
        getDoc.mockResolvedValue({ exists: () => false });

        const isBookmarked = await isRecipeBookmarked(mockRecipeName);

        expect(doc).toHaveBeenCalledWith(db, "bookmarks", documentId);
        expect(getDoc).toHaveBeenCalledWith(bookmarkRef);
        expect(isBookmarked).toBe(false);
    });

    test("fetchBookmarkedRecipes should return all bookmarked recipes for the user", async () => {
        const bookmarksRef = {};
        const q = {};
        const mockRecipes = [
            { recipeName: "Recipe1", ingredients: ["ingredient1"] },
            { recipeName: "Recipe2", ingredients: ["ingredient2"] },
        ];

        collection.mockReturnValue(bookmarksRef);
        query.mockReturnValue(q);
        where.mockReturnValue(q);
        getDocs.mockResolvedValue({
            docs: mockRecipes.map((recipe) => ({ data: () => recipe })),
        });

        const recipes = await fetchBookmarkedRecipes();

        expect(collection).toHaveBeenCalledWith(db, "bookmarks");
        expect(query).toHaveBeenCalledWith(bookmarksRef, where("userId", "==", auth.currentUser.uid));
        expect(getDocs).toHaveBeenCalledWith(q);
        expect(recipes).toEqual(mockRecipes);
    });

    test('fetchBookmarkedIngredients should return all unique ingredients', async () => {
        // Arrange
        const bookmarksRef = { id: 'bookmarksRef' };
        const mockData = [
            { userId: 'testUserId', recipeName: 'Recipe 1', ingredients: ['Ingredient 1', 'Ingredient 2'], cookingTime: '30 mins', steps: 'Step 1' },
            { userId: 'testUserId', recipeName: 'Recipe 2', ingredients: ['Ingredient 2', 'Ingredient 3'], cookingTime: '15 mins', steps: 'Step 2' }
        ];

        collection.mockReturnValue(bookmarksRef);
        query.mockReturnValue('mockedQuery');
        where.mockReturnValue('mockedWhere');
        
        // Mocking getDocs to return an iterable object with a forEach method
        getDocs.mockResolvedValue({
            docs: mockData.map(data => ({
                data: () => data
            })),
            forEach: function(callback) {
                this.docs.forEach(callback);
            }
        });

        // Act
        const ingredients = await fetchBookmarkedIngredients();

        // Assert
        expect(ingredients).toEqual(['Ingredient 1', 'Ingredient 2', 'Ingredient 3']);
        expect(collection).toHaveBeenCalledWith(expect.anything(), "bookmarks");
        expect(query).toHaveBeenCalled();
        expect(where).toHaveBeenCalledWith("userId", "==", "testUserId");
        expect(getDocs).toHaveBeenCalledWith('mockedQuery');
    });
});
