# TasteBook — Recipe Mock-up App

A React Native (Expo) recipe browser built as a mock-up submission.

## Features
- Browse recipes by category (Breakfast, Lunch, Dinner, Dessert, Snack)
- Search recipes by name
- Recipe detail screen with ingredient checklist and numbered steps
- Favorites, persisted locally with AsyncStorage
- Bottom tab navigation (Home / Favorites)

## Tech
- React Native + Expo (managed workflow)
- React Navigation (bottom tabs + native stack)
- Context API for global favorites state
- AsyncStorage for local persistence

## Project structure
```
App.js                        # Navigation + providers
src/
  data/recipes.js             # Mock recipe data
  context/FavoritesContext.js # Favorites state + persistence
  components/
    RecipeCard.js
    CategoryFilter.js
  screens/
    HomeScreen.js
    RecipeDetailScreen.js
    FavoritesScreen.js
```

## Run locally

```bash
npm install
npx expo start
```

Scan the QR code with the Expo Go app (Android/iOS) to preview it live.

## Build an APK (fastest path — EAS Build, free tier)

1. Install the EAS CLI (one time):
   ```bash
   npm install -g eas-cli
   ```
2. Log in / create a free Expo account:
   ```bash
   eas login
   ```
3. Configure the project for building:
   ```bash
   eas build:configure
   ```
4. Build an installable APK (not an .aab, so it's directly shareable):
   ```bash
   eas build -p android --profile preview
   ```
   If prompted, add this to `eas.json` under `build.preview` so it produces an APK instead of an AAB:
   ```json
   {
     "build": {
       "preview": {
         "android": { "buildType": "apk" }
       }
     }
   }
   ```
5. When the build finishes, EAS gives you a download link for the `.apk` — download it and that's your submission file.

Builds run on Expo's servers, so this step needs to happen on your machine (with internet access), not in a sandboxed environment. A cloud APK build usually takes 10-15 minutes.

## Alternative: local build (if you have Android Studio installed)
```bash
npx expo prebuild
cd android
./gradlew assembleRelease
```
The APK will be at `android/app/build/outputs/apk/release/app-release.apk`.

## Notes for the submission
- Push this folder to a public GitHub repo before submitting, so you can share the source link alongside the APK.
- Recipe images are loaded from Unsplash URLs — the app needs internet access on first load of an image (they get cached after that).
