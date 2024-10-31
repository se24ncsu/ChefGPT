import { doc, setDoc, deleteDoc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

// Function to bookmark a recipe by name
export const bookmarkRecipe = async (recipeName) => {
    const user = auth.currentUser;
    if (user) {
        const documentId = `${user.uid}_${recipeName}`;
        const bookmarkRef = doc(db, "bookmarks", documentId);
        await setDoc(bookmarkRef, { userId: user.uid, recipeName });
    }
};

// Function to unbookmark a recipe by name
export const unbookmarkRecipe = async (recipeName) => {
    const user = auth.currentUser;
    if (user) {
        const documentId = `${user.uid}_${recipeName}`; // Use the same documentId format
        const bookmarkRef = doc(db, "bookmarks", documentId);
        await deleteDoc(bookmarkRef);
    }
};

// Function to check if a recipe is bookmarked
export const isRecipeBookmarked = async (recipeName) => {
    const user = auth.currentUser;
    if (user) {
        const documentId = `${user.uid}_${recipeName}`; // Use the same documentId format
        const bookmarkRef = doc(db, "bookmarks", documentId);
        const bookmarkSnap = await getDoc(bookmarkRef);
        return bookmarkSnap.exists();
    }
    return false; // Return false if user is not logged in
};