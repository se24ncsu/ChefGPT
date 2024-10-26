/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const GEMINI_KEY = "AIzaSyAbGv664iB48XgsrV917cpUc7SVQW4dfWE";
const { GoogleGenerativeAI } = require('@google/generative-ai');

export const get_recipes_from_ingredients = onRequest(async (request, response) => {
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const ingredients = request.body.ingredients;
    const prompt = `Give me a list of 10 distinct recipes that uses the following ingredients: 
        [${ingredients}]
        Return the response in the following format: 
        {'rs':[{'n':'name of the recipe', 'i':'list of the required ingredients', 't':'cooking time'}, ...]}
    `;
    const result = await model.generateContent(prompt);
    response.send(result.response.text());
});

export const get_recipes_by_name = onRequest((request, response) => {
    response.send("OK");
});

export const get_detailed_recipe_by_ingredients = onRequest((request, response) => {
    response.send("OK");
});

export const get_detailed_recipe_by_name = onRequest((request, response) => {
    response.send("OK");
});
