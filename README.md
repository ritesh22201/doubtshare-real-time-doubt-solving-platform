# DoubtsCleared

## Real-time doubt solving platform

A real-time doubt solving platform application built using React.js, Redux.js, Node.js, Express.js, MongoDB, Socket.io, node-cron, node-mailer and Chakra UI.

## Live Demo Link

![Live Link](https://drive.google.com/file/d/1wqqV2yJbsP2_tSA6hvhZmMTbUpAx415C/view?usp=sharing)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Backend](#backend)
- [Frontend](#frontend)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Introduction

DoubtCleared is an interactive, real-time doubt-solving platform where students can seek assistance for any subject in their preferred language. Our dedicated tutors are ready to provide prompt and effective solutions, ensuring a seamless learning experience for every student.

## Features

- User authentication with OTP verification and jsonwebtoken
- Crud Operations on doubts
- User profile - CRUD
- Responsive design with Chakra UI components

## Technologies Used

- Frontend:
  - React.js
  - Redux.js
  - Chakra UI

- Backend:
  - Node.js
  - Express.js
  - Socket.io
  - MongoDB

## Installation

1. Clone the repository: `git clone https://github.com/ritesh22201/doubtshare-real-time-doubt-solving-platform`
3. Install frontend dependencies: `cd client && npm install`
4. Install backend dependencies: `cd server && npm install`
5. Create a MongoDB database and update the configuration in `server/config/db.js`

## Usage

1. Start the backend server: `cd server && npm run server`
2. Start the frontend development server: `cd client && npm start`
3. Open your browser and visit: `http://localhost:3000`

## Screenshots

### Landing Page 

![Landing Page](./client/src/Assets/Screenshots/Screenshot%20(894).png)

### Signup Page

![Signup Page](./client/src/Assets/Screenshots/Screenshot%20(895).png)

### Login Page

![Login Page](./client/src/Assets/Screenshots/Screenshot%20(896).png)

### Dashboard Page

![Dashboard Page](./client/src/Assets/Screenshots/Screenshot%20(897).png)

### Doubts Page

![Doubts Page](./client/src/Assets/Screenshots/Screenshot%20(898).png)

### Profile Page

![Profile Page](./client/src/Assets/Screenshots/Screenshot%20(899).png)

### Chat Page

![Chat Page](./client/src/Assets/Screenshots/Screenshot%20(900).png)

## Backend

The backend is built using Node.js and Express.js. It provides RESTful APIs for managing tasks and communicates with the MongoDB database.

## Frontend

The frontend is built using React.js, and Redux.js, offering an intuitive user interface for managing tasks efficiently.

## API Documentation

### User Authentication Route

- `GET /api/auth/users/:email`: Get the details of a single user.
- `POST /api/auth/register`: Register a new user based on userType. Default user is Student.
- `POST /api/auth/login`: Existing user login.
- `PATCH /api/auth/logout/:email`: Logout route.
- `POST /api/auth/verify`: Verify the user with OTP
- `POST /api/auth/forgetPassword`: User can change the password if he/she forgets.

### Doubt Route

- `GET /api/doubt/history`: Get the all the doubts by authenticated user.
- `POST /api/doubt/createDoubt`: Post a new doubt.
- `PATCH /api/doubt/updateDoubt/:id`: Update the existing doubt.
- `DELETE /api/doubt/deleteDoubt/:id`: Delete the existing doubt.

### Profile Route

- `GET /api/auth/users/:email`: Get the current authenticated user.
- `PUT /api/auth/updateProfile/:id`: Update the user profile.

## Database Schema

The MongoDB database schema consists of a `doubtshare` collection.

## Configuration

Confuguration is set up in MongoDB, by setting up the environment variables in .env file and setting up the database connection in `config/db.js`

## Deployment

For deployment, Render for the backend and Vercel for the frontend. Updated environment variables accordingly.

## Contact

For any inquiries, contact me at riteshgoswami22201@gmail.com.

## Acknowledgments

- Thanks to the creators of React.js, Redux.js, Node.js, Express.js, MongoDB, and Chakra UI for their fantastic tools.
- Special thanks to the open-source community for their valuable contributions.