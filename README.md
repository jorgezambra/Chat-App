# Chat-App

Chat-App is a React-Native app that can be used to Chat and share images and geo-location.

## Database setup

Google's Firestore database was used for cloud-storage for this chat app.
1. Go to Google Firebase and click on “Sign in”
2. Click on “Go to console” link and click "Create Project"
3. Fill the form that appears with basic information.
4. Give your project a name.
5. With the default settings selected, agree to the terms and click “Create Project.”
6. Create a database, click on “Develop” from the menu that appears on the left.
7. Select “Database” from the menu that appears
8. Choose “Create database” in the Cloud Firestore section.
9. IMPORTANT! Create "Firestore Database" NOT “Realtime Database.”

# Setting up the development environment

1. Install latest LTS Node version .
2. Install expo-cli using your terminal. expo-cli is required to create new projects and to run Expo.
```bash
npm install expo-cli --global
```
3. Create an Expo account [Expo sign-up page](https://expo.io/). Log in to your account when using Expo CLI.
4. Download expo app from your phones app store (Playstore, Appstore, etc...) it will be required to run your app.
5. To create a new project on your computer first run the following command into the terminal

```bash
expo init "project name"
```

6. Choose "blank" from the options shown.
7. Once installed go to project folder using:

```bash
cd "the name of your project"
```

To run the app locally, run the following in the terminal
```bash
npm start
```
or
```bash
expo start
```
7. Browser will be opened with Metro Bundler options to run the app on your mobile phone via tunnel, lan or local.
8. Open the expo app on your phone. MAKE SURE YOUR COMPUTER AND PHONE ARE CONNECTED TO THE SAME NETOWRK (LAN or WiFi).

## Project dependencies

```
    "@react-native-community/async-storage"
    "@react-native-community/masked-view"
    "@react-native-community/netinfo"
    "@react-navigation/native"
    "@react-navigation/stack"
    "expo"
    "expo-image-picker"
    "expo-location"
    "expo-permissions"
    "expo-status-bar"
    "firebase":
    "react":
    "react-dom":
    "react-native"
    "react-native-gesture-handler"
    "react-native-gifted-chat"
    "react-native-maps"
    "react-native-reanimated"
    "react-native-safe-area-context"
    "react-native-screens"
    "react-native-web"
    "react-navigation"
```
