const axios = require('axios');


const data = {
    name: 'Chicken Tikka', // Replace with your data
};

//axios.post('https://get-image-by-name-3rhjd2q7dq-uc.a.run.app', data)
axios.post('http://127.0.0.1:5001/cooksmart-5d74c/us-central1/get_image_by_name', data)
    .then((response) => {
        console.log('Response:', response.data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

/*
const data = {
    ingredients: 'milk,butter,chocolate,flour', // Replace with your data
};

axios.post('https://get-recipes-from-ingredients-3rhjd2q7dq-uc.a.run.app', data)
    .then((response) => {
        console.log('Response:', JSON.stringify(response.data));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    */