# Redux Checkpoint App

This project is a simple to-do application built for the Front End Development Redux checkpoint.

## What the app does

- Adds new tasks
- Lists tasks
- Filters tasks by `all`, `done`, and `not done`
- Edits an existing task
- Toggles task status between done and not done

Each task uses this shape:

- `id`
- `description`
- `isDone`

## Main Components

- `Addtask`
- `ListTask`
- `Task`

## State Management

The app uses:

- `@reduxjs/toolkit` for the slice and store setup
- `react-redux` for connecting React components to the Redux store

The Redux state includes:

- the task list
- the active filter
- the current task being edited

## Project Structure

```text
src/
  app/store.js
  components/Addtask.js
  components/ListTask.js
  components/Task.js
  features/tasks/tasksSlice.js
  App.js
  index.js
```

## Styling

The UI follows the same visual direction as `/Users/eric/Developer/Gomycode/todo-state-manager-app`:

- warm neutral page background
- dark hero section
- clean card layout
- Tailwind utility classes for styling

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Notes

- The app starts with a few sample tasks already in the Redux store.
- The implementation is intentionally simple and focused only on the checkpoint requirements.
