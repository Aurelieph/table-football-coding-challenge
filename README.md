# Table Football Scoring App

A Node.js and React-based application for tracking and scoring table football matches.

## Project Structure

The project is structured as follows:

- `/app`: Frontend codebase.
- `/server`: Backend codebase.

### API Documentation

API Documentation is available at http://localhost:4000/api-docs/.

## Prerequisites

### Frontend

**Frontend Dependencies**

The following dependencies are required for the frontend part of the project (found in the `package.json` file in the frontend directory):

```json
{
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.14",
    "@mui/material": "^5.14.14",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.5.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.17.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}
```

### Backend

- Node.js
- Dependencies listed in package.json
- PosgreSQL : Ensure you have a PostgreSQL database set up, and configure the connection in your server environment.
- Environment variables (see .env.example)
- nodemon (optional)

**Backend Dependencies**

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "knex": "^3.0.1",
    "pg": "^8.11.3",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0"
  }
}
```

## How to Run this Project

1. **Clone the Repository**: Clone this repository to your local machine.

```shell
git clone https://github.com/Aurelieph/table-football-coding-challenge.git
```

2. **Install Frontend Dependencies**: Navigate to the frontend directory and install frontend dependencies:

```shell
cd app
npm install
```

3. **Install Backend Dependencies**: Navigate to the backend directory and install backend dependencies:

```shell
cd ../server
npm install
```

4. **Create PostgreSQL Database**: Create a PostgreSQL database and configure the connection in your server environment. You can use tools like pgAdmin4 or the command line to create the database. Example:

```shell
psql
CREATE DATABASE table_football;
```

Store the following information for the next step:

- the host name (usually 'localhost')
- the user name (usually 'postgres')
- the database name you have just created.(i.e. 'table_football')
- the password in the DB_PASSWORD variable. The db password is usually set when you install postgres for the first time on your machine.

5. **Set Environment Variables**: Create a .env file in the backend directory and add the following environment variables:

```shell
DB_HOST=your_host # Usually 'localhost'
DB_NAME=your_database_name # E.g., 'table_football'
DB_USER=your_user # Usually 'postgres'
DB_PASSWORD=your_password # Password for the DB_USER.
```

6. **Migrate the database**: To migrate the database, execute the following command within the /server directory:

```shell
npx knex migrate:latest
```

7. **Start the Backend Server**: Start the backend server using either of the following commands:

```shell
npm start
```

or if you have nodemon installed:

```shell
npm run dev
```

8. **Start the Frontend Server**: In a new terminal window, navigate to the frontend directory:

```shell
cd app
npm start
```

9. **Access the Web Application**: You can access the web application at http://localhost:3000.

10. **Access API Documentation**: You can access the API documentation at http://localhost:4000/api-docs/.

## Usage

**Main Page / Leaderboard**

The main dashboard displays the current player rankings. By default, it shows overall rankings, but you can switch to view team-based or individual stats.

If you want to record a new match, simply click the "Missing a match" button. This opens a form where you can log scores for up to four matches simultaneously.

**New Match Page**

The "New Match" page allows you to easily record match scores. To update the score for each team, click the "+" or "-" buttons. You can form teams with either one or two players.
