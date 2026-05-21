# REST API Checkpoint

This project is a simple REST API built with Node.js, Express, Mongoose, and dotenv. It connects to MongoDB and performs CRUD operations on users.

## Objective

The goal of this checkpoint is to practice:

- Creating a Node.js project with `npm init`
- Installing and using Express, Mongoose, and dotenv
- Loading environment variables from `config/.env`
- Connecting an Express server to MongoDB
- Creating a Mongoose model
- Building REST API routes that create, read, update, and delete data
- Testing API endpoints with Postman

## Project Structure

```text
rest-api-checkpoint/
  config/
    .env
  models/
    User.js
  .gitignore
  package.json
  package-lock.json
  README.md
  server.js
```

## Technologies Used

- Node.js
- Express
- Mongoose
- MongoDB
- dotenv
- Postman

## Installation

Install the project dependencies:

```bash
npm install
```

The required packages are:

```bash
npm install express mongoose dotenv
```

## Environment Variables

The API uses a private environment file at:

```text
config/.env
```

Default local configuration:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/rest-api-checkpoint
```

Use a MongoDB Atlas connection string instead of the local URI if you are connecting to Atlas.

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/rest-api-checkpoint
```

## Running the Server

Start the API:

```bash
npm start
```

Expected terminal output:

```text
Server is running on port 3000
Connected to MongoDB
```

## User Model

The `User` model is defined in `models/User.js`.

User fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | String | Yes | User's name |
| `email` | String | Yes | User's email address |
| `age` | Number | No | User's age |

## API Routes

Replace `<server-url>` with the address where your server is running.

### Home Route

Checks that the API is running.

```http
GET <server-url>/
```

Example response:

```json
{
  "message": "REST API checkpoint is running"
}
```

### Get All Users

Returns all users from the database.

```http
GET <server-url>/api/v1/users
```

Example response:

```json
[
  {
    "_id": "USER_ID",
    "name": "Amina",
    "email": "amina@example.com",
    "age": 24
  }
]
```

### Add a New User

Creates a new user in the database.

```http
POST <server-url>/api/v1/users
Content-Type: application/json
```

Example request body:

```json
{
  "name": "Amina",
  "email": "amina@example.com",
  "age": 24
}
```

### Edit a User by ID

Updates an existing user using the MongoDB `_id`.

```http
PUT <server-url>/api/v1/users/USER_ID
Content-Type: application/json
```

Example request body:

```json
{
  "name": "Amina Updated",
  "age": 25
}
```

### Delete a User by ID

Removes one user using the MongoDB `_id`.

```http
DELETE <server-url>/api/v1/users/USER_ID
```

Example response:

```json
{
  "message": "User deleted"
}
```

## Testing With Postman

1. Start the server with `npm start`.
2. Open Postman.
3. Create a `POST` request to add a user.
4. Copy the `_id` from the response.
5. Use that `_id` to test the `PUT` and `DELETE` routes.
6. Use the `GET /api/v1/users` route to confirm the database changes.

## Verification

Run the syntax check:

```bash
npm run check
```

This checks:

- `server.js`
- `models/User.js`

## Notes

- `config/.env` is ignored by Git because it can contain private database credentials.
- The code includes short comments to make it easier to review before submission.
