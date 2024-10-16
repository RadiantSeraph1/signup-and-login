# Signup and Login System

A user authentication system that includes features for signing up, logging in, and session management. This project provides a simple and secure implementation of these functionalities using Node.js, Express, MongoDB, and JWT (JSON Web Tokens).

## Features

- User signup with email and password
- Secure password hashing using bcrypt
- User login with JWT-based authentication
- Middleware to protect routes requiring authentication
- Token generation and validation
- Environment configuration using `.env` file

## Prerequisites

Ensure you have the following installed before starting:

- [Node.js](https://nodejs.org/) (version 12+)
- [MongoDB](https://www.mongodb.com/) (local or cloud-based)

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/signup-and-login.git
Navigate to the project directory:

cd signup-and-login
Install dependencies:

npm install
Set up your environment variables:

Create a .env file in the root directory and configure the following variables:

MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
Start the development server:

npm start
The app will be running at http://localhost:3000.

Usage
API Endpoints
POST /signup – Allows a new user to sign up.
POST /login – Authenticates a user and returns a JWT.
GET /protected – Example of a protected route. Accessible only with a valid JWT token.
Example Requests
Signup:


POST /signup
{
    "email": "user@example.com",
    "password": "yourpassword"
}
Login:


POST /login
{
    "email": "user@example.com",
    "password": "yourpassword"
}
Access Protected Route:

GET /protected
Authorization: Bearer <your-jwt-token>
Project Structure

├── models/                # Contains user models for MongoDB
├── public/                # Public assets (if any)
├── routes/                # API routes for signup and login
├── uploads/               # Directory for uploaded files (if applicable)
├── server.js              # Entry point of the application
├── generateKey.js         # Utility to generate JWT secret key
├── db.js                  # MongoDB connection setup
├── package.json           # Project metadata and dependencies
└── .env                   # Environment variables (not included in version control)
Scripts
npm start - Starts the server.
npm run dev - Starts the server in development mode using nodemon (if configured).
Dependencies
express - Web framework for Node.js
bcrypt - For hashing passwords securely
jsonwebtoken - For handling JWT tokens
mongoose - For interacting with MongoDB
(Additional dependencies as listed in package.json)
License
This project is licensed under the Apache License. See the LICENSE file for details.