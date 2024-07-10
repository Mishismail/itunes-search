# iTunes Search App

## Table of Contents
- [Introduction](#introduction)
- [Usage](#usage)
- [Installation](#installation)
- [Testing](#testing)
- [Running the App](#running-the-app)
- [Security Measures](#security-measures)
- [Deployed App](#deployed-app)

## Introduction
The iTunes Search App allows users to search for media content from the iTunes Store and manage their favorites. Users can search for music, movies, podcasts, and more. The app also provides functionality to add items to a list of favorites and remove them as needed.

## Usage
1. Open the app.
2. Enter a search term in the search bar.
3. Select the type of media you want to search for (e.g., music, movie, podcast).
4. Click the "Search" button to fetch results from the iTunes API.
5. Browse the search results and add items to your favorites by clicking the "Add to Favorites" button.
6. View and manage your favorites in the "Favourites" tab.

## Installation
Follow these steps to install and run the app on your local machine:

1. **Clone the Repository**:
   
   ```bash
   git clone https://github.com/yourusername/itunes-search.git
   cd itunes-search

2. **Install Dependencies**:
   Navigate to both the backend and frontend directories and install the required dependencies:
   
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install

3. **Set Up Environment Variables**:
   Create a .env file in the backend directory and add your environment variables. Example:
   
   ```bash
   PORT=8080

## Testing

To run tests for both the backend and frontend, follow these steps:

1. **Backend Tests**:
   Navigate to the backend directory and run the tests using Mocha:
   
   ```bash
   cd backend
   npm test

2. **Frontend Tests**:
   Navigate to the frontend directory and run the tests using Jest:

   ```bash
   cd frontend
   npm test

## Running the App
   Follow these steps to run the app on your local machine:

1. **Start the Backend Server**:
   Navigate to the backend directory and start the server:

   ```bash
   cd backend
   node server.js

2. **Start the Frontend Development Server**:
   Open a new terminal, navigate to the frontend directory, and start the development server:

   ```bash
   cd frontend
   npm start

3. **Access the App**:
   Open your web browser and go to http://localhost:3000 to access the app.

## Security Measures

To ensure the security of the app, the following measures have been implemented:

- ### Helmet Middleware:
  The backend uses the Helmet middleware to set various HTTP headers for security.

- ### CORS:
  Cross-Origin Resource Sharing (CORS) is enabled with specific configurations to control the sources allowed to access the API.

- ### Environment Variables:
  Sensitive information such as API keys and configuration settings are stored in environment variables. The .env file is listed in .gitignore to prevent it from being committed to version control.

- ### Input Validation:
  Proper validation and sanitization are performed on user inputs to prevent SQL injection and other common vulnerabilities.

## Deployed App
The app is deployed and can be accessed via the following link:

Deployed iTunes Search App



   





