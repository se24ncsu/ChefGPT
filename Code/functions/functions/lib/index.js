"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_detailed_recipe_by_name = exports.get_detailed_recipe_by_ingredients = exports.get_recipes_by_name = exports.get_recipes_from_ingredients = exports.get_image_by_name = void 0;
const https_1 = require("firebase-functions/v2/https");
const generative_ai_1 = require("@google/generative-ai");
const puppeteer_1 = require("puppeteer");
const chromium = require('chromium');
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
const GEMINI_KEY = "AIzaSyAbGv664iB48XgsrV917cpUc7SVQW4dfWE";
function scrape_image(query) {
    return new Promise(async (resolve, _) => {
        const browser = await puppeteer_1.default.launch({ executablePath: chromium.path, headless: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('https://images.google.com');
        await page.evaluate((query) => {
            const searchBar = document.getElementsByTagName('textarea')[0];
            searchBar.value = query;
            const searchBtn = document.getElementsByTagName('button')[1];
            searchBtn.click();
        }, query);
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        console.log(`Query : ${query}`);
        let newUrl = await page.evaluate(async () => {
            const box = document.getElementById('search');
            if (box === null)
                return '';
            let i = box.getElementsByTagName('img')[0];
            i.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true }));
            await new Promise((r, _) => setTimeout(r, 1));
            while (i.parentElement && i.tagName !== 'A')
                i = i.parentElement;
            if (i === null)
                return '';
            return i.getAttribute('href') || '';
        });
        console.log(`New URL : ${newUrl}`);
        if (newUrl === '') {
            resolve('');
            return;
        }
        if (newUrl[0] === '/')
            newUrl = 'https://www.google.com' + newUrl;
        await page.goto(newUrl);
        const image = await page.evaluate(() => {
            return document.getElementsByTagName('img')[1].src;
        });
        console.log(`New URL : ${image}`);
        resolve(image);
    });
}
exports.get_image_by_name = (0, https_1.onRequest)({ memory: '1GiB' }, async (request, response) => {
    const name = request.body.name;
    const url = await scrape_image(name);
    response.send(url);
});
exports.get_recipes_from_ingredients = (0, https_1.onRequest)(async (request, response) => {
    // Get the recipe from Gemini
    const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const ingredients = request.body.ingredients;
    const prompt = `Give me a list of 10 distinct recipes that uses the following ingredients: 
        [${ingredients}]
        Return the response in the following JSON format: 
        {'recipes':[{'name':'name of the recipe', 'ingredients':'list of all the required ingredients', 'time':'cooking time', 'tags':'3-6 tags for this recipe'}, ...]}
    `;
    let rawjson = (await model.generateContent(prompt)).response.text();
    rawjson = rawjson.substring(rawjson.indexOf('{') - 1, rawjson.lastIndexOf('}') + 1);
    // Prepare and send the result
    response.send(rawjson);
});
exports.get_recipes_by_name = (0, https_1.onRequest)((request, response) => {
    response.send("OK");
});
exports.get_detailed_recipe_by_ingredients = (0, https_1.onRequest)((request, response) => {
    response.send("OK");
});
exports.get_detailed_recipe_by_name = (0, https_1.onRequest)((request, response) => {
    response.send("OK");
});
//# sourceMappingURL=index.js.map