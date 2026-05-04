# Simple Node.js To-Do REST API

## Overview

This is a clean, dependency-free RESTful API built with only Node.js core modules. It stores tasks in memory using an array and supports CRUD operations.

Each task has:

```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false
}
```

## Project Structure

```text
todo-rest-api-core-node/
  server.js      # HTTP server and route matching
  tasks.js       # In-memory data and CRUD helper functions
  handlers.js    # Request handlers and JSON responses
  package.json
  README.md
  projectplan.md
```

## Run

```bash
npm start
```

Development mode:

```bash
npm run dev
```

Server URL:

```text
http://localhost:3000
```

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get one task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| DELETE | `/tasks` | Delete all tasks |

## Example Requests

### Create a Task

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries"}'
```

Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Buy groceries",
    "completed": false
  }
}
```

### Get All Tasks

```bash
curl -i http://localhost:3000/tasks
```

### Get One Task

```bash
curl -i http://localhost:3000/tasks/1
```

### Update a Task

```bash
curl -i -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries and milk","completed":true}'
```

### Delete a Task

```bash
curl -i -X DELETE http://localhost:3000/tasks/1
```

### Delete All Tasks

```bash
curl -i -X DELETE http://localhost:3000/tasks
```

## Validation and Status Codes

- `201 Created` for successful task creation.
- `200 OK` for successful reads, updates, and deletes.
- `400 Bad Request` for invalid JSON or invalid request data.
- `404 Not Found` when a task or route does not exist.
- `405 Method Not Allowed` when a route exists but the HTTP method is not supported.
- `title` is required when creating a task.
- `completed` is optional and defaults to `false`.
- `completed` must be a boolean when provided.

## Notes

- Uses only Node.js built-in modules: `http` and `url`.
- No Express, no database, no external dependencies.
- Data resets when the server restarts.
