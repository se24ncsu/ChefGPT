# Troubleshooting Guide 

## Firebase with Github Actions

### Firebase Deployment Issues
When deploying Firebase projects using Github Actions, you may encounter issues. Below are common problems and their solutions:

#### Deployment Errors
If you encounter errors like `HTTP Error: 403 Forbidden` or `Error: Cannot deploy functions`, check the following:

1. **Authentication**
   - Ensure `FIREBASE_TOKEN` is properly set in your Github Secrets.
   - Generate a new token using the Firebase CLI:
     ```bash
     firebase login:ci
     ```
   - Verify the token has not expired.

2. **Project Configuration**
   - Confirm the correct Firebase project is selected in your `.firebaserc` file:
     ```json
     {
       "projects": {
         "default": "your-project-id"
       }
     }
     ```
   - Verify the project ID matches your Firebase console.

3. **Permissions**
   - Ensure the account associated with the `FIREBASE_TOKEN` has the required roles (e.g., Editor, Owner).
   - Check IAM roles in the Google Cloud Console.

4. **Firebase CLI Version**
   - Use the latest Firebase CLI version:
     ```bash
     firebase --version
     npm install -g firebase-tools
     ```

#### Missing Files in Deployment
If some files or directories are not deployed:

1. **Build Directory**
   - Confirm the `public` directory for hosting or the `build` directory for React apps is correctly set in `firebase.json`:
     ```json
     {
       "hosting": {
         "public": "build"
       }
     }
     ```

2. **Ignored Files**
   - Check `.firebaseignore` for unintended exclusions.
   - Example `.firebaseignore`:
     ```
     node_modules
     firebase-debug.log
     ```

3. **React Build**
   - Ensure the React app is built before deployment:
     ```bash
     npm run build
     ```

### Firebase Functions Issues

#### Deployment Errors
If Firebase functions fail to deploy:

1. **Runtime Errors**
   - Specify the Node.js runtime version in `package.json`:
     ```json
     {
       "engines": {
         "node": "16"
       }
     }
     ```
   - Use supported versions listed in Firebase documentation.

2. **Dependencies**
   - Verify `node_modules` are installed:
     ```bash
     npm install
     ```
   - Check for missing or mismatched dependencies.

3. **Quota Limits**
   - Ensure you are within your Firebase project's quota limits (e.g., number of functions, deployment size).

#### Function Execution Errors
If functions fail to execute:

1. **Logs**
   - Check logs for detailed error messages:
     ```bash
     firebase functions:log
     ```

2. **Environment Variables**
   - Confirm all required environment variables are set:
     ```bash
     firebase functions:config:set key=value
     firebase deploy --only functions
     ```

3. **CORS Configuration**
   - For API functions, ensure proper CORS setup:
     ```javascript
     const cors = require('cors')({ origin: true });
     exports.api = functions.https.onRequest((req, res) => {
       cors(req, res, () => {
         res.send("Hello from Firebase!");
       });
     });
     ```

### Hosting Issues

#### Cannot Access Website
If the hosted site is inaccessible:

1. **Hosting Configuration**
   - Verify `firebase.json` is correctly configured:
     ```json
     {
       "hosting": {
         "public": "build",
         "rewrites": [
           {
             "source": "**",
             "destination": "/index.html"
           }
         ]
       }
     }
     ```

2. **Build Issues**
   - Ensure the React app is built correctly:
     ```bash
     npm run build
     ```

3. **Cache Issues**
   - Clear browser cache or force reload:
     ```bash
     Ctrl+Shift+R
     ```

### Common Firebase Error Messages

1. **Permission Denied**
   - Solution: Check Firestore or Realtime Database rules.
     ```json
     {
       "rules_version": "2",
       "service": "firestore.googleapis.com",
       "data": {
         "rules": {
           ".read": "auth != null",
           ".write": "auth != null"
         }
       }
     }
     ```

2. **Unhandled Function Errors**
   - Solution: Add error handling to functions:
     ```javascript
     exports.api = functions.https.onRequest((req, res) => {
       try {
         res.send("Success!");
       } catch (error) {
         console.error(error);
         res.status(500).send("Internal Server Error");
       }
     });
     ```
## React Application Issues

### Development Server Problems

#### Node.js and npm Version Incompatibility
If you encounter React build or start errors:

1. **Version Verification**
   ```bash
   node --version  # Should be >= 14.0.0
   npm --version   # Should be >= 6.14.0
   ```

2. **Dependency Issues**
   - Clear npm cache:
     ```bash
     npm cache clean --force
     ```
   - Delete node_modules and reinstall:
     ```bash
     rm -rf node_modules
     rm package-lock.json
     npm install
     ```
   - Check for peer dependency conflicts:
     ```bash
     npm ls
     ```

3. **Build Errors**
   - Check for missing dependencies in package.json
   - Ensure all required dev dependencies are installed
   - Verify babel and webpack configurations

### Common React Error Messages

1. **Module Not Found**
   ```
   Module not found: Can't resolve 'package-name'
   ```
   - Solution: Install missing package
   ```bash
   npm install package-name
   ```

2. **Invalid Hook Call**
   - Ensure React version is consistent across all dependencies
   - Check for multiple React installations:
   ```bash
   npm ls react
   ```

## Environment Setup

### Development Environment Checklist
- [ ] Firebase CLI installed and updated
- [ ] `firebase.json` and `.firebaserc` configured
- [ ] Node.js installed and compatible with Firebase functions
- [ ] `FIREBASE_TOKEN` set in Github Secrets
- [ ] Required ports available
- [ ] Build process verified for frontend apps

Always refer to Firebase logs and documentation for specific guidance when troubleshooting.
