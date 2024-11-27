# <i> ChefGPT: Where every ingredient into a masterpiece!!🍳 </i>
![](../images/logo.png)</br>

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/se24ncsu/ChefGPT/graphs/commit-activity) [![Contributors Activity](https://img.shields.io/github/commit-activity/m/se24ncsu/ChefGPT)](https://github.com/se24ncsu/ChefGPT/pulse) [![GitHub issues](https://img.shields.io/github/issues/se24ncsu/ChefGPT.svg)](https://github.com/se24ncsu/ChefGPT/issues?q=is%3Aopen+is%3Aissue) [![GitHub issues-closed](https://img.shields.io/github/issues-closed/se24ncsu/ChefGPT.svg)](https://github.com/se24ncsu/ChefGPT/issues?q=is%3Aissue+is%3Aclosed) ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/se24ncsu/ChefGPT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT) [![Unittest](https://github.com/se24ncsu/ChefGPT/actions/workflows/unittest.yml/badge.svg?branch=main&event=push)](https://github.com/se24ncsu/ChefGPT/actions/workflows/unittest.yml) [![codecov](https://codecov.io/gh/se24ncsu/ChefGPT/graph/badge.svg?token=0XN6K2DMGS)](https://codecov.io/gh/se24ncsu/ChefGPT) [![GitHub release](https://img.shields.io/github/release/se24ncsu/ChefGPT.svg)](https://github.com/se24ncsu/ChefGPTreleases/) [![StyleCheck: pylint](https://img.shields.io/badge/linting-pylint-yellowgreen)](https://github.com/pylint-dev/pylint) [![HitCount](https://hits.dwyl.com/se24ncsu/ChefGPT.svg)](https://hits.dwyl.com/se24ncsu/ChefGPT) ![GitHub contributors](https://img.shields.io/github/contributors/se24ncsu/ChefGPT) ![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/se24ncsu/ChefGPT) ![GitHub repo size](https://img.shields.io/github/repo-size/se24ncsu/ChefGPT)  [![Maintainability](https://api.codeclimate.com/v1/badges/260d558f17ae5e1027e5/maintainability)](https://codeclimate.com/github/se24ncsu/ChefGPT/maintainability) [![GitHub closed issues by-label](https://img.shields.io/github/issues-closed-raw/se24ncsu/ChefGPT/bug?color=green&label=Squished%20bugs)](https://github.com/se24ncsu/ChefGPT/issues?q=is%3Aissue+label%3Abug+is%3Aclosed) ![Discord](https://img.shields.io/discord/1143966088695124110) [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.14028522.svg)](https://doi.org/10.5281/zenodo.14028522)
  

  
![Meal Plan](/assets/searchResult.jpg)
<b>Wave goodbye to the endless struggle of deciding what to cook with whatever’s in your kitchen. ChefGPT transforms your cooking experience with a smart, easy-to-use app that turns your pantry and fridge into a treasure trove of culinary possibilities. Simply input the ingredients you have, and ChefGPT instantly suggests mouthwatering recipes tailored to your inventory.

But that’s not all! Discover new cuisines, get step-by-step cooking instructions, and customize recipes to suit your dietary preferences or mood. Whether you’re a beginner or a seasoned chef, ChefGPT makes every meal an exciting journey of flavor and creativity.

Say hello to stress-free cooking and unlock your kitchen’s hidden potential with ChefGPT—your ultimate recipe companion! 🍳</b>

# Contents  

- [Why use ChefGPT?](#why-use-chefgpt)
- [Project Documentation](#documentation)
- [Project Presentation Videos](#project-presentation-videos)
- [Brief Overview of Project](#project-description)
- [How Docs](#how-docs)<br/>
    - [MongoDB](#mongodb-integration)
    - [Docker](#docker-container)
    - [Collaborative Filtering](#collaborative-filtering)
    - [Streaming Links](#streaming-links)
    - [Dashboard](#dashboard)
    - [Create an Acccount](#create-an-account)
    - [Login to Account](#login-to-account)
    - [Profile and Friends](#profile-and-friends)
    - [Wall](#wall)
    - [Recommendation Mechanism](#movie-recommendation-mechanism)<br/>
    - [Email Notifier](#email-notifier)

- [Improvements Made in the Project](#project-3-delta)
- [TechStack Used for the Development of Project](#tech-stack-used)
- [Steps for Execution](#getting-started)
- [Future Scope](#future-scope)
- [Contribute](#contribute-to-the-project)
- [Team Members](#contributors)
- [Contact](#contact)
- [License](#license)

## Why use ChefGPT?

<img
  src="https://www.wlns.com/wp-content/uploads/sites/50/2020/01/popcorn-1085072_1920_29563194_ver1.0.jpg?strip=1"
  alt="Movie Time"
  width="30%"
  align="right"
/>

Your fridge deserves better than expired yogurt and lonely condiments! 🥫✨

ChefGPT is like having a personal chef who never judges your odd ingredient combos. Got eggs, ketchup, and a random zucchini? No problem—ChefGPT whips up magic and makes you look like a culinary genius.

Save time, reduce food waste, and turn “What’s for dinner?” into “Wow, what’s next?” With ChefGPT, cooking is no longer a chore—it’s your new favorite adventure. Bon appétit to effortless creativity! 🍽

## Documentation
Checkout for project documentation [here](https://github.com/se24ncsu/ChefGPT/tree/main/PROJECT3)

## Project Presentation Videos
### Project Overview
[https://github.com/se24ncsu/ChefGPT/blob/main/asset/animated_video.mp4
](https://github.com/user-attachments/assets/ed0c3f79-b31f-4876-ba03-b2e640cf8333
)
### New Features 2 minute demo
[![why contribute video](https://img.youtube.com/vi/M13zDRgjNGE/0.jpg)](https://www.youtube.com/watch?v=M13zDRgjNGE)



## Project Description
Tired of staring at your pantry, wondering what to cook? ChefGPT transforms your kitchen into a hub of creativity by effortlessly suggesting recipes based on the ingredients you already have. Powered by advanced AI and Google’s Gemini APIs, ChefGPT tailors each recipe recommendation to your preferences, making cooking simpler, smarter, and more enjoyable. Whether you’re a seasoned chef or a beginner, ChefGPT ensures that every meal is a masterpiece waiting to happen.

ChefGPT offers an array of features designed to make your cooking experience seamless. Search recipes by ingredients for instant inspiration or find dishes by name to satisfy specific cravings. With secure user profiles powered by Firebase Authentication, you can bookmark your favorite recipes, access them anytime, and organize your culinary adventures. Enhanced filtering options let you refine results based on dietary needs or time constraints, ensuring that every dish suits your lifestyle.

But ChefGPT doesn’t stop there—it’s built for convenience on the go. Save intriguing recipes while commuting, explore new cuisines, and rely on a streamlined interface that removes unnecessary clutter for a smooth user experience. With its dynamic suggestions, personalized profiles, and secure access, ChefGPT is more than a recipe recommender—it’s your ultimate kitchen companion, turning every meal into a journey of flavor and discovery. For the system architecture and other details, please refer to our documentation [here](https://github.com/se24ncsu/ChefGPT/tree/main/docs)

<!-- ## What docs
View our documentation outlining each class and function of ChefGPT here
- [Backend](https://github.com/se24ncsu/ChefGPT/blob/main/docs/backend.md)
- [Frontend](https://github.com/se24ncsu/ChefGPT/blob/main/docs/frontend.md)
- [Testing](https://github.com/se24ncsu/ChefGPT/blob/main/docs/testing.md) -->

<!-- View our autogenerated doco here [Doco](https://github.com/se24ncsu/ChefGPT/blob/main/docs/generated_docs/) -->

# Project 3 Delta
### Intelligent Meal Planning:
#### NEW in project 3
****
Simplify your week with smart meal planning features, allowing you to create customized weekly menus using your bookmarked recipes and personal preferences
****
![Meal Plan](/assets/mealPlan.jpg)

### Enhanced Multi-Ingredient Search:
#### NEW in project 3
****
Input multiple ingredients to discover recipes that creatively combine your pantry staples for maximum flavor and efficiency.
****
![Search](/assets/searchResult-Dark.jpg)

### Voice-Activated Cooking:
#### NEW in project 3
****
Enjoy hands-free convenience with voice integration, letting you navigate recipes, set timers, and adjust serving sizes—all with simple commands.
****
![alt text](/assets/voice.png)
### Smart Shopping Cart:
#### NEW in project 3
****
Add ingredients from recipes directly to a shopping cart. When it’s time to shop, view and check off items as you purchase them, ensuring a smooth and organized grocery trip.
****
![alt text](/assets/shoppingList.png)

### Recipe Videos for Immersive Cooking:
#### NEW in project 3
****
Elevate your cooking skills with embedded YouTube videos in each recipe description. Follow along with visual guides and learn the nuances of each dish like a pro.
****
![alt text](/assets/video.png)

### Dark Mode for User Comfort:
#### NEW in project 3
****
Enjoy browsing recipes day or night with the newly introduced dark mode. This sleek design not only enhances aesthetics but also reduces eye strain during late-night meal planning.
****

### Streamlined Navigation:
#### NEW in project 3
****
Navigate effortlessly with an improved user interface, making it simpler to discover recipes, manage profiles, and explore features with minimal clicks.
****

### Blazing-Fast Performance:
#### NEW in project 3
****
Experience lightning-fast load times with server optimizations, including intelligent caching for recently searched recipes. This ensures quick access to your favorites and a hassle-free user experience.
****

### Customized Meal Plans:
#### NEW in project 3
****
By incorporating user-specific data such as age, weight, height, and dietary preferences (e.g., gym, keto, bulk diet), ChefGPT generates personalized meal plans that align with your fitness goals. The app even tracks macronutrient breakdowns, allowing users to specify the quantity of proteins, fats, and carbs they want to consume. This ensures every meal supports your unique lifestyle and fitness objectives.
****

### Enhanced Testing Framework:
****
App is now rock-solid with extensive tests! Seamless functionality across platforms and scenarios, even under heavy loads!
****

### Sync Across Devices:
****
Access your profiles, bookmarks, and shopping lists seamlessly on any device.
****

Our grading scorecard can be found [here](https://github.com/se24ncsu/ChefGPT/blob/main/PROJECT/rubric.md)

## API Documentation
**get_image_by_name** <br>
Scrapes an image of the recipe from bing.com.

**get_recipes_from_ingredients** <br>
Gets recipes based on the provided ingredients from Gemini along with some sense of pagination. Recipes might duplicate over multiple pages as it is not real pagination.

**get_recipes_by_name** <br>
Gets recipes based on the provided name from Gemini along with some sense of pagination. Recipes might duplicate over multiple pages as it is not real pagination.

**get_detailed_recipe** <br>
 Gets detailed recipe based on name and ingredients with a list of detailed ingredients along with quantities, cooking time and detailed process to cook.

**get_meal_plan** <br>
Generates a multi-day meal plan based on user preferences, including age, sex, diet type, weight, and height. The meal plan contains breakfast, lunch, and dinner for each day, along with detailed nutritional information for each meal.

<br>Detailed documentation can be found at: [API Docs](https://github.com/SRN-SE-Fall24/CookSmart/blob/master/API_Documentation.pdf)

## Tech stack Used👨‍💻:

<p>
<img src="https://i.giphy.com/media/KzJkzjggfGN5Py6nkT/200.webp" width="150">
<img src="https://i.giphy.com/media/IdyAQJVN2kVPNUrojM/200.webp" width="150">
<img src="https://media.giphy.com/media/UWt0rhp21JgLwoeFQP/giphy.gif" width ="150"/>
<img src="https://media.giphy.com/media/kH6CqYiquZawmU1HI6/giphy.gif" width ="150"/>
<img src="https://media.giphy.com/media/eNAsjO55tPbgaor7ma/giphy.gif" width="150"/> <!-- React -->

<img src="https://media.giphy.com/media/ln7z2eWriiQAllfVcn/giphy.gif" width="150"/> <!-- JavaScript -->
<img src="https://media.giphy.com/media/fsEaZldNC8A1PJ3mwp/giphy.gif" width="150"/> <!-- CSS3 -->
<img src="https://media.giphy.com/media/XAxylRMCdpbEWUAvr8/giphy.gif" width="150"/> <!-- HTML5 -->
<img src="https://firebase.google.com/images/social.png" width="300" height="200" />
<img src="https://t3.ftcdn.net/jpg/07/35/72/34/240_F_735723430_ZhWRsfJJUvjiFtLl3IQFLQLACMuD6H9I.jpg" width="250" />
<img src="https://www.designsystemhunt.com/images/Chakra-UI-image.png" width="250">
</p>

## Getting Started

 Step 1: 
  Git Clone the Repository
  
    git clone https://github.com/se24ncsu/ChefGPT.git
    
  (OR) Download the .zip file on your local machine from the following link
  
    https://github.com/se24ncsu/ChefGPT
  
 Step 2:
   Follow the setup instructions in the installation documentation
   
    https://github.com/se24ncsu/ChefGPT/blob/main/docs/install.md
    
    
<b>Finally, start enjoying cooking with the help of ChefGPT!</b>


## Future Scope
ChefGPT is a dynamic project with endless possibilities for expansion and enhancement. Here are some exciting avenues for future development:

1. **Social Cooking and Community Engagement**: Add a social element to ChefGPT, where users can share their favorite recipes, post photos of their culinary creations, and engage in challenges or recipe swaps with others. Implement community voting or ratings for recipes.

2. **Nutrition Tracking and Meal Logging**: Enhancement: Add a feature that tracks nutritional intake by allowing users to log their meals directly in the app. It can sync with fitness trackers or health apps like Fitbit or MyFitnessPal to automatically monitor daily calorie and macronutrient consumption.
  
3. **Real-Time Ingredient Availability Check**: Integrate with local grocery stores or online marketplaces to check the real-time availability of ingredients. Users can instantly know if the ingredients for a recipe are in stock and even order them directly through the app.
 
4. **Ingredient Substitution Suggestions**: Implement an ingredient substitution feature. If a user is missing an ingredient for a recipe, ChefGPT can suggest common alternatives based on the recipe’s requirements.

5. **Meal Reminder Notifications**: Enable notifications to remind users when it’s time to start preparing the meal based on their saved meal plan or cooking schedule. It can include prep and cook times, as well as reminders for important steps like marinating.

6. **User Recipe Rating and Reviews**: Allow users to rate and review recipes after they cook them. They can provide feedback, share modifications, or recommend tips for better results.

The future of ChefGPT is full of exciting possibilities, and we invite food enthusiasts, home cooks, and anyone passionate about culinary adventures to join us in making this platform the ultimate kitchen companion. Whether you’re a beginner looking for meal inspiration or a seasoned chef aiming to elevate your cooking, ChefGPT is here to guide you every step of the way. Let’s shape the future of cooking together! ❤️❤️

## Contribute to the Project!

Please refer to the [CONTRIBUTING.md](https://github.com/se24ncsu/ChefGPT/blob/main/CONTRIBUTING.md) if you want to contribute to the ChefGPT source code. Follow all the guidelines mentioned in the same and raise a pull request, we would love to look at it ❤️❤️!

## Contributors
<table>
  <tr>
    <td><a href="https://github.com/se24ncsu/ChefGPT">Project 3</a></td>
    <td align="center"><a href="https://github.com/Shrimadh/"><img src="https://avatars.githubusercontent.com/u/64469917?s=400&u=c88c30f494e1e8d5b6251213a2d7cbb2f83910d3&v=4" width="75px;" alt=""/><br /><sub><b>Srimadh V Rao</b></sub></a></td>
    <td align="center"><a href="https://github.com/akuldevali/"><img src="https://avatars.githubusercontent.com/u/64837282?v=4" width="75px;" alt=""/><br /><sub><b>Akul G Devali</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/codemanav/"><img src="https://avatars.githubusercontent.com/u/54708784?v=4" width="75px;" alt=""/><br /><sub><b>Manav D Shah</b></sub></a><br /></td>
  </tr>
</table>

[Srimadh Rao](https://www.linkedin.com/in/srimadh-rao/)<br/>
[Akul Gopal Devali](https://www.linkedin.com/in/akuldevali/)<br/>
[Manav D Shah](https://www.linkedin.com/in/manav-divyesh-shah//)<br/>

## Contact
In case of any issues, please e-mail your queries to ChefGPTse24@gmail.com or raise an issue on this repository.<br>
Our team of developers monitors this e-mail address and would be happy to answer any and all questions you have about setup or use of this project!

## Join the ChefGPT Community:

Contribute to the project and help us improve recommendations.
Share your experience and film discoveries with us.
Together, let's make ChefGPT the ultimate movie companion!
ChefGPT is more than just code; it's a passion for cinema, and we invite you to be a part of this exciting journey. Start exploring, sharing, and discovering movies like never before with ChefGPT!
Let's make movie nights extraordinary together!

## License
This project is under the MIT License.