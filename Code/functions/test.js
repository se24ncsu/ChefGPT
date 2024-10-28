const axios = require('axios');


const data = {
    name: 'Chicken',
    page: 2,
};


//axios.post('https://get-recipes-from-ingredients-3rhjd2q7dq-uc.a.run.app', data)
axios.post('https://get-recipes-by-name-3rhjd2q7dq-uc.a.run.app', data)
//axios.post('https://get-detailed-recipe-3rhjd2q7dq-uc.a.run.app', data)
    .then((response) => {
        console.log('Response:', JSON.stringify(response.data));
    })
    .catch((error) => {
        console.error('Error:', error);
    });