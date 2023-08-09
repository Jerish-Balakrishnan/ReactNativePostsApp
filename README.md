# React Native Posts App

This application consists of a login screen and a posts screen where users can view posts fetched from an API.

## Features
- **Login Screen**: Basic authentication using a hardcoded username (testuser) and password (password).
- **Posts Screen**: Displays a list of posts obtained from JSONPlaceholder API.
- **Details Screen**: Shows full details of a selected post.
- **Refresh Button**: Fetches and updates the list of posts.
- **Pull-to-refresh**: Allows users to pull down to refresh posts.
- **Pagination**: Enables loading more posts as users scroll down the list.
- **Error Handling**: Displays an error message if data cannot be fetched.

## Requirements
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://expo.dev/tools-cli) or React Native CLI

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jerish-balakrishnan/ReactNativePostsApp.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ReactNativePostsApp
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
- With Expo:
  ```bash
  expo start
  ```

- With React Native CLI:
  ```bash
  react-native run-ios # for iOS
  react-native run-android # for Android
  ```

## Testing
Run the unit tests with:
```bash
npm test
```

## Acknowledgments
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) for providing the API endpoint.