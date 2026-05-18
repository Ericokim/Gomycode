# Secure Task Manager API

This project is a REST API checkpoint for secure task management. Users can sign up, log in with JWT, start Google OAuth login, and manage only their own tasks.

The app keeps data in memory to keep the checkpoint simple. Users and tasks reset when the server restarts.

## Features

- JWT signup and login
- JWT stored in an HTTP-only cookie
- Google OAuth routes with Passport.js
- Protected task routes
- Owner-only task access
- Helmet security headers
- `xss-clean` and `express-mongo-sanitize` input sanitizing
- Login rate limiting
- Reusable `AppError`, `catchAsync()`, and centralized error middleware

## Project Files

```text
src/
  app.js                    # Express app, security middleware, routes
  server.js                 # Starts the server
  data.js                   # In-memory users and tasks
  middleware/auth.js        # verifyToken middleware
  middleware/errorHandler.js
  routes/authRoutes.js
  routes/taskRoutes.js
  utils/AppError.js
  utils/catchAsync.js
  utils/jwt.js
```

## Install

```bash
npm install
```

## Environment

Create a local `.env` file using `.env.example` as a guide.

```text
PORT=3000
NODE_ENV=development
JWT_SECRET=replace-this-with-a-long-secret
JWT_EXPIRES_IN=1d
COOKIE_EXPIRES_DAYS=1
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

## Run

```bash
npm start
```

Server URL:

```text
http://localhost:3000
```

## Auth Routes

| Method | Route | Description |
| --- | --- | --- |
| POST | `/auth/signup` | Create a user and receive a JWT cookie |
| POST | `/auth/login` | Log in and receive a JWT cookie |
| GET | `/auth/google` | Start Google OAuth login |
| GET | `/auth/google/callback` | Google OAuth callback |

## Task Routes

These routes require the JWT cookie from signup/login.

| Method | Route | Description |
| --- | --- | --- |
| POST | `/tasks` | Create a task |
| GET | `/tasks` | Get your tasks |
| DELETE | `/tasks/:id` | Delete your task |

## Example Requests

### Sign Up

```bash
curl -i -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Amina","email":"amina@example.com","password":"password123"}'
```

### Log In

```bash
curl -i -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"amina@example.com","password":"password123"}'
```

### Create a Task

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -b "jwt=YOUR_TOKEN_HERE" \
  -d '{"title":"Finish checkpoint","description":"Submit secure API"}'
```

### Get Your Tasks

```bash
curl -i http://localhost:3000/tasks \
  -b "jwt=YOUR_TOKEN_HERE"
```

### Delete Your Task

```bash
curl -i -X DELETE http://localhost:3000/tasks/1 \
  -b "jwt=YOUR_TOKEN_HERE"
```
