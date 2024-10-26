
const { GoogleGenerativeAI } = require("@google/generative-ai");


const GEMINI_KEY = "AIzaSyAbGv664iB48XgsrV917cpUc7SVQW4dfWE";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `Search for an image of Banana Milkshake`;
model.generateContent(prompt).then(result => {
    console.log(result.response.text());
});

//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