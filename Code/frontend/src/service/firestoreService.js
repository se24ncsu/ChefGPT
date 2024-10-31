import { doc, setDoc, deleteDoc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

// Function to bookmark a recipe by name
export const bookmarkRecipe = async (recipeName) => {
    const user = auth.currentUser;
    const documentId = `${auth.currentUser.uid}_${recipeName}`;
    const bookmarkRef = doc(db, "bookmarks", documentId);
    await setDoc(bookmarkRef, { userId: auth.currentUser.uid, recipeName });
    // if (user) {
    //     const bookmarkRef = doc(db, "bookmarks");
    //     await setDoc(bookmarkRef, { name: recipeName });
    // }
};

// // Function to unbookmark a recipe by name
// export const unbookmarkRecipe = async (recipeName) => {
//     const user = auth.currentUser;
//     if (user) {
//         const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipeName);
//         await deleteDoc(bookmarkRef);
//     }
// };

// // Function to check if a recipe is bookmarked
// export const isRecipeBookmarked = async (recipeName) => {
//     const user = auth.currentUser;
//     if (user) {
//         const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipeName);
//         const bookmarkSnap = await getDoc(bookmarkRef);
//         return bookmarkSnap.exists();
//     }
//     return false;
// };

// Optional: function to listen for real-time bookmark status
// export const onBookmarkStatusChange = (recipeName, callback) => {
//     const user = auth.currentUser;
//     if (user) {
//         const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipeName);
//         return onSnapshot(bookmarkRef, (docSnap) => {
//             callback(docSnap.exists());
//         });
//     }
//     return () => {}; // Return a no-op function if not logged in
// };