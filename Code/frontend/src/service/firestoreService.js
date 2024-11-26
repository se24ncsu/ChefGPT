import { doc, setDoc, deleteDoc, getDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

// Function to bookmark a recipe by name
export const bookmarkRecipe = async (recipe) => {
    const user = auth.currentUser;
    if (user) {
        const documentId = `${user.uid}_${recipe.name}`;
        const bookmarkRef = doc(db, "bookmarks", documentId);
        await setDoc(bookmarkRef, { 
            userId: user.uid, 
            recipeName: recipe.name, 
            ingredients: recipe.ingredients, 
            cookingTime: recipe.time, 
            steps: recipe.process || [] // Ensure process is an array
        });
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
        try {
            const bookmarkSnap = await getDoc(bookmarkRef);
            return bookmarkSnap.exists();
        } catch (error) {
            console.error("Error checking if recipe is bookmarked: ", error);
            return false;
        }
    }
    return false; // Return false if user is not logged in
};

// Function to fetch all bookmarked recipes for the current user
export const fetchBookmarkedRecipes = async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            const bookmarksRef = collection(db, "bookmarks");
            const q = query(bookmarksRef, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            // Return all recipes bookmarked by the user
            return querySnapshot.docs.map((doc) => doc.data());
        } catch (error) {
            console.error("Error fetching bookmarked recipes: ", error);
            return [];
        }
    } else {
        console.warn("No user is logged in.");
        return [];
    }
};

// Fetch all ingredients from bookmarked recipes
export const fetchBookmarkedIngredients = async () => {
    const user = auth.currentUser;
    if (user) {
        const bookmarksRef = collection(db, "bookmarks");
        const q = query(bookmarksRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        let allIngredients = [];
        querySnapshot.forEach((doc) => {
            const recipe = doc.data();
            if (recipe.ingredients) {
                allIngredients = [...allIngredients, ...recipe.ingredients];
            }
        });
        
        // Remove duplicates
        return [...new Set(allIngredients)];
    }
    return [];
};

// Function to bookmark a recipe by name
export const addToCartDB = async (recipe) => {
    const user = auth.currentUser;
    if (user) {
        const documentId = `${user.uid}_${recipe.name}`;
        const bookmarkRef = doc(db, "cart", documentId);
        await setDoc(bookmarkRef, { userId: user.uid, recipeName: recipe.name, ingredients: recipe.ingredients});
    }
};

export const fetchCartList = async () => {
    const user = auth.currentUser;
    if (user) {
        const bookmarksRef = collection(db, "cart");
        const q = query(bookmarksRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        let allIngredients = [];
        querySnapshot.forEach((doc) => {
            const recipe = doc.data();
            if (recipe.ingredients) {
                allIngredients = [...allIngredients, ...recipe.ingredients];
            }
        });
        
        // Remove duplicates
        return [...new Set(allIngredients)];
    }
    return [];
};

// Function to save a recipe to the "recipes" collection
export const saveRecipe = async (recipe) => {
    const user = auth.currentUser;
    if (user) {
        const documentId = `${user.uid}_${recipe.name}`;
        const recipeRef = doc(db, "recipes", documentId);
        await setDoc(recipeRef, { ...recipe, process: recipe.process || [] }); // Ensure process is an array
    }
};

export const fetchUserRecipes = async () => {
    const user = auth.currentUser;
    if (user) {
        const recipesRef = collection(db, "recipes");
        const querySnapshot = await getDocs(recipesRef);

        // Filter the documents to ensure the first part of the ID matches the user UID
        const userRecipes = querySnapshot.docs.filter(doc => {
            const [uid] = doc.id.split('_');
            return uid === user.uid;
        }).map(doc => doc.data());

        // Return all recipes associated with the current user
        return userRecipes;
    }
    return [];
};

// Function to save a detailed recipe to the "detailed_recipes" collection
export const saveDetailedRecipe = async (recipe) => {
    const user = auth.currentUser;
    if (user) {
        const documentId = `${user.uid}_${recipe.name}`;
        const detailedRecipeRef = doc(db, "detailed_recipes", documentId);
        await setDoc(detailedRecipeRef, recipe); // Ensure process is an array
    }
};

export const fetchDetailedRecipe = async (recipeName) => {
    const user = auth.currentUser;
    if (user) {
        const detailedRecipesRef = collection(db, "detailed_recipes");
        const querySnapshot = await getDocs(detailedRecipesRef);
        console.log("querySnapshot", querySnapshot.docs);
        const detailedRecipe = querySnapshot.docs.find(doc => {
            const [uid, name] = doc.id.split('_');
            console.log("uid", uid);
            console.log("name", name);
            return uid === user.uid && name === recipeName;
        });
        console.log("detailedRecipe", detailedRecipe);
        if (detailedRecipe) {
            return detailedRecipe.data();
        }
    }
    return null;
};

export const fetchUserPreferences = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, "profiles", user.uid);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          return {
            age: userData.age,
            sex: userData.gender,
            dietType: userData.dietType,
            weight: userData.weight,
            height: userData.height
            // dietaryRestrictions: userData.dietaryRestrictions || []
          };
        } else {
          console.warn("No user preferences found for the current user.");
          return null;
        }
      } catch (error) {
        console.error("Error fetching user preferences: ", error);
        return null;
      }
    } else {
      console.warn("No user is logged in.");
      return null;
    }
};

// export const fetchBookmarkedIngredients = async () => {
//     const user = auth.currentUser;
//     if (user) {
//         const bookmarksRef = collection(db, "bookmarks");
//         const q = query(bookmarksRef, where("userId", "==", user.uid));
//         const querySnapshot = await getDocs(q);
        
//         let allIngredients = [];
//         querySnapshot.forEach((doc) => {
//             const recipe = doc.data();
//             if (recipe.ingredients) {
//                 allIngredients = [...allIngredients, ...recipe.ingredients];
//             }
//         });
        
//         // Remove duplicates
//         return [...new Set(allIngredients)];
//     }
//     return [];
// };
