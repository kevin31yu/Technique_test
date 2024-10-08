# To-Do List Application

This is a full-stack To-Do List application built with **React.js** on the frontend, 
**Node.js/Express** for the backend, and **PostgreSQL** as the database. 
Users can add, update, and delete tasks using the application.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)

## Technologies Used

### Frontend
- **React.js**: JavaScript library for building user interfaces
- **Axios**: For making HTTP requests from the frontend

### Backend
- **Node.js**: JavaScript runtime for backend development
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Relational database used for storing tasks
- **pg**: Node.js library for interacting with PostgreSQL
- **dotenv**: For loading environment variables from a `.env` file

## Features

- Add new tasks to your to-do list
- Update existing tasks
- Delete tasks from the list
- View all tasks

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (version 12 or higher)
- **PostgreSQL** (version 10 or higher)

### Frontend Setup

1. Navigate to the `frontend` folder:

```bash
cd frontend
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

### Backend Setup

1. Navigate to the `backend` folder:

```bash
cd backend
```

2. Install the necessary dependencies:

```bash
npm install
```

4. Set up your `.env` file in the `backend` directory with the following environment variables:

```bash
PORT=5000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourPasswordHere
DB_NAME=todoList
DB_PORT=5432
```

5. Start the backend server:

```bash
npm start
```

The backend server will run on `http://localhost:5000`.

## Environment Variables

Make sure to configure your `.env` file in the `server` directory with the following variables:

```bash
PORT=5000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourPasswordHere
DB_NAME=todoList
DB_PORT=5432
```

#### Running Tests

1. Make sure you are still in the `backend` directory:

```bash
cd backend
```

2. Run the tests using npm:

```bash
npm test
```

This will execute the tests defined in your backend code using Jest.