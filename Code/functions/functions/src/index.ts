/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import { GoogleGenerativeAI } from '@google/generative-ai';
import puppeteer from "puppeteer";


const chromium = require('chromium');

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const GEMINI_KEY = "AIzaSyAbGv664iB48XgsrV917cpUc7SVQW4dfWE";

/* Function to scrape image from images.google.com */
function scrape_image(query: string) {
    return new Promise(async (resolve, _) => {

        // Prepare browser
        const browser = await puppeteer.launch({ executablePath: chromium.path, headless: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('https://images.google.com');

        // Enter the query
        await page.evaluate((query) => {
            const searchBar = document.getElementsByTagName('textarea')[0];
            searchBar.value = query;
            const searchBtn = document.getElementsByTagName('button')[1];
            searchBtn.click();
        }, query);
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // Get the search result of the 1st image
        let newUrl = await page.evaluate(async () => {
            const box = document.getElementById('search');
            if (box === null) return '';
            let i: HTMLElement = box.getElementsByTagName('img')[0];
            i.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true }));
            await new Promise((r, _) => setTimeout(r, 1));
            while (i.parentElement && i.tagName !== 'A') i = i.parentElement;
            if (i === null) return '';
            return i.getAttribute('href') || '';
        });
        if (newUrl === '') {
            resolve('');
            return;
        }
        if (newUrl[0] === '/') newUrl = 'https://www.google.com' + newUrl;

        // Get the image URL
        await page.goto(newUrl);
        const image = await page.evaluate(() => {
            return document.getElementsByTagName('img')[1].src;
        });
        resolve(image);
    });
}

/* API to scrape image */
export const get_image_by_name = onRequest({ memory: '1GiB' }, async (request, response) => {
    const name = request.body.name;
    const url = await scrape_image(name);
    response.send(url);
});

/* 
    API to get recipes using a list ingredients.
    This is used in the search by ingredients section.
    Name and ingredients combined will be used by 'get_detailed_recipe'.
*/
export const get_recipes_from_ingredients = onRequest(async (request, response) => {

    // Get the recipes from Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const ingredients = request.body.ingredients;
    const pagination = request.body.page;
    const prompt = `Give me a list of distinct recipes that uses the following ingredients: 
        [${ingredients}]
        Results will be paginated with 10 recipes per page.
        Return the following page: ${pagination}
        Return the response in the following JSON format: 
        {'recipes':[
            {
                'name':'name of the recipe', 
                'ingredients':'list of all the required ingredients sorted by importance', 
                'time':'cooking time', 
                'tags':'3-6 tags for this recipe'
            }, ...]}
    `;
    let rawjson = (await model.generateContent(prompt)).response.text();
    rawjson = rawjson.substring(rawjson.indexOf('{') - 1, rawjson.lastIndexOf('}') + 1);

    // Prepare and send the result
    response.send(rawjson);
});

/* 
    API to search recipes by name.
    This would be used to do search in the search bar.
    Its ingredients and name will be used by 'get_detailed_recipe'.
*/
export const get_recipes_by_name = onRequest(async (request, response) => {

    // Get the recipe from Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const name = request.body.name;
    const pagination = request.body.page;
    const prompt = `Give me a list of distinct recipes related (could be a match) to the name: ${name}
        Results will be paginated with 10 recipes per page.
        Return the following page: ${pagination}
        Return the response in the following JSON format: 
        {'recipes':[
            {
                'name':'name of the recipe', 
                'ingredients':'list of all the required ingredients sorted by importance', 
                'time':'cooking time', 
                'tags':'3-6 tags for this recipe'
            }, ...]}
    `;
    let rawjson = (await model.generateContent(prompt)).response.text();
    rawjson = rawjson.substring(rawjson.indexOf('{') - 1, rawjson.lastIndexOf('}') + 1);

    // Prepare and send the result
    response.send(rawjson);
});

/* API to get a detailed recipe using a list ingredients and name */
export const get_detailed_recipe = onRequest(async (request, response) => {

    // Get the recipe from Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const name = request.body.name;
    const ingredients = request.body.ingredients;
    const prompt = `Give me a list of distinct recipes related (could be a match) to the name: ${name} and
        uses the following list of ingredients: [${ingredients}]
        Return the response in the following JSON format: 
        {
            'name':'name of the recipe',
            'ingredients':'list of all the required ingredients sorted by importance',
            'time':'cooking time',
            'tags':'3-6 tags for this recipe',
            'process':['step 1', 'step 2', ...]
        }
        Process should be detailed steps of cooking the recipe from start to finish.
    `;
    let rawjson = (await model.generateContent(prompt)).response.text();
    rawjson = rawjson.substring(rawjson.indexOf('{') - 1, rawjson.lastIndexOf('}') + 1);

    // Prepare and send the result
    response.send(rawjson);
});

