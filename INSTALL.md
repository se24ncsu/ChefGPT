# ChefGPT Installation Guide

## Prerequisites
- Git
- Node.js (v16 or later)
- npm (Node Package Manager)
- A Firebase account

## Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/se24ncsu/ChefGPT.git
cd ChefGPT
```

## Backend Setup

### Firebase Configuration

1. **Create a Firebase Account**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Note down your Firebase project ID and configuration details

2. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase**
   ```bash
   firebase login
   ```

4. **Initialize Firebase Functions**
   ```bash
   cd functions
   firebase init
   ```
   - Select "Functions" when prompted
   - Choose your Firebase project
   - Select JavaScript as the language
   - Choose to install dependencies

5. **Set Environment Variables**
   Create a `.env` file in the `functions` directory with necessary configurations:
   ```
     REACT_APP_GEMINI_API_KEY=key
     REACT_APP_GET_IMAGE_URL=key
     REACT_APP_GET_RECIPES_FROM_INGREDIENTS_URL=key
     REACT_APP_GET_RECIPES_BY_NAME_URL=key
     REACT_APP_GET_DETAILED_RECIPE_URL=key
   ```

6. **Deploy Firebase Functions**
   ```bash
   firebase deploy --only functions
   ```

## Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

## Troubleshooting

- Ensure all dependencies are correctly installed
- Check Firebase project settings and API permissions
- Verify environment variables are correctly set
- Make sure you're using a compatible Node.js version

## Additional Notes

- Keep your Firebase credentials and API keys confidential
- Regularly update dependencies to maintain security

## Support

If you encounter any issues, please check the project's GitHub issues or contact the repository maintainers.
