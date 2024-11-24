const axios = require('axios');
const test_from_ingredients = (data) => {
    axios.post(process.env.REACT_APP_GET_RECIPES_FROM_INGREDIENTS_URL, data)
        .then((response) => {
            if (data.ingredients === undefined) {
                if (response.data !== 'Missing ingredients') throw 'get-recipes-from-ingredients: Invalid response for missing ingredients';
            }
            else if (data.page === undefined) {
                if (response.data !== 'Missing page') throw 'get-recipes-from-ingredients: Invalid response for missing page';
            }
            else {
                if (response.data.recipes === undefined) throw "get-recipes-from-ingredients: Invalid response";
                if (!Array.isArray(response.data.recipes)) throw "get-recipes-from-ingredients: Response not a list";
                response.data.recipes.forEach(e => {
                    if (e.name === undefined || typeof e.name !== "string") throw "get-recipes-from-ingredients: Invalid name";
                    if (e.time === undefined || typeof e.time !== "string") throw "get-recipes-from-ingredients: Invalid time";
                    if (e.tags === undefined || !Array.isArray(e.tags)) throw "get-recipes-from-ingredients: Invalid tags";
                });
            }
        })
        .catch((error) => {
            console.error(error + ' ' + JSON.stringify(data));
            process.exit(1);
        });
};

const test_from_name = (data) => {
    axios.post(process.env.REACT_APP_GET_RECIPES_BY_NAME_URL, data)
        .then((response) => {
            if (data.name === undefined) {
                if (response.data !== 'Missing name') throw 'get-recipes-by-name: Invalid response for missing name';
            }
            else if (data.page === undefined) {
                if (response.data !== 'Missing page') throw 'get-recipes-by-name: Invalid response for missing page';
            }
            else {
                if (response.data.recipes === undefined) throw "get-recipes-by-name: Invalid response";
                if (!Array.isArray(response.data.recipes)) throw "get-recipes-by-name: Response not a list";
                response.data.recipes.forEach(e => {
                    if (e.name === undefined || typeof e.name !== "string") throw "get-recipes-by-name: Invalid name";
                    if (e.time === undefined || typeof e.time !== "string") throw "get-recipes-by-name: Invalid time";
                    if (e.tags === undefined || !Array.isArray(e.tags)) throw "get-recipes-by-name: Invalid tags";
                });
            }
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
};

const test_detailed = (data) => {
    axios.post(process.env.REACT_APP_GET_DETAILED_RECIPE_URL, data)
        .then((response) => {
            if (data.name === undefined) {
                if (response.data !== 'Missing name') throw 'get-recipes-by-name: Invalid response for missing name';
            }
            else if (data.ingredients === undefined) {
                if (response.data !== 'Missing ingredients') throw 'get-recipes-by-name: Invalid response for missing ingredients';
            }
            else {
                if (response.data.name === undefined || typeof response.data.name !== "string") throw "get-detailed-recipe: Invalid name";
                if (response.data.ingredients === undefined || !Array.isArray(response.data.ingredients)) throw "get-detailed-recipe: Invalid ingredients";
                if (response.data.time === undefined || typeof response.data.time !== "string") throw "get-detailed-recipe: Invalid time";
                if (response.data.tags === undefined || !Array.isArray(response.data.tags)) throw "get-detailed-recipe: Invalid tags";
                if (response.data.process === undefined || !Array.isArray(response.data.process)) throw "get-detailed-recipe: Invalid process";
            }
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
};

const test_image = (data) => {
    axios.post(process.env.REACT_APP_GET_IMAGE_URL, data)
        .then((response) => {
            if (data.name === undefined) {
                if (response.data !== 'Missing name') throw 'get-image-by-name: Invalid response for missing name';
            }
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
};



// Test cases ##############

test_from_ingredients({ ingredients: 'paneer,onion,tomato', page: 1 });
test_from_ingredients({ ingredients: 'chicken,garlic,jalapenoes', page: 3 });
test_from_ingredients({ page: 3 });
test_from_ingredients({ ingredients: 'chicken,tomato' });

test_from_name({ name: 'Tandoori chicken', page: 1 });
test_from_name({ name: 'Marinara pasta', page: 5 });
test_from_name({ name: 'BBQ Pizza' });
test_from_name({ page: 3 });

test_detailed({ name: 'Banana milkshake', ingredients: 'banana,milk' });
test_detailed({ name: 'Strawberry smoothie', ingredients: 'strawberry,sugar' });
test_detailed({ ingredients: 'salt,sugar' });
test_detailed({ name: 'Tomato ketchup' });

test_image({ name: 'Veg Kolhapuri' });
test_image({});
